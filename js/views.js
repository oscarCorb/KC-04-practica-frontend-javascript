export const productListView = (product) => {
    const price = product.price.toFixed(2).replace(/[.]/, ',');

    let image = `<img src="/assets/img/products/default.jpg" alt="${product.description}"/>`;

    if (product.description.match(/##test-product##/)) {
        // just for testing products
        image = `<img src="/assets/img/products/${product.image}" alt="${product.description}"/>`;
    } else if (product.image) {
        image = `<img src="${product.image}" alt="${product.description}"/>`;
    }

    return `<div class="product-image">
                ${image}
            </div>
            <div class="product-info">
                <h2 class="product-name"><strong>${product.name}</strong></h2>
                <p class="product-price">${price} €</p>
                <h3 class="product-description">${product.description}</h3>
                <p class="product-condition">${
                    product.condition ? '"Vendo"' : '"Busco"'
                }</p>
            </div>
            <hr>`;
};

export const emptyProductListView = () => {
    return `<p class="no-items-in-product-list">No se han encontrado productos.</p> 

    <p class="no-items-in-product-list"><a href="/new-product.html">Crea tu primer producto >></a></p>`;
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

    // const image = product.image
    //     ? `<img src="${product.image}" alt="${product.description}"/>`
    //     : `<img src="/assets/img/products/default.jpg" alt="${product.description}"/>`;

    let image = `<img src="/assets/img/products/default.jpg" alt="${product.description}"/>`;

    if (product.description.match(/##test-product##/)) {
        // just for testing products
        image = `<img src="/assets/img/products/${product.image}" alt="${product.description}"/>`;
    } else if (product.image) {
        image = `<img src="${product.image}" alt="${product.description}"/>`;
    }

    return `<h1 class="product-title"><strong>${product.name}</strong></h1>
            ${image}
            <p class="product-price"><strong>${price} €</strong></p>
            <h2 class="product-description">Descripción: ${product.description}</h2>
            <h3 class="product-tags">${tags}</h3>
            <p class="product-category">Anuncio de ${
                product.condition ? 'venta' : 'compra'
            }</p>
            ${deleteButtonHTML}
            <a href="/index.html">
                <button class="button is-info">Volver a la lista</button>
            </a>
            `;
};
