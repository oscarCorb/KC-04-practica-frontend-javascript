import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import { productView } from '../views.js';
import { productEmptyListView } from '../views.js';

class ProductListcontroller extends BaseController {
    constructor(element) {
        super(element);
    }

    render(products) {
        this.publish(this.events.START_LOADING, {});
        try {
            if (products.length < 1) {
                const div = document.createElement('div');
                div.classList.add('empty-product-list');
                const text = productEmptyListView();
                div.innerHTML = text;
                this.element.appendChild(div);
            } else {
                products.forEach((product) => {
                    const article = document.createElement('article');
                    article.classList.add('product');
                    const productHTML = productView(product);
                    article.innerHTML = productHTML;
                    this.element.appendChild(article);
                });
            }
        } catch (error) {
            console.error('Ha ocurrido un error', error);
            this.publish(this.events.ERROR, error);
        } finally {
            this.publish(this.events.FINISH_LOADING, {});
        }
    }

    async loadProducts() {
        // this.loader.showLoading();
        this.publish(this.events.START_LOADING, {});
        try {
            const products = await dataService.getProducts();
            if (products < 1) {
            }
            this.render(products);
        } catch (error) {
            console.error(error);
            this.publish(this.events.ERROR, error);
        } finally {
            // this.loader.hideLoading();
            this.publish(this.events.FINISH_LOADING, {});
        }
    }
}

export default ProductListcontroller;
