import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import { productListView } from '../views.js';
import { emptyProductListView } from '../views.js';

class ProductListcontroller extends BaseController {
    constructor(element) {
        super(element);
    }

    render(products) {
        this.publish(this.events.START_LOADING, {});
        try {
            // if no products, it renders "no products" view
            if (products.length < 1) {
                const div = document.createElement('div');
                div.classList.add('empty-product-list');
                const text = emptyProductListView();
                div.innerHTML = text;
                this.element.appendChild(div);
            } else {
                // it renders product list in home page
                products.forEach((product) => {
                    const article = document.createElement('article');
                    article.classList.add('product');
                    const productHTML = productListView(product);
                    article.innerHTML = productHTML;
                    article.addEventListener('click', () => {
                        window.location.href = 'product.html?id=' + product.id;
                    });
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
        this.publish(this.events.START_LOADING, {});
        try {
            // it gets product list from DataService
            const products = await dataService.getProducts();
            // it reverses list to display new products first
            let reverseProducts = [];
            for (let i = products.length - 1; i >= 0; i--) {
                reverseProducts.push(products[i]);
            }
            this.render(reverseProducts);
        } catch (error) {
            console.error(error);
            this.publish(this.events.ERROR, error);
        } finally {
            this.publish(this.events.FINISH_LOADING, {});
        }
    }
}

export default ProductListcontroller;
