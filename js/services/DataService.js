const BASE_URL = 'http://127.0.0.1:8000';
const TOKEN_KEY = 'token';

// OJO: En sevices no usar arrow functions al definir los métodos

const DataService = {
    getProducts: async function () {
        let url = `${BASE_URL}/api/products`;

        const queryParams = window.location.href.replace('?', ' ');
        const queryParamsParts = queryParams.split('=');
        const productId = queryParamsParts[1];

        if (queryParamsParts.length == 2) {
            url += '/' + productId;
        }
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log(error);
            throw new Error(`HTTP Error: ${response.status}`);
        }
    },

    post: async function (url, postData, json = true) {
        return await this.request('POST', url, postData, json);
    },

    request: async function (method, url, postData, json = true) {
        const config = {
            method: method,
            headers: {},
            body: null,
        };

        if (json) {
            config.headers['Content-Type'] = 'application/json';
            config.body = JSON.stringify(postData);
        } else {
            config.body = postData;
        }

        const token = await this.getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, config);
        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || JSON.stringify(data));
        }
    },

    loginUser: async function (user) {
        const url = `${BASE_URL}/auth/login`;
        return await this.post(url, user);
    },

    registerUser: async function (user) {
        const url = `${BASE_URL}/auth/register`;
        return await this.post(url, user);
    },

    saveToken: async function (token) {
        localStorage.setItem(TOKEN_KEY, token);
    },

    getToken: async function () {
        return localStorage.getItem(TOKEN_KEY);
    },

    userIsLogged: function () {},

    uploadImage: function (image) {},

    getUser: function () {},

    saveProduct: async function (product) {
        const url = `${BASE_URL}/api/products`;
        if (product.image) {
            const imegeUrl = await uploadImage(product.image);
            product.image = imegeUrl;
        }
        return await this.post(url, product);
    },

    deleteProduct: function () {},
};

export default DataService;
