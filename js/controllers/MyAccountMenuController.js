import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';

class MyAccountMenuController extends BaseController {
    constructor(element) {
        super(element);
        this.checkIfUserIsLogged();
        this.closeAccountSession();
    }

    // it clears token if the user logs out
    closeAccountSession() {
        const closeSessiontBtn = document.querySelector('.close-session-btn');
        closeSessiontBtn.addEventListener('click', async () => {
            await dataService.deleteToken();
        });
    }

    myAccountButtons(userIsLogged) {
        const closeSessionBtn = document.querySelector('.close-session-btn');
        const loginBtn = document.querySelector('.login-btn');
        // it displays "log out" link if the user is logged in
        if (userIsLogged) {
            closeSessionBtn.classList.remove('hidden');
            loginBtn.classList.add('hidden');
            // it displays "log in" link if the user isn't logged in
        } else {
            loginBtn.classList.remove('hidden');
        }
    }

    // if user is logged in, it displays "create product" button
    async checkIfUserIsLogged() {
        const createProductBtn = document.querySelector('.create-product-btn');
        try {
            this.publish(this.events.START_LOADING);
            const userIsLogged = await dataService.isUserLogged();
            if (userIsLogged) {
                createProductBtn.classList.remove('hidden');
                this.myAccountButtons(userIsLogged);
            } else {
                this.myAccountButtons(userIsLogged);
            }
        } catch (error) {
            this.publish(this.events.ERROR, error);
        } finally {
            this.publish(this.events.FINISH_LOADING);
        }
    }
}

export default MyAccountMenuController;
