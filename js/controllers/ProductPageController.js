import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import { productPageView } from '../views.js';

class ProductPageController extends BaseController {
    constructor(element) {
        super(element);
    }

    renderProduct(product) {
        this.publish(this.events.START_LOADING, {});
        try {
            const article = document.createElement('article');
            article.classList.add('product');
            article.innerHTML = productPageView(product);
            this.element.appendChild(article);
        } catch (error) {
            console.error('Ha ocurrido un error', error);
            this.publish(this.events.ERROR, error);
        } finally {
            this.publish(this.events.FINISH_LOADING, {});
        }
    }

    async loadProduct() {
        this.publish(this.events.START_LOADING, {});
        try {
            const product = await dataService.getProducts();
            this.renderProduct(product);
        } catch (error) {
            this.publish(this.events.ERROR, error);
        } finally {
            this.publish(this.events.FINISH_LOADING, {});
        }
    }
}

export default ProductPageController;
