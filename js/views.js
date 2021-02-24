export const productListView = (product) => {
    // window.location.href = '/product.html?' + product.id;
    // ${(window.location.href = '/product.html?' + product.id)}
    // console.log((window.location.href += `?id=${product.id}`));
    // Pista de Kas => anuncio.html?id=1

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

// renombrarlo a errorListView
export const errorView = (errorMessage) => {
    return `<article class="message is-danger">
                <div class="message-body">${errorMessage}</div>
            </article>`;
};

export const productPageView = (product) => {
    return `<h1 class="product-title">${product.name}</h1>
            <p class="product-price">${product.price}</p>
            <div>
                <img src="./assets/img/products/${product.image}" alt="${product.description}" />
            </div>
            <h2 class="product-description">${product.description}</h2>
            <h3 class="product-tags">Tags: ${product.tags}</h3>
            <p class="product-category">${product.type ? 'Venta' : 'Compra'}</p>`;
};
