export function storageCart(){

    const camAdded = localStorage.getItem('panier');
    const compteur = localStorage.getItem('compteur')
    const compteurIconePanier = document.getElementById('span');
    
    // a) INITIALISATION CONTENU PANIER + COMPTEUR ICONE PANIER => CAS OU NEANT DANS PANIER
    if (!camAdded) {
        localStorage.setItem('panier', JSON.stringify([]));
        localStorage.setItem('compteur',JSON.stringify(0));
    }

    // b) HARMONISTATION COMPTEUR ICONE PANIER INDIQUANT LE NOMBRE DE PRODUITS AJOUTES
    if (compteur) {
        compteurIconePanier.textContent = compteur
    }

};

//FONCTION 
//QUI GERE LE COMPTEUR DE L'ICONE PANIER
//RECUPERE LES PRODUITS ET COMPTEUR
//INITIALISE LE COMPTEUR A 0 QUAND RIEN N'EST AJOUTE
//HARMONISE "panier et "compteur" => LE NBRE DE PRODUIT AJOUTE = ICONE COMPTEUR DU PANIER
