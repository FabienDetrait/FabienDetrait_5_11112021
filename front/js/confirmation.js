// Mettre le numéro de commande en récupérant l'orderId
function orderNumber() {
    // Récupération de la chaîne de requête
    const URL_ID = window.location.search;

    // extraire l'id
    const ID_ORDER = new URLSearchParams(URL_ID);
    const ID = ID_ORDER.get('id');

    // mettre l'id en numéro de commande dans le html
    document.getElementById('orderId').innerHTML = ID;
}
orderNumber();

