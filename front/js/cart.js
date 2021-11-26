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
  // Cas où on supprime tous les produits depuis le panier
  if (qtyTotal.length === 0) {
    document.getElementById('cartAndFormContainer').innerHTML = `<h1>Votre panier est vide</h1>`;
  }
  else {
    // Additionner les quantités
    let totalQuantity = qtyTotal.reduce(reducer);
    document.getElementById('totalQuantity').innerHTML = totalQuantity;
  }
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
  // Cas où on supprime tous les produits depuis le panier
  if (priceTotal.length === 0) {
  }
  else {
  // Additionner les prix
  let totalPrice = priceTotal.reduce(reducer);
  document.getElementById('totalPrice').innerHTML = totalPrice;
  }
}
basketPrice();


// *************** Changement Quantité ***************

// Cas où on supprime tous les produits depuis le panier
if (document.querySelector("#cart__items") === null){
}
else {
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
}


// *************** Suppression d'un produit ***************

const deleteProduct = document.querySelectorAll('.deleteItem');

for (let sup = 0; sup < deleteProduct.length; sup++) {
  deleteProduct[sup].addEventListener('click', function(e) {
    produitLocalStorage.splice(sup, 1);
    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
    alert(`Ce produit a bien été supprimé.`);
    location.reload();
  });
}


// *************************************** Formulaire ***********************************************

let form = document.querySelector(".cart__order__form");

// Validation du prénom
form.firstName.addEventListener('input', function() {
  validFirstName(this);
});

const validFirstName = function(inputFirstName) {
  let firstNameRegExp = new RegExp ("^[a-zA-ZÀ-ÖØ-öø-ÿ'-]{2,}$", "g");
  let testFirstName = firstNameRegExp.test(inputFirstName.value);
  if (testFirstName) {
    document.getElementById('firstNameErrorMsg').innerHTML = '';
    return true;
  } else {
    document.getElementById('firstNameErrorMsg').innerHTML = "Merci de ne saisir que des lettres svp (2 minimum, - et ' autorisés)";
    return false;
  } 
}

// Validation du Nom de famille
form.lastName.addEventListener('input', function() {
  validLastName(this);
});

const validLastName = function(inputLastName) {
  let lastNameRegExp = new RegExp ("^[a-zA-ZÀ-ÖØ-öø-ÿ'-]{2,}$", "g");
  let testlastName = lastNameRegExp.test(inputLastName.value);
  if (testlastName) {
    document.getElementById('lastNameErrorMsg').innerHTML = '';
    return true;
  } else {
    document.getElementById('lastNameErrorMsg').innerHTML = "Merci de ne saisir que des lettres svp (2 minimum, - et ' autorisés)";
    return false;
  } 
}

// Validation de l'adresse
form.address.addEventListener('input', function() {
  validAddress(this);
});

const validAddress = function(inputAddress) {
  let addressRegExp = new RegExp ("^[0-9a-zA-ZÀ-ÖØ-öø-ÿ,'\\s-]{2,}$", "g");
  let testAddress = addressRegExp.test(inputAddress.value);
  if (testAddress) {
    document.getElementById('addressErrorMsg').innerHTML = '';
    return true;
  } else {
    document.getElementById('addressErrorMsg').innerHTML = "Merci de saisir une adresse valide";
    return false;
  } 
}

form.city.addEventListener('input', function() {
  validCity(this);
});

const validCity = function(inputCity) {
  let cityRegExp = new RegExp ("^[a-zA-ZÀ-ÖØ-öø-ÿ,'\\s-]{2,}$", "g");
  let testCity = cityRegExp.test(inputCity.value);
  if (testCity) {
    document.getElementById('cityErrorMsg').innerHTML = '';
    return true;
  } else {
    document.getElementById('cityErrorMsg').innerHTML = "Merci de saisir une ville existante";
    return false;
  } 
}

// Validation de l'email
form.email.addEventListener('input', function() {
  validEmail(this);
});

const validEmail = function(inputEmail) {
  let emailRegExp = new RegExp ("^[a-zA-Z0-9_.-]+[@]{1}[a-zA-Z0-9_-]+[.]{1}[a-z]{2,10}$", "g");
  let testEmail = emailRegExp.test(inputEmail.value);
  if (testEmail) {
    document.getElementById('emailErrorMsg').innerHTML = '';
    return true;
  } else {
    document.getElementById('emailErrorMsg').innerHTML = "Merci de saisir une adresse mail valide";
    return false;
  } 
}


// *************************************** Validation Commande ***********************************************

const confirmationOrder = document.getElementById('order');

confirmationOrder.addEventListener('click', function(e) {
  e.preventDefault();

  if (validFirstName(form.firstName) && validLastName(form.lastName) && validAddress(form.address) && validCity(form.city) && validEmail(form.email)) { 

    // Récupération des valeurs saisies dans le formulaire stockées dans un objet
    const contact = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      address: form.address.value,
      city: form.city.value,
      email: form.email.value
    }
    console.log(contact)

    // Récupération de l'id des produits stocké dans un tableau
    const products = [];
    for (let id of produitLocalStorage) {
      let idProducts = id.productId;
      products.push(idProducts);
    }
    console.log(products)

    // envoi dans le local Storage
    let finalOrder = {
      contact,
      products
    }
    console.log(finalOrder)
    localStorage.setItem("order", JSON.stringify(finalOrder));

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(finalOrder),
      headers: {
        "Content-type": "application/JSON",
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const orderId = data.orderId;
      console.log(orderId);
      window.location = `confirmation.html?id=${orderId}`;
      localStorage.clear();
    });   
  } else {
    alert('Veuillez remplir les champs correctement svp !');
  }
});

