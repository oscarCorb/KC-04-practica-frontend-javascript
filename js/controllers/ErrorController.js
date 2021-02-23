import BaseController from './BaseController.js';
import { errorView } from '../views.js';

class ErrorController extends BaseController {
    constructor(element) {
        super(element);

        this.subscribe(this.events.ERROR, (error) => {
            this.showError(error);
        });
    }

    showError(errorMessage) {
        this.element.innerHTML = errorView(errorMessage);
        this.element.classList.remove('hidden');
        this.element.addEventListener('click', () => {
            this.hideError();
        });

        setTimeout(() => {
            this.element.classList.add('hidden');
        }, 5000);
    }

    hideError() {
        this.element.classList.add('hidden');
    }
}

export default ErrorController;
