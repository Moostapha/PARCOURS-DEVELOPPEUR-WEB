var camRequest = new XMLHttpRequest();

camRequest.onreadystatechange = function()
{
 if (this.readyState == XMLHttpRequest.DONE && this.status == 200)
   {
     var response = JSON.parse(this.responseText);
     
     var main = document.getElementById("main");

     for (let index = 0; index < response.length; index++) 
       {
         const divImg = document.createElement("div");
         //div.id = "photo";
         divImg.classList.add("photo");
         const element = response[index];
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
         description.append(element.description)
         divTexte.append(description)
         //ajout tarifs
         const tarif = document.createElement("p")
         tarif.append(element.price)
         divTexte.append(tarif)
         //ajout bouton et classe btn
         const button = document.createElement("button")
         button.classList.add("btn")
         //ajout texte h2 dans bouton
         const h2btn = document.createElement("h2")
         h2btn.innerHTML= ("voir ce produit")
         button.append(h2btn)
         divTexte.append(button)
         //creation div imgText qui englobe 2 div
         const divImgTexte = document.createElement("div")
         divImgTexte.classList.add("imgtexte")
         //ajout de tous nos elements crees dans la divImgTexte puis dans main
         divImgTexte.append(divImg);
         divImgTexte.append(divTexte);
         main.append(divImgTexte)
        
        
        }

    }
}
camRequest.open("GET", "http://localhost:3000/api/cameras");
camRequest.send();



// document.getElementById("photo").style.display = 'flex'
/*Pour chaque clé de notre tableau:
1) creation d'un element lui correspondant dans une constante => document.createElement("x"),
2) Ajout de la valeur de clé (prix, nom etc...) avec append au niveau de notre const => const.append(tab.clé),
3) Ajout de tout ceci dans la div parent
*/ 