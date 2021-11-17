// URL de l'API
const URL_API = 'http://localhost:3000/api/products/';

// Récupération de la chaîne de requête dans l'url
const QUERYSTRING_URL_ID = window.location.search;

// Extraction de l'id
const URL_ID = new URLSearchParams(QUERYSTRING_URL_ID);
const ID = URL_ID.get('id');

// Récupération de nos éléments en fonction de l'ID
fetch(URL_API + ID)
    .then ( res => res.json())
    .then ( function (data) {
        // console.log(data);
        // Récupération de l'image
        document.querySelector('.item__img').innerHTML = `<img id="item__img" src="${data.imageUrl}" alt="${data.altTxt}"s>`;
        // Récupération du nom du produit
        document.getElementById('title').innerHTML = `${data.name}`;
        // Récupération du prix
        document.getElementById('price').innerHTML = `${data.price}`;
        // Récupération de la description
        document.getElementById('description').innerHTML = `${data.description}`;
        // Choix de la couleur
        let color = data.colors;
        for (let i in color) {
            document.getElementById('colors').innerHTML += `<option value="${color[i]}">${color[i]}</option>`
        };
    })
    .catch ( error => alert(error))


// ******************************************* PANIER **********************************************************

//Ajout au panier en cliquant sur le bouton
document.querySelector('#addToCart').addEventListener('click', function (e) {
    
    //Récupération des éléments du produit sélectionné pour le panier
    let productSelected = {
        productId: ID,
        productName: document.getElementById('title').innerText,
        productImg: document.getElementById('item__img').src,
        productPrice: document.getElementById('price').innerText,
        productColor: document.getElementById('colors').value,
        productQty: document.getElementById('quantity').value,
    };

    function ajoutPanier() {
        // Variable pour les produits du local Storage
        let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

        // si il y a des produits enregistrés dans le localstorage
        if (produitLocalStorage) {
            produitLocalStorage.push(productSelected);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        }
        // si il n'y a pas de produits enregistrés dans le localstorage
        else {
            produitLocalStorage = [];
            produitLocalStorage.push(productSelected);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        }
        console.log(produitLocalStorage)
    }

    // Message d'alerte si couleur/quantités mal/non renseignées + si ok, rajout au panier
    for (let i in productSelected) {
        if (productSelected.productColor === '') {
            alert("Merci de sélectionner une couleur");    
            break;
        } else if (productSelected.productQty == 0 || productSelected.productQty > 100) {
            alert("Merci de rensigner le nombre d'articles que vous souhaitez (entre 1 et 100)");
            break;
        } else {
            ajoutPanier();
            break;
        }
    }
});




