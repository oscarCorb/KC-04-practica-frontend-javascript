import pubSub from '../services/PubSub.js';

class BaseController {
    constructor(element) {
        this.element = element;
        this.pubSub = pubSub;
        this.events = {
            ERROR: 'error',
            START_LOADING: 'startLoading',
            FINISH_LOADING: 'finihsLoading',
            SEARCH: 'search',
            DELETED_PRODUCT: 'deletedProduct',
        };
    }

    subscribe(eventName, eventHandler) {
        this.pubSub.subscribe(eventName, eventHandler);
    }

    publish(eventName, eventData) {
        this.pubSub.publish(eventName, eventData);
    }
}

export default BaseController;
