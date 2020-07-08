//IMPORT FONCTION storageCart POUR LES FONCTIONNALITES DU PANIER ET APPEL DE CELLE CI
import { storageCart } from './storageCart.js';
//APPEL DE CETTE FONCTION
storageCart();



//recuperation contenu exploitable du panier
const panier = JSON.parse(localStorage.getItem("panier"))

//Corps tbody du tableau avec éléments produits ajoutes dynamiquement
const tableau = document.getElementById("contenu-tableau")

// initialisation total global des sous-totaux
let total = 0

//CONSTRUCTION DU TABLEAU "RESUME DE COMMANDE"
//FONCTION TETE DU TABLEAU AVEC LES INTITULES TIRES COLONNE DU TABLEAU
function teteTableau() {
    panier.forEach(element => {

        console.log(element);
        const tr = document.createElement("tr")
        const tdNom = document.createElement("td")
        const tdPrix = document.createElement("td")
        const tdQuantite = document.createElement("td")
        const tdTotal = document.createElement("td")

        tdNom.textContent = element.name
        tdPrix.textContent = element.price / 100 + "€"
        tdQuantite.textContent = element.quantite
        tdTotal.textContent = element.quantite * element.price + "€"
        total += element.quantite * element.price

        tr.append(tdNom)
        tr.append(tdPrix)
        tr.append(tdQuantite)
        tr.append(tdTotal)
        tableau.append(tr)
    })
}

teteTableau();
console.log(total)

// Tableau pere avec les entetes,colonnes => Inclusion de tbody dedans

function corpsTableau() {
    const table = document.getElementById("tableau")
    const tr = document.createElement("tr")
    const tdTotalPanier = document.createElement("td").textContent = total + "€"
    const tdTotalPanier1 = document.createElement("td")
    const tdTotalPanier2 = document.createElement("td")
    const tdTotalPanier3 = document.createElement("td")
    const tdTotalPanier4 = document.createElement("td")
    // decalage de total
    tr.append(tdTotalPanier1)
    tr.append(tdTotalPanier2)
    tr.append(tdTotalPanier3)
    tr.append(tdTotalPanier4)
    //append du total (addition des sous-totaux)
    tr.append(tdTotalPanier)
    table.append(tr)
}
corpsTableau()

//FONCTION CONTACT QUI RECUPERE LES DONNEES ENTREES DANS LE FORMULAIRE CONTACT
function contact() {

    const contact = {
        firstName: document.getElementById("prenom").value,
        lastName: document.getElementById("nom").value,
        address: document.getElementById("adresse").value,
        city: document.getElementById("ville").value,
        email: document.getElementById("mail").value
    }
    return contact
}

//FONCTION PRODUITS QUE RECUPERE LES PRODUITS AJOUTES
function products() {
    const products = [];
    panier.forEach(element => {
        products.push(element._id)
    });
    return products
}

//ENCODAGE URL DES INFOS VALIDATION DE LA COMMANDE DANS UN LIEN RENVOYANT A LA PAGE CONFIRMATION
const btnValider = document.getElementById("btn-valider")

// GESTION EVENEMENT AU CLIQUE SUR LE BOUTON VALIDER DU FORMULAIRE
btnValider.addEventListener('submit', (event) => {

    event.preventDefault()
    const usercontact = contact()
    const userproducts = products()

    // ENVOI USERINFO + TABLEAU PRODUITS AU SERVEUR
    envoicontactEtProduit(usercontact, userproducts)
    
});

function envoicontactEtProduit(contact, products) {

    fetch("http://localhost:3000/api/cameras/order", {
        method: 'POST',
        headers: {
            //accepter que du JSON
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors', //restrictions securite au niveau des requetes
        body: JSON.stringify({ contact: contact, products: products }) //Corps de la requete  qui gere son corps + réponse 
    })
    .then(response => response.json())
    .then(reponseCommande => {
        window.location = 'confirmation.html?id=' + reponseCommande.orderId + " &total= " + total//orderId vient du serveur
    })
    
}







