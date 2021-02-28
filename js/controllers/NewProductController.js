import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';

class NewProductController extends BaseController {
    constructor(element) {
        super(element);
        this.attachEventListener();
        this.inputFocus();
        this.checkIfUserIsLogged();
    }

    // if user isn't logged in, it redirects to log in page
    async checkIfUserIsLogged() {
        this.publish(this.events.START_LOADING);
        try {
            const userIsLogged = await dataService.isUserLogged();
            if (!userIsLogged) {
                window.location.href = './login.html';
            }
        } catch (error) {
            this.publish(this.events.ERROR, error);
        } finally {
            this.publish(this.events.FINISH_LOADING);
        }
    }

    inputFocus() {
        const input = document.querySelector('input');
        input.focus();
    }

    attachEventListener() {
        this.element.addEventListener('submit', async (event) => {
            event.preventDefault();
            const product = {
                name: this.element.elements.name.value,
                description: this.element.elements.description.value,
                price: this.element.elements.price.value * 1,
                type: this.element.elements.condition.value,
                tags: [],
            };

            let selectedTags = [];
            for (const tag of this.element.tags.selectedOptions) {
                selectedTags.push(tag.value);
            }
            product.tags = selectedTags;

            try {
                this.publish(this.events.START_LOADING);
                await dataService.saveProduct(product);
                window.location.href = '/index.html';
            } catch (error) {
                this.publish(this.events.ERROR, error);
            } finally {
                this.publish(this.events.FINISH_LOADING);
            }
        });
    }
}

export default NewProductController;
