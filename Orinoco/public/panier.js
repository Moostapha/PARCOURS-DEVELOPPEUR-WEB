//compteur span panier indiquant nbre de produits ajoutes
if (localStorage.getItem('compteur')) {
    document.getElementById("span").textContent = localStorage.getItem('compteur');
  }
  
if (!localStorage.getItem("panier")) {
 localStorage.setItem('panier', JSON.stringify([]));
 localStorage.setItem('compteur',JSON.stringify(0));
 
}
 
//CONDITION SUR APPARITION DU TABLEAU DE RESUME DE COMMANDE

const panier = JSON.parse(localStorage.getItem("panier"))
const tableau = document.getElementById("tableau")

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
    tr.append(tdNom)
    tr.append(tdPrix)
    tr.append(tdQuantite)
    tr.append(tdTotal)
    tableau.append(tr)
});












/*let panierAjout = document.querySelectorAll('.btn1');

//Loop for sur variable panierAjout qui est un type objet
for (let index = 0; index < panierAjout.length; index++) {
     panierAjout[index].addEventListener('click', () => {
        nbreProduitAjouter();
    });
}*/

/* 
1) Création d'une fonction nbrePoduitAjouter 
avec localstorage pour garder en mémoire produits ajouter.
Fonction callback de l'ecoute d'evenement (créée ici puis collée en haut)
2) setItem(clé, valeur) on garde en mémoire la clé et la valeur du produit ajouté
3) getItem nous permet de saisir et de regarder son type qui est un string il va falloir
convertir notre nbrePoduitAjoute en int
4) Conversion string => int avec parseInt
*/

/*function nbreProduitAjouter() {
 let nbreProduitAjouter = localStorage.getItem('nbreProduitAjouter');
 nbreProduitAjouter = parseInt(nbrePoduitAjouter);
 console.log(nbreProduitAjouter);
 console.log(typeof nbreProduitAjouter);
 localStorage.setItem ('nbreProduitAjouter',1)
}*/