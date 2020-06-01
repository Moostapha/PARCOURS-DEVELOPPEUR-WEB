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

const panier = JSON.parse(localStorage.getItem("panier")) // recuperation contenu exploitable du panier
const tableau = document.getElementById("tableau1")
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
const table = document.getElementById("tableau")
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



/*Pour les routes POST, l'objet “contact” envoyé au serveur doit contenir les champs
prénom, nom, adresse, ville et adresse électronique. Tous les champs sont
obligatoires.
Le tableau de produits envoyé au serveur doit être un tableau de strings intitulé
products qui contiendra les id des produits à commander
*/ 


// GESTION EVENEMENT AU CLIQUE SUR LE BOUTON VALIDER DU FORMULAIRE
const btnValider = document.getElementById("btn-valider")
btnValider.addEventListener('click' , () => {
    console.log("Bouton bien appuyé !!!")
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


    //REQUETE XMLHttp ici
    const request = new XMLHttpRequest();
    //ENVOIE DE LA METHODE ET HEADER INDIQUANT LE TYPE DU CONTENU DE LA REQUETE JSON
    request.open('POST' , "http://localhost:3000/api/cameras/order");
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({contact:contact,products:products}));
});









