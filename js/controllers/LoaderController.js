import BaseController from './BaseController.js';

class LoaderController extends BaseController {
    constructor(element) {
        super(element);
        // en cuando se instancie esta clase, se activa la escucha del 'subscribe'
        this.subscribe(this.events.START_LOADING, () => {
            this.showLoading();
        });
        this.subscribe(this.events.FINISH_LOADING, () => {
            this.hideLoading();
        });
    }

    showLoading() {
        this.element.classList.remove('hidden');
    }

    hideLoading() {
        this.element.classList.add('hidden');
    }
}

export default LoaderController;
