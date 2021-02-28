export const productListView = (product) => {
    const price = product.price.toFixed(2).replace(/[.]/, ',');
    return `<div class="product-image">
                <img src="./assets/img/products/${product.image}" alt="" />
            </div>
            <div class="product-info">
                <h2 class="product-name"><strong>${product.name}</strong></h2>
                <p class="product-price">${price} €</p>
                <h3 class="product-description">${product.description}</h3>
                <p class="product-condition">${product.condition ? '"Vendo"' : '"Busco"'}</p>
            </div>
            <hr>`;
};

// ** aquí debería poner un link a la página de creación de productos (si usuario autenticado)
export const emptyProductListView = () => {
    return `<p>Todavía no hay anuncios. Crea tu primer anuncio.</p>`;
};

export const errorListView = (errorMessage) => {
    return `<article class="message is-danger">
                <div class="message-body">${errorMessage}</div>
            </article>`;
};

export const productPageView = (product) => {
    let deleteButtonHTML = '';
    if (product.erasable) {
        deleteButtonHTML = `<button class="button is-danger delete-btn">Eliminar</button>`;
    }
    const price = product.price.toFixed(2).replace(/[.]/, ',');
    const tagTitle = product.tags.length > 1 ? 'Categorías: ' : 'Categoría: ';
    const tags = (tagTitle + product.tags).replace(/,/g, ', ');
    return `<h1 class="product-title"><strong>${product.name}</strong></h1>
            <div>
                <img src="./assets/img/products/${product.image}" alt="${product.description}" />
            </div>
            <p class="product-price"><strong>${price} €</strong></p>
            <h2 class="product-description">Descripción: ${product.description}</h2>
            <h3 class="product-tags">${tags}</h3>
            <p class="product-category">Anuncio de ${product.condition ? 'venta' : 'compra'}</p>
            ${deleteButtonHTML}`;
};
