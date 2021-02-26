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
            if (products.length < 1) {
                console.log(products);
                const div = document.createElement('div');
                div.classList.add('empty-product-list');
                const text = emptyProductListView();
                div.innerHTML = text;
                this.element.appendChild(div);
            } else {
                products.find((product) => {
                    const article = document.createElement('article');
                    article.classList.add('product');

                    article.addEventListener('click', () => {
                        window.location.href = 'product.html?id=' + product.id;
                    });

                    const productHTML = productListView(product);
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
        this.publish(this.events.START_LOADING, {});
        try {
            const products = await dataService.getProducts();

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
