// Récupération de nos produits stockés dans le Local Storage
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(produitLocalStorage);

// constante pour méthode reduce()
const reducer = (accumulator, currentValue) => accumulator + currentValue;


// *************************************** Affichage du panier ***********************************************

// *************** Affichage des produits ajoutés ***************
 
// Si panier vide
if (produitLocalStorage === null) {
    document.getElementById('cartAndFormContainer').innerHTML = `<h1>Votre panier est vide</h1>`;
// Sinon
} else {
    for (let article of produitLocalStorage) {
      document.getElementById('cart__items').innerHTML += 
      `<article class="cart__item" data-id="${article.productId}" data-color="${article.productColor}">
        <div class="cart__item__img">
          <img src="${article.productImg}" alt="${article.productAltImg}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>Nom du produit : ${article.productName}</h2>
            <p>Couleur : ${article.productColor}</p>
            <p>Prix : ${article.productPrice} €</p>
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

// Quantité Totale dans le local Storage
function basketQty() {
  let qtyTotal = [];
  for (let qty of produitLocalStorage) {
      let qtyProductLocalStorage = parseInt(qty.productQty);
      qtyTotal.push(qtyProductLocalStorage);
  }
  // Additionner les quantités
  let totalQuantity = qtyTotal.reduce(reducer);
  document.getElementById('totalQuantity').innerHTML = totalQuantity;
}
basketQty();


// *************** Prix total dans le panier ***************

// Prix Total dans le local Storage
function basketPrice() {
  let priceTotal = [];
  for (let price of produitLocalStorage) {
      let priceProductLocalStorage = price.productPrice * price.productQty;
      priceTotal.push(priceProductLocalStorage);
  }
  // Additionner les prix
  let totalPrice = priceTotal.reduce(reducer);
  document.getElementById('totalPrice').innerHTML = totalPrice;
}
basketPrice();


// *************** Changement Quantité ***************

document.querySelector("#cart__items").addEventListener('change', function(changeQty) {

  const id = changeQty.target.closest('.cart__item').dataset.id;
  const color = changeQty.target.closest('.cart__item').dataset.color;

  for (let product of produitLocalStorage) {
    if (product.productId === id && product.productColor === color) {
      if (changeQty.target.value == 0) {
        alert("Si vous ne souhaitez pas l'article, veuillez plutôt le supprimer svp !");
        changeQty.target.value = product.productQty;
      } else if (changeQty.target.value > 100) {
        alert("Désolé, nous n'avons que 100 produits en stock, veuillez donc sélectionner un nombre entre 1 et 100");
        changeQty.target.value = product.productQty;
      } else {
        product.productQty = changeQty.target.value;
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
      }
    }
  }
  
  basketQty()
  basketPrice();
  console.table(produitLocalStorage);
});


















