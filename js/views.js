export const productListView = (product) => {
    return `<div class="product-image">
                <img src="./assets/img/products/${product.image}" alt="" />
            </div>
            <div class="product-info">
                <h2 class="product-name"><strong>${product.name}</strong></h2>
                <p class="product-price">${product.price.toFixed(2).replace(/[.]/, ',')} €</p>
                <h3 class="product-description">${product.description}</h3>
                <p class="product-condition">${product.type ? '"Vendo"' : '"Busco"'}</p>
            </div>
            <hr>`;
};

export const emptyProductListView = () => {
    return `<p>Todavía no hay anuncios. Crea tu primer anuncio.</p>`;
};

export const errorListView = (errorMessage) => {
    return `<article class="message is-danger">
                <div class="message-body">${errorMessage}</div>
            </article>`;
};

export const productPageView = (product) => {
    const tag = product.tags.length > 1 ? 'Categorías: ' : 'Categoría: ';
    return `<h1 class="product-title"><strong>${product.name}</strong></h1>
            <div>
                <img src="./assets/img/products/${product.image}" alt="${product.description}" />
            </div>
            <p class="product-price"><strong>${product.price
                .toFixed(2)
                .replace(/[.]/, ',')} €</strong></p>
            <h2 class="product-description">Descripción: ${product.description}</h2>
            <h3 class="product-tags">${tag + product.tags}</h3>
            <p class="product-category">Anuncio de ${product.type ? 'venta' : 'compra'}</p>`;
};
