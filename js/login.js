import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import LoginFormController from './controllers/LoginFormController.js';

const startUp = () => {
    const loaderElement = document.querySelector('.lds-dual-ring');
    const loaderController = new LoaderController(loaderElement);

    const errorElement = document.querySelector('.global-errors');
    const errorController = new ErrorController(errorElement);

    const formElement = document.querySelector('form');
    const loginFormController = new LoginFormController(formElement);
};

window.addEventListener('DOMContentLoaded', startUp);
