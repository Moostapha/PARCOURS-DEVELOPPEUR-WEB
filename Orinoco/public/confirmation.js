let params = new URLSearchParams(window.location.search); //param mis en place ds URL objet JS// window.location => URL
let id = params.get("id"); // on use meth get pour aller prendre l'id
let total = params.get("total")
if (id == null) {
    window.location.href = 'index.html';
} 
else {
 //AFFICHAGE DYNAMIQUE DANS ELEMENT PARENT HTML
 //id de commande
 document.getElementById("commande").textContent = id
 //Total en euros 
 document.getElementById("total").textContent = total + " euros"
};
