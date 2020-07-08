//PANIER HEADER
//compteur span panier indiquant nbre de produits ajoutes
if (localStorage.getItem('compteur')) {
  document.getElementById("span").textContent = localStorage.getItem('compteur');
}

//Initialisation du compteur et du panier
if (!localStorage.getItem("panier")) {
  localStorage.setItem('panier', JSON.stringify([])); //panier vide
  localStorage.setItem('compteur',JSON.stringify(0)); //compteur 0
}

//REQUETE GET AJAX VERS L'API CAMERA AVEC OBJET JS XMLHttpRequest
var camRequest = new XMLHttpRequest();
camRequest.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    //DEFINITION VAR REPONSE ET MAIN
    var response = JSON.parse(this.responseText);
    var main = document.getElementById("main");
     
    //BOUCLE FOR SUR VAR ELEMENT QUI EST L'OBJET CAM PRODUIT PRIS DANS API
    for (let index = 0; index < response.length; index++) {
      const element = response[index];

      //CREATION DU CONTENU VIA JS PAR MANIPULATION DOM
      const divImg = document.createElement("div");
      //div.id = "photo";
      divImg.classList.add("photo");
      
      console.log(element);

      //ajout des images
      const img = document.createElement("img");
      //inclusion de l'image dans attr src => img.src
      img.src = element.imageUrl;
      divImg.append(img);

      //creation 2eme div texte
      const divTexte = document.createElement("div");
      divTexte.id = "texte"

      //ajout des noms de cams
      const camName = document.createElement("h1")
      camName.append(element.name)
      divTexte.append(camName)
      
      //ajout descriptions
      const description = document.createElement("p")
      description.innerHTML = ("DESCRIPTION: ")
      description.style.fontSize = '1.2em'
      description.append(element.description)
      divTexte.append(description)

      //ajout tarifs
      const tarif = document.createElement("p")
      tarif.textContent = "TARIF:" + " " + element.price / 100 + "€"
      tarif.style.fontSize = '1.2em'
      divTexte.append(tarif)

      //ajout bouton et classe btn
      const button = document.createElement("button")
      button.classList.add("btn")
      //ajout texte h2 dans bouton
      const h2btn = document.createElement("h2")
      //ajout du lien pour aller sur l'autre page et donner le produit
      const lien = document.createElement("a")
      //ENCODAGE URL AVEC ID DU PRODUIT SELECTIONN2 POUR MENER VERS PAGE PRODUIT
      lien.href = "./produits.html?id="+ element._id
      lien.innerHTML = "voir ce produit"
      button.append(h2btn)
      h2btn.append(lien)
      divTexte.append(button)

      //creation div imgText qui englobe 2 div
      const divImgTexte = document.createElement("div")
      divImgTexte.classList.add("imgtexte")

      //ajout de tous nos elements crees dans la divImgTexte puis dans main
      divImgTexte.append(divImg);
      divImgTexte.append(divTexte);
      main.append(divImgTexte);
    
    }

  }
}
camRequest.open("GET", "http://localhost:3000/api/cameras");
camRequest.send();



