

const URL = 'http://localhost:3000/api/products';


fetch(URL)
    .then (function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then (function (data) {
        console.log(data);
        let affichage = '<a href="./product.html?id=${canap._id}">';
        for (let canap of data) {
            document.getElementById('items').innerHTML =
            affichage += 
                `<article>
                    <img src="${canap.imageUrl}" alt="${canap.altTxt}">
                    <h3 class="productName">${canap.name}</h3>
                    <p class="productDescription">${canap.description}</p>
                </article>`;
        }
        affichage += '</a>';
    })


