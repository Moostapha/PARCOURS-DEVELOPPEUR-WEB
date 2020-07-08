// 1) FONCTION AJOUTANT LA SECTION "DIV+IMAGE" DES CAMERAS
function ajoutSectionImageCamera(divImg , imageCamera) {
    
    const image = document.createElement("img");   
    divImg.appendChild(image);                   
    image.setAttribute('src' , imageCamera);
}


// 2) FONCTION POUR LA SECTION "DIVTEXT" => NOM + DESCRIPTION + TARIF + REFERENCE (ID DE LA CAMERA)
function ajoutSectionTexteCamera(divTexte , nom , description , prix , reference){
 
 const nomCam = document.createElement('h1');
 nomCam.textContent = nom
 divTexte.appendChild(nomCam);

 const descriptionCam = document.createElement('p');
 descriptionCam.textContent = 'DESCRIPTION: '+ description;
 divTexte.appendChild(descriptionCam);

 const tarifCam = document.createElement('p');
 tarifCam.textContent = 'PRIX: ' + prix/100 + "€";
 divTexte.appendChild(tarifCam);

 const referenceCam = document.createElement('p');
 referenceCam.textContent = 'REFERENCE: '+ reference;
 divTexte.appendChild(referenceCam);

 
}

// 3) FONCTION BOUTON "VOIR PRODUIT"
function boutonVoirProduit (divTexte , identifiantCamera){
    
    const button = document.createElement('button');
    button.className = 'btn';
    divTexte.appendChild(button);
    const buttonTitle = document.createElement('h2');
    const buttonLink = document.createElement('a');
    buttonLink.textContent = 'Voir ce produit';
    buttonLink.href = './produit.html?id=' + identifiantCamera ; //lien vers page produit URL=page produit +identifiant onecamera
    buttonTitle.appendChild(buttonLink);
    button.appendChild(buttonTitle);
}



/*DOC IMPORT/EXPORT DE MODULES (PG) 
JS => Les éléments d’un module qui peuvent être exportés doivent être précédés de la déclaration export.
Pour importer ensuite ces éléments dans d’autres modules, nous allons devoir utiliser la déclaration
import suivi nom de l’élément à importer suivi du mot clef from suivi du chemin relatif du fichier
importé par rapport au fichier qui l’importe.
HTML => Lorsqu’on importe un module dans un fichier HTML, il faut également le préciser dans la balise
ouvrante de l’élément script*/

// 4) IMPORT FONCTION storageCart POUR LES FONCTIONNALITES DU PANIER
import {storageCart} from './storageCart.js';
storageCart();

// 5) FONCTIONS GERANT LES ERREURS DE REQUETES SERVEUR

//FONCTION MESSAGE D'ERREUR 400 page introuvable
function messageErreurPageIntrouvable(){
    alert("Une erreur s'est produite, votre page est introuvable");
}

//FONCTION MESSAGE D'ERREUR 500 SERVEUR 
function messageErreurServeur(){
    alert("Une erreur s'est produite au niveau du serveur");
}


// 6) REQUETE API GETCAM

// a) OBJET XML DANS UNE CONSTANTE

const apiCamsRequest = new XMLHttpRequest();

// b) APPEL ET METHODE GET SUR LA ROUTE API CAMS

apiCamsRequest.open('GET' , 'http://localhost:3000/api/cameras');
apiCamsRequest.send();

// c) OBSERVATION EVOLUTION ETAT DE LA REQUETE | GESTION D'ERREURS

apiCamsRequest.onreadystatechange = function(){

    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

        // d) CONVERSION JSON EN TABLEAU (JSON.parse()) ET MISE DANS CONSTANTE RESPONSE

        const response = JSON.parse(this.responseText);
        
        // e) BOUCLE RECUPERANT NOS 5 REPONSES ET AFFICHAGE DYNAMIQUE VIA APPEL FONCTIONS PERSONNALISEES

        for (let i = 0; i < response.length; i++) {
            
            // f) ORGANISATION DU CONTENU DE LA PAGE DANS LE MAIN EN ACCORD AVEC LE SASS MAIN | div(image et texte) | div image + div texte
            const catalogueCameras = document.getElementById('main')
            //CREATION DIV ENGLOBANT IMAGE ET TEXTE
            const imageTexte = document.createElement('div')
            imageTexte.className = 'imgtexte'
            //DIV IMAGE AVEC SA CLASSE
            const image = document.createElement('div')
            image.className = 'photo'
            imageTexte.appendChild(image)
            //DIV TEXTE AVEC SON ID
            const texte = document.createElement('div')
            texte.id = 'texte'
            imageTexte.appendChild(texte)
            catalogueCameras.appendChild(imageTexte)
            
            // g) AFFICHAGE DES INFOSPRODUITS DANS LA CONSOLE POUR BIEN REPERER LES KEYS DES TABLEAUX DE CHAQUE PRODUIT
            console.log(response[i]);
            
            // h) APPEL DES FONCTIONS PERSONNALISEES AVEC LEURS VALEURS AFFECTEES => function(param1=div , param2=cles)

            ajoutSectionImageCamera (image , response[i].imageUrl);

            ajoutSectionTexteCamera(texte , response[i].name , response[i].description , response[i].price , response[i]._id)

            boutonVoirProduit (texte , response[i]._id)
        }
    }

    // i) GESTION DES ERREURS ENTRE 400 ET 699
    else if(this.status >= 400 && this.status < 500) {
        messageErreurPageIntrouvable()
    }
    else if (this.status >= 500 && this.status <= 599){
        messageErreurServeur()
    }
}



