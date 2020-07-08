//IMPORT FONCTION storageCart POUR LES FONCTIONNALITES DU PANIER ET APPEL DE CELLE CI
import { storageCart } from './storageCart.js';
//APPEL DE CETTE FONCTION
storageCart();



//MES FONCTIONS PERSONNALISEES AJOUT DYNAMIQUE (VIA JS/DOM) 

// 1) affichage de l'image de la cam chosen
function afficherImageCamChoisie(dataId) {

    //mes div pour afficher
    const sectionImage = document.createElement('section')
    const imageProduit = document.createElement('img');

    //Contenu en donnees de mes div (correspondant à la cam choisie avec son Id)
    imageProduit.src = dataId.imageUrl;

    //image dans section
    sectionImage.appendChild(imageProduit)

    //Injection de mes div créée dans la balise parent HTML 'main'
    const main = document.getElementById('main-produit');
    main.appendChild(sectionImage);
}

// 2) affichage du texte de la cam chosen
function afficherTexteCamChoisie(dataId) {

    //mes div pour afficher
    const camTitle = document.createElement('h1');
    const camDescription = document.createElement('p');
    const camPrice = document.createElement('p');
    const camReference = document.createElement('p');

    //Contenu en donnees de mes div (correspondant à la cam choisie avec son Id)
    camTitle.textContent = dataId.name;
    camDescription.textContent = 'DESCRIPTION: ' + dataId.description;
    camPrice.textContent = 'PRIX: ' + dataId.price / 100 + "€";
    camReference.textContent = "REFERENCE: " + dataId._id;

    //Injection de mes div créée dans la balise parent HTML 'main'
    const main = document.getElementById('main-produit');
    main.appendChild(camTitle);
    main.appendChild(camDescription);
    main.appendChild(camPrice);
    main.appendChild(camReference);
}


// 3) FONCTION POUR BOUTON PERSONNALISER
function customiser(dataId) {

    //mes div pour afficher

    const selectLentille = document.createElement("select")
    //selectLentille.className = 'btn'
    const label = document.createElement('label')
    label.innerHTML = "Personnalisez votre lentille"

    //sectionPersonnalisation.appendChild(selectLentille)

    //option et son texte
    const selection = document.createElement("option")

    selection.textContent = 'Veuillez sélectionner ici'
    selectLentille.appendChild(selection)


    const sectionPersonnalisation = document.createElement('section')
    sectionPersonnalisation.appendChild(label)
    sectionPersonnalisation.appendChild(selectLentille)


    //Boucle de récupération des options de lentilles des cameras
    var array = dataId.lenses; //def de la variable contenant key de ce sur quoi on veut boucler

    for (let index = 0; index < array.length; index++) {

        const optionLentille = document.createElement("option")
        optionLentille.append(array[index])
        selectLentille.appendChild(optionLentille)

    }

    //Injection de mes div créée dans la balise parent HTML 'main'
    const main = document.getElementById('main-produit');
    main.appendChild(sectionPersonnalisation)
    main.appendChild(selectLentille);

}

//4) FONCTION BOUTON AJOUTER PRODUIT AU PANIER
function addToCart(dataId) {

    //mise en place du bouton ajouter au panier
    const btnAjouter = document.createElement("button")
    btnAjouter.classList.add("btn1")
    const texteBtnAjouter = document.createElement("h2")
    texteBtnAjouter.innerHTML = "Ajouter au panier"
    btnAjouter.append(texteBtnAjouter)

    //Injection de mes div créée dans la balise parent HTML 'main'
    const main = document.getElementById('main-produit')
    const sectionBtn = document.createElement('section')
    sectionBtn.appendChild(btnAjouter)
    main.append(sectionBtn)

    //EVENEMENT SUR BTN AJOUTER ET COMPTEUR DU NBRE DE PRODUITS AJOUTES + LOGIQUE COMPTEUR

    btnAjouter.addEventListener('click', () => { 

        //recuperation du contenu de localStorage exploitable (conversion) objet tableau
        const panier = JSON.parse(localStorage.getItem("panier"))
        console.log(dataId)

        //Boucle sur le panier pour ne pas repeter twice un produit ajouté
        // on initialise qu'il n'y a rien
        let produitAjoute = false 
        
        //CONDITION CAS OU PRODUIT PRESENT DANS LE PANIER
        panier.forEach(element => { 
            if (element.name === dataId.name) {
                produitAjoute = true
                //console.log(typeof(element.quantite))
                element.quantite = element.quantite + 1
            }
        });
        
        // si existence donc si existe = vraie
        if (produitAjoute) {
        
            localStorage.setItem('panier', JSON.stringify(panier))
            //console.log("test")
        }
        else {
            dataId.quantite = 1
            panier.push(dataId)
            localStorage.setItem('panier', JSON.stringify(panier))
        }
        
        //Synchronisation compteur de l'icone panier avec click
        let compteur = parseInt(document.getElementById("span").textContent)
        compteur++
        localStorage.setItem('compteur', compteur)
        document.getElementById("span").textContent = localStorage.getItem('compteur')

    })


}

//5) FONCTION getIdCamChoisie() => ENCODAGE URL POUR RECUPERER LE ID DE LA CAM CHOISIE DANS ACCUEIL | FETCH 
//FONCTION D'ENCODAGE URL AVEC IDCAM 

function getIdCamChoisie() {
    const queryString = window.location.search;
    const url = new URLSearchParams(queryString);
    return url.get("id")
}

//stocke la valeur de la fonction et la déclare
const id = getIdCamChoisie();

const response = fetch("http://localhost:3000/api/cameras/" + id);

//GESTION DE LA REPONSE (ERREURS)


response.then(dataId => dataId.json())
.then(dataId => {

    //Appel de mes fonctions ici
    console.log(dataId);
    afficherImageCamChoisie(dataId);
    afficherTexteCamChoisie(dataId);
    customiser(dataId);
    addToCart(dataId);
})
.catch(error => {
    //console.log(error)
    alert('Désolé, une erreur est apparue !!! Retour du serveur : ' + response.status);
    window.location.href = 'index.html';
})



    




