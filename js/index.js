import ProductListController from './controllers/ProductListController.js';
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';

async function startUp() {
    const loaderElement = document.querySelector('.lds-dual-ring');
    const loaderController = new LoaderController(loaderElement);

    const productListElement = document.querySelector('.product-list');
    const productListController = new ProductListController(productListElement);
    productListController.loadProducts();

    const errorElement = document.querySelector('.global-errors');
    const errorController = new ErrorController(errorElement);
    // errorController.showError('¡Mensaje de error!');
}

window.addEventListener('DOMContentLoaded', startUp);
