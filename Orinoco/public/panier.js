//compteur span panier indiquant nbre de produits ajoutes
if (localStorage.getItem('compteur')) {
    document.getElementById("span").textContent = localStorage.getItem('compteur');
    //document.getElementById("tableau").style.display="none"
  }
  
if (!localStorage.getItem("panier")) {
 localStorage.setItem('panier', JSON.stringify([]));
 localStorage.setItem('compteur',JSON.stringify(0));
}

//CONDITION SUR APPARITION DU TABLEAU DE RESUME DE COMMANDE
/*if (localStorage.getItem('compteur') = 0) {
    document.getElementById("tableau").style.display="none"
} else {
    
}*/

const panier = JSON.parse(localStorage.getItem("panier")) //recuperation contenu exploitable du panier
const tableau = document.getElementById("contenu-tableau") //Corps tbody du tableau avec éléments produits ajoutes dynamiquement
// initialisation total global des sous-totaux
let total = 0
panier.forEach(element => {
    console.log(element);
    const tr = document.createElement("tr")
    const tdNom = document.createElement("td")
    const tdPrix = document.createElement("td")
    const tdQuantite = document.createElement("td")
    const tdTotal = document.createElement("td")
    tdNom.textContent = element.name
    tdPrix.textContent = element.price + "€"
    tdQuantite.textContent = element.quantite
    tdTotal.textContent = element.quantite * element.price + "€"
    total += element.quantite * element.price
    tr.append(tdNom)
    tr.append(tdPrix)
    tr.append(tdQuantite)
    tr.append(tdTotal)
    tableau.append(tr)
});
console.log(total)
const table = document.getElementById("tableau") // Tableau pere avec les entetes,colonnes => Inclusion de tbody dedans
const tr = document.createElement("tr")
const tdTotalPanier = document.createElement("td").textContent = total + "€"
const tdTotalPanier1 = document.createElement("td")
const tdTotalPanier2= document.createElement("td")
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


//ENCODAGE URL DES INFOS VALIDATION DE LA COMMANDE DANS UN LIEN RENVOYANT A LA PAGE CONFIRMATION
const btnValider = document.getElementById("btn-valider")

// GESTION EVENEMENT AU CLIQUE SUR LE BOUTON VALIDER DU FORMULAIRE
btnValider.addEventListener('submit' , (event) => {
    event.preventDefault()
    //console.log("Bouton bien appuyé !!!")
    //OBJET DE CONTACT => REFERENCES AUX ELEMENTS HTML DU FORMULAIRE | CLES PRISES DANS CONTROLLER/CAMERA.JS
    const contact =  {
        firstName: document.getElementById("prenom").value,
        lastName: document.getElementById("nom").value,
        address: document.getElementById("adresse").value,
        city: document.getElementById("ville").value,
        email: document.getElementById("mail").value
    }
    console.log(contact);
    
    //TABLEAU PRODUCTS => RECUPERATION DES ID DES PRODUITS AJOUTES AU PANIER
    const products = [];
    panier.forEach(element => {
       products.push(element._id)
    });
    console.log(products)
 
    // ENVOI USERINFO + TABLEAU PRODUITS AU SERVEUR
    fetch("http://localhost:3000/api/cameras/order", {
        method: 'POST',
        headers: {
            //accepter que du JSON
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors', //restrictions securite au niveau des requetes
        body: JSON.stringify({contact:contact,products:products})
    })
    .then(response => response.json())
    .then(reponseCommande => {
        window.location = 'confirmation.html?id=' + reponseCommande.orderId + " &total= " + total//orderId vient du serveur
    })
    .catch(error => console.log(error)) 
});

/*ENONCE => Pour les routes POST, l'objet “contact” envoyé au serveur doit contenir les champs
prénom, nom, adresse, ville et adresse électronique. Tous les champs sont
obligatoires.
Le tableau de produits envoyé au serveur doit être un tableau de strings intitulé
products qui contiendra les id des produits à commander
*/ 








