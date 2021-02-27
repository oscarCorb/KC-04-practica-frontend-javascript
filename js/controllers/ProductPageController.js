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
            const deleteButton = article.querySelector('button');
            if (deleteButton) {
                deleteButton.addEventListener('click', async (event) => {
                    const confirmDelete = confirm('¿Seguro que quieres eliminar este producto?');
                    if (confirmDelete) {
                        await dataService.deleteProduct(product);
                        window.location.href = 'index.html';
                        // NO APARECE EL BOTÓN DE ELIMINAR *** NO PASA POR EL IF de la vista, NO SÉ
                        // SI ESTÁ BIEN GESTIONADO LO DE DETECTAR EL USUARIO Y QUIZÁ TENGA QUE
                        // HACER/REVISAR PRIMERO LO DE DETECTAR SI EL USUARIO ESTA AUTENTICADO
                    }
                });
            }
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
            const product = await dataService.getProduct();

            console.log('::product:', product);

            this.renderProduct(product);
        } catch (error) {
            this.publish(this.events.ERROR, error);
        } finally {
            this.publish(this.events.FINISH_LOADING, {});
        }
    }
}

export default ProductPageController;
