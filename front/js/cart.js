// Récupération de nos produits stockés dans le Local Storage
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(produitLocalStorage);


// *************************************** Affichage du panier ***********************************************


// *************** Affichage des produits ***************

// Si panier vide
if (produitLocalStorage === null) {
    document.getElementById('cartAndFormContainer').innerHTML = `<h1>Votre panier est vide</h1>`;
// Sinon
} else {
    for (let article of produitLocalStorage) {
        // Prix des produits en fonction de leur quantité
        let productPriceUnit = article.productPrice * article.productQty;
        // Ajout des élements dans le HTML
        document.getElementById('cart__items').innerHTML += 
        `<article class="cart__item" data-id="${article.productId}" data-color="${article.productColor}">
        <div class="cart__item__img">
          <img src="${article.productImg}" alt="${article.productAltImg}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>Nom du produit : ${article.productName}</h2>
            <p>Couleur : ${article.productColor}</p>
            <p>Prix : ${productPriceUnit} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.productQty}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
    }
}

// *************** Quantité Totale de produits ***************

const reducer = (accumulator, currentValue) => accumulator + currentValue;

// Quantité Totale dans le local Storage
let qtyTotal = [];

for (let qty of produitLocalStorage) {
    let qtyProductLocalStorage = parseInt(qty.productQty);
    qtyTotal.push(qtyProductLocalStorage);
}

// Additionner les quantités
let totalQuantity = qtyTotal.reduce(reducer);
document.getElementById('totalQuantity').innerHTML = totalQuantity;


// *************** Prix total dans le panier ***************

// Prix Total dans le local Storage
let priceTotal = [];

for (let price of produitLocalStorage) {
    let priceProductLocalStorage = parseInt(price.productPrice) * parseInt(price.productQty);
    priceTotal.push(priceProductLocalStorage);
}

// Additionner les prix
let totalPrice = priceTotal.reduce(reducer);
console.log(totalPrice);
document.getElementById('totalPrice').innerHTML = totalPrice;

















