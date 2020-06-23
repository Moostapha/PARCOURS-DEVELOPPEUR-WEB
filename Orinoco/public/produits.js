//PANIER HEADER
//compteur span panier indiquant nbre de produits ajoutes
if (localStorage.getItem('compteur')) {
  document.getElementById("span").textContent = localStorage.getItem('compteur');
}

//Initialisation du compteur et du panier
if (!localStorage.getItem("panier")) 
{
  localStorage.setItem('panier', JSON.stringify([]));
  localStorage.setItem('compteur',JSON.stringify(0));
}

//Encodage du parametre ID dans l'URL => querystring = partie apres ?
const queryString = window.location.search;          //Donne le recuperation de l'id de getcam.js/accueil.html
const urlParams = new URLSearchParams(queryString);  //creation d'un objet sur lequel on pourra use GET
console.log(urlParams.get("id")); //id du produit

const id = urlParams.get("id");

fetch("http://localhost:3000/api/cameras/"+ id)
.then(product => product.json())
.then(product => 
{
  console.log(product);
  //créer dynamiquement le HTML par JS ici

  //div englobant img et texte issu de product
  const container = document.createElement("div")
  container.classList.add("container")
  main.append(container)

  //div Img du Produit | Bouton de personnalisation | Choix des lentilles
  const divImgBtn = document.createElement("div")
  divImgBtn.classList.add("imgbtn")
  //img
  const imgProduit = document.createElement("img")
  imgProduit.src = product.imageUrl
  divImgBtn.append(imgProduit)

  //btn
  const btnPersonnalisation = document.createElement("button")
  btnPersonnalisation.classList.add("btn")
  //ajout texte dans bouton de personnalisation
  const textebtn = document.createElement("h2")
  textebtn.innerHTML = "Personnaliser"
  //texte ds btn
  btnPersonnalisation.append(textebtn)
  //btn ds divImgBtn
  divImgBtn.append(btnPersonnalisation)
  //divImgBtn ds div parent
  container.append(divImgBtn)

  //div Nom du produit | textes description | Tarif |Bouton Ajout au panier
  const divnomInfosBtn = document.createElement("div")
   divnomInfosBtn.classList.add("textebtn")
  //Nom du produit dans h1 et ajout ds le main
  const productName = document.createElement("h1")
   productName.append(product.name)
   divnomInfosBtn.append(productName)
   main.append(divnomInfosBtn)
  //description + tarif dans paragraphes p
  //ajout descriptions
  const description = document.createElement("p")
    description.innerHTML = ("DESCRIPTION: ")
    description.style.fontSize = '1.2em'
    description.append(product.description)
    divnomInfosBtn.append(description)
    container.append(divnomInfosBtn)
  //ajout tarifs
  const tarif = document.createElement("p")
    tarif.textContent = "TARIF:" + " " + product.price + "€"
    tarif.style.fontSize = '1.2em'
    divnomInfosBtn.append(tarif)
  //ajout bouton "ajouter au panier"
  const btnAjouter = document.createElement("button")
  btnAjouter.classList.add("btn1")
  const textebtnajouter = document.createElement("h2")
  textebtnajouter.innerHTML= "Ajouter au panier"
  btnAjouter.append(textebtnajouter)
  divnomInfosBtn.append(btnAjouter)

  //EVENEMENT SUR BTN AJOUTER ET COMPTEUR DU NBRE DE PRODUITS AJOUTES + LOGIQUE COMPTEUR
  btnAjouter.addEventListener('click', () => 
  { //recuperation du contenu de localStorage exploitable (conversion) objet tableau
    const panier = JSON.parse(localStorage.getItem("panier"))
    console.log(product)

    //Boucle sur le panier pour ne pas repeter twice un produit ajouté
    let produitAjoute = false // on initialise qu'il n'y a rien
    panier.forEach(element =>
    { //CONDITION CAS OU PRODUIT PRESENT DANS LE PANIER
      if (element.name === product.name) 
      {
        produitAjoute = true
        //console.log(typeof(element.quantite))
        element.quantite = element.quantite + 1
      }
    });
    
    if (produitAjoute) // si existence donc si existe = vraie
    {
      localStorage.setItem('panier', JSON.stringify(panier))
      //console.log("test")
    } 
    else 
    {
      product.quantite = 1
      panier.push(product)
      localStorage.setItem('panier', JSON.stringify(panier)) 
    }
    
    let compteur = parseInt(document.getElementById("span").textContent)
    compteur++
    localStorage.setItem('compteur',compteur)
    document.getElementById("span").textContent = localStorage.getItem('compteur')
    
  })
  
  //PERSONNALISATION DU PRODUIT
  //ajout des éléments personnalisables lentilles | Affichage dynamique via boucle for 
  //enrobage dans select (option)
  const dropdown = document.createElement("select")
  dropdown.id = ("dropdown");
  
  var array = product.lenses; //def de la variable contenant key de ce sur quoi on veut boucler
  for (let index = 0; index < array.length; index++) {
    const lenses = array[index];
    const lentilles = document.createElement("option")
    lentilles.append(product.lenses[index])
    dropdown.append(lentilles)
    divImgBtn.append(dropdown)
  }
  
  //Evenement sur le bouton personnaliser => Au click montrera les options possibles sinon display: none
  dropdown.style.display ="none"
  btnPersonnalisation.addEventListener('click', () =>{
   if (dropdown.style.display == "none") 
   {
     dropdown.style.display = "block";
   } 
   else 
   {
     dropdown.style.display ="none";
    }
  })
})

