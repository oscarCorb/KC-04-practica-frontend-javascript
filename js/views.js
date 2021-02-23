export const productView = (item) => {
    return `<div class="product-image">
                <img src="./assets/img/products/${item.image}" alt="" />
            </div>
            <div class="product-info">
                <h2 class="product-name">${item.name}</h2>
                <p class="product-description">${item.description}</p>
                <p class="product-price">${item.price.toFixed(2).replace(/[.]/, ',')} €</p>
                <p class="product-condition">${item.type ? 'Vendo' : 'Busco'}</p>
            </div>
            <hr>`;
};

export const productEmptyListView = () => {
    return `<p>Todavía no hay anuncios. Crea tu primer anuncio.</p>`;
};

export const errorView = (errorMessage) => {
    return `<article class="message is-danger">
                <div class="message-body">${errorMessage}</div>
            </article>`;

    // return `<div class="error-block">
    //             <div class="error-header">
    //                 <p>Error</p>
    //                 <button class="delete" aria-label="delete">x</button>
    //             </div>
    //             <div class="error-message">
    //                 <p>${errorMessage}</p>
    //             </div>
    //         </div>`;
};
