import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';

class MyAccountMenuController extends BaseController {
    constructor(element) {
        super(element);
        this.checkIfUserIsLogged();
        this.closeAccountSession();
    }

    // delete token if the user close their session
    closeAccountSession() {
        const closeSessiontBtn = document.querySelector('.close-session-btn');
        closeSessiontBtn.addEventListener('click', async () => {
            await dataService.deleteToken();
        });
    }

    // display 'login' if user isn't logged in or 'close account' if is logged in
    myAccountButtons(userIsLogged) {
        const closeSessionBtn = document.querySelector('.close-session-btn');
        const loginBtn = document.querySelector('.login-btn');
        if (userIsLogged) {
            closeSessionBtn.classList.remove('hidden');
            loginBtn.classList.add('hidden');
        } else {
            loginBtn.classList.remove('hidden');
        }
    }

    // if user is logged in, display "create product" button
    async checkIfUserIsLogged() {
        const createProductBtn = document.querySelector('.create-product-btn');
        console.log(createProductBtn);
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
