import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';

class RegisterFormController extends BaseController {
    constructor(element) {
        super(element);
        this.attachEventListener();
        this.inputFocus();
    }

    async makePost(user) {
        await dataService.registerUser(user);
        alert('El usuario ha sido creado');
        window.location.href = '/login.html';
    }

    attachEventListener() {
        this.element.addEventListener('submit', async (event) => {
            event.preventDefault();
            const user = {
                username: this.element.email.value,
                password: this.element.password.value,
            };
            this.publish(this.events.START_LOADING);
            try {
                await this.makePost(user);
            } catch (error) {
                this.publish(this.events.ERROR, error);
            } finally {
                this.publish(this.events.FINISH_LOADING);
            }
        });
    }

    inputFocus() {
        const input = document.querySelector('input');
        input.focus();
    }
}

export default RegisterFormController;
