import ProductPageController from './controllers/ProductPageController.js';
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';

const startUp = () => {
    const loaderElement = document.querySelector('.lds-dual-ring');
    const loaderController = new LoaderController(loaderElement);

    const errorElement = document.querySelector('.global-errors');
    const errorController = new ErrorController(errorElement);

    const productElement = document.querySelector('.product-wrapper');
    const productPageController = new ProductPageController(productElement);
    productPageController.loadProduct();
};

window.addEventListener('DOMContentLoaded', startUp);
