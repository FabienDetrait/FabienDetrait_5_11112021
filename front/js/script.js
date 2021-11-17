// URL de l'API
const URL = 'http://localhost:3000/api/products';

// Affichage de tous les produits
fetch(URL)
    .then ( res => res.json())
    .then (function (data) {
        console.log(data);
        for (let canap of data) {
            document.getElementById('items').innerHTML +=
                `<a href="./product.html?id=${canap._id}">
                    <article>
                        <img src="${canap.imageUrl}" alt="${canap.altTxt}">
                        <h3 class="productName">${canap.name}</h3>
                        <p class="productDescription">${canap.description}</p>
                    </article>
                </a>`;
        }
    })
    .catch ( error => alert(error))

