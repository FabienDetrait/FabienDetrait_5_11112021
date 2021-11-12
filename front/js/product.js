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
        // Récupération de l'image
        document.querySelector('.item__img').innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}"s>`;
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
    



