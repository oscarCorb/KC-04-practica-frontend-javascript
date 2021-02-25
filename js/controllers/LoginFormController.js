import dataService from '../services/DataService.js';
import BaseController from './BaseController.js';

class LoginFormController extends BaseController {
    constructor(element) {
        super(element);
        this.attachEventListener();
        this.inputFocus();
    }

    attachEventListener() {
        this.element.addEventListener('submit', async (event) => {
            event.preventDefault();
            const user = {
                username: this.element.elements.email.value,
                password: this.element.elements.password.value,
            };

            this.publish(this.events.START_LOADING);
            try {
                const data = await dataService.loginUser(user);
                dataService.saveToken(data.accessToken);
            } catch (error) {
                this.publish(this.events.ERROR, error);
            } finally {
                this.publish(this.events.FINISH_LOADING);
            }
            window.location.href = '/index.html';
        });
    }

    inputFocus() {
        const input = document.querySelector('input');
        input.focus();
    }
}

export default LoginFormController;
