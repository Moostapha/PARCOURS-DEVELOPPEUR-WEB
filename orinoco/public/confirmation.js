let params = new URLSearchParams(window.location.search); //param mis en place ds URL objet JS// window.location => URL
let id = params.get("id"); // on use meth get pour aller prendre l'id
let total = params.get("total")
if (id == null) {
    window.location.href = 'index.html';
} else {
 document.getElementById("commande").textContent = id
    // ici il faut prendre dans ton html l'element parent et append numCommande, il faut aussi affiché ton total
 document.getElementById("total").textContent = total + " euros"
};