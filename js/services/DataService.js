const url = 'http://127.0.0.1:8000/api/products';

// OJO: En sevices no usar arrow functions al definir los métodos

const DataService = {
    getProducts: async () => {
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
