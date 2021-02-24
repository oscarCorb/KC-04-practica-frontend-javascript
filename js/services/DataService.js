const BASE_URL = 'http://127.0.0.1:8000';

// OJO: En sevices no usar arrow functions al definir los métodos

const DataService = {
    getProducts: async function () {
        let url = `${BASE_URL}/api/products`;

        const queryParams = window.location.href.replace('?', ' ');
        const queryParamsParts = queryParams.split('=');
        const productId = queryParamsParts[1];

        if (queryParamsParts.length == 2) {
            url += '/' + productId;
            console.log('url::', url);
        }
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`HTTP Error: ${response.status}`);
        }
    },
};

export default DataService;
