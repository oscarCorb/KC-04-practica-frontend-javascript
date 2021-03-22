const BASE_URL = 'http://127.0.0.1:8000';
const TOKEN_KEY = 'token';

const DataService = {
    getProduct: async function () {
        let url;
        const currentUser = await this.getUser();
        const queryParams = window.location.href.replace('?', ' ');
        const queryParamsParts = queryParams.split('=');
        const productId = queryParamsParts[1];
        if (queryParamsParts.length == 2) {
            url = `${BASE_URL}/api/products/${productId}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            data.erasable = currentUser ? currentUser.userId === data.userId : false;
            data.name = data.name.replace(/(<([^>]+)>)/gi, '');
            data.description = data.description.replace(/(<([^>]+)>)/gi, '');
            return data;
        } else {
            throw new Error(`HTTP Error: ${response.status}`);
        }
    },

    getProducts: async function () {
        const currentUser = await this.getUser();
        const url = `${BASE_URL}/api/products`;

        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data.map((product) => {
                const user = product.user || {};
                return {
                    name: product.name.replace(/(<([^>]+)>)/gi, ''),
                    description: product.description.replace(/(<([^>]+)>)/gi, ''),
                    price: product.price,
                    condition: product.condition,
                    tags: product.tags,
                    image: product.image || null,
                    id: product.id,
                    author: user.username || 'desconocido',
                    erasable: currentUser
                        ? currentUser.userId === product.userId
                        : false,
                };
            });
        } else {
            throw new Error(`HTTP Error: ${response.status}`);
        }
    },

    post: async function (url, postData, json = true) {
        return await this.request('POST', url, postData, json);
    },

    delete: async function (url) {
        return await this.request('DELETE', url, {});
    },

    put: async function (url, putData, json = true) {
        return await this, request('PUT', url, putData, json);
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

    deleteToken: async function () {
        localStorage.clear();
    },

    getToken: async function () {
        return localStorage.getItem(TOKEN_KEY);
    },

    isUserLogged: async function () {
        const token = await this.getToken();
        return token !== null; // return true or false
    },

    uploadImage: function (image) {},

    getUser: async function () {
        try {
            const token = await this.getToken();
            const tokenParts = token.split('.');
            if (tokenParts.length !== 3) {
                return null;
            }
            const payload = tokenParts[1];
            const jsonStr = atob(payload);
            const { userId, username } = JSON.parse(jsonStr);
            return { userId, username };
        } catch (error) {
            return null;
        }
    },

    saveProduct: async function (product) {
        const url = `${BASE_URL}/api/products`;
        if (product.image) {
            const imageUrl = await uploadImage(product.image);
            product.image = imageUrl;
        }
        return await this.post(url, product);
    },

    deleteProduct: async function (product) {
        const url = `${BASE_URL}/api/products/${product.id}`;
        return await this.delete(url);
    },
};

export default DataService;
