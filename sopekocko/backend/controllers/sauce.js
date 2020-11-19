const Sauce = require('../models/Sauce');  //We import sauceSchemas here in order to create new sauces
const fs = require('fs'); // 


/* Logique route qui répond aux requêtes POST (CREATE)
Pour ajouter un fichier à la requête, le front-end doit envoyer les données de la requête sous la forme form-data,
et non sous forme de JSON. 
Le corps de la requête contient une chaîne sauce , qui est simplement un objet sauce converti en chaîne. 
Nous devons donc l'analyser à l'aide de JSON.parse() pour obtenir un objet utilisable.

Nous devons également résoudre l'URL complète de notre image, car req.file.filename ne contient que le segment filename. 
Nous utilisons req.protocol pour obtenir le premier segment (dans notre cas 'http' ). 
Nous ajoutons '://' , puis utilisons req.get('host') pour résoudre l'hôte du serveur (ici, 'localhost:3000' ). 
Nous ajoutons finalement '/images/' et le nom de fichier pour compléter notre URL.
*/

exports.createSauce = (req , res , next) => { 
    console.log(req.body);
    const sauceObject = JSON.parse(req.body.sauce); // allow to take all the input field's infos
    console.log(sauceObject);
    delete sauceObject._id; // removing frontend id cause mongoDB will provide one by default
    const sauce = new Sauce({ // Input values are put in a new object
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // Here we dynamically add user's image URL
    });
    sauce.save() // Method save() records new data in DataBase
      .then( () => res.status(201).json({message: 'Sauce enregistrée avec succés !' }))
      .catch( error => res.status(400).json({error})); 
};



/* Logique Route qui répond aux requêtes PUT (pour modifier un objet) 
// On crée un objet sauceObject qui regarde si req.file existe ou non. 
// S'il existe, on traite la nouvelle image ; 
// S'il n'existe pas, on traite simplement l'objet entrant. 
// On crée ensuite une instance sauce à partir de sauceObject , puis on effectue la modification.*/

exports.modifySauce = (req , res , next) => {
    const thingSauce = req.file ?  // We test object thingSauce to see if req.file exists or not
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // managing new image
    } : { ...req.body }; // Taking modified object (without removing image)
    Sauce.updateOne( {_id: req.params.id } , {...thingSauce, _id:req.params.id } )
     .then( () =>  res.status(200).json({message: 'Sauce modifiée avec succés !'}))
     .catch( error => res.status(400).json({ error }));
};


/* Route DELETE qui permet de supprimer un élément
// Dans cette fonction :
// Nous utilisons l'ID que nous recevons comme paramètre pour accéder à la sauce correspondant dans la base de données ;
// Nous utilisons le fait de savoir que notre URL d'image contient un segment /images/ pour séparer le nom de fichier ;
// Nous utilisons ensuite la fonction unlink du package fs pour supprimer ce fichier, 
// en lui passant le fichier à supprimer et le callback à exécuter une fois ce fichier supprimé ;
// Dans le callback, nous implémentons la logique d'origine, en supprimant le sauce de la base de données.*/

exports.deleteSauce = (req , res , next) => {
 Sauce.findOne({ _id: req.params.id})
    .then(sauce => {
        const filename =sauce.imageUrl.split('/images')[1];
        fs.unlink(`images/${filename}`, () => {
         Sauce.deleteOne({ _id: req.params.id })
            .then( () => res.status(200).json({ message: 'Sauce supprimée avec succés !' }))
            .catch( error => res.status(400).json({ error }));
        });
    })
    .catch( error => res.status(400).json({ error }));
};
    


/* Logique route GET affichant une sauce
 en face du segment dynamique de la route pour la rendre accessible en tant que paramètre
 méthode findOne() dans notre modèle sauce pour trouver la sauce unique ayant le même _id que le paramètre de la requête
 cette sauce est ensuite retourné dans une Promise et envoyé au front-end 
 si aucune sauce n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end, avec l'erreur générée.
*/

exports.getOneSauce = (req , res , next) => {
    Sauce.findOne({_id: req.params.id})
     .then( sauce => res.status(200).json(sauce))
     .catch( error => res.status(404).json({ error }));
};



/* Logique de la route GET affichant TOUTES les sauces
nous utilisons la méthode find() dans notre modèle Mongoose afin de renvoyer un tableau 
contenant tous les sauces dans notre base de données
*/

exports.getAllSauces = (req , res , next) => {
    Sauce.find()
     .then( sauces => res.status(200).json(sauces))
     .catch( error =>  res.status(400).json({ error }));
};



/* Logique de la route POST pour liker / disliker les sauces par users
*/

exports.reactToSauce = (req, res, next) => {
    let updateLike;

    if (req.body.like === 1) {
      updateLike = {
        $inc: { likes: 1 }, $push: { usersLiked: req.body.userId }
      }

        
    } else if (req.body.like === 0) {
      updateLike = {
        $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId }
      }

        
    } else if (req.body.like === -1) {
      updateLike = {
        $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId }
      }


    } else {
      updateLike = {
        $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId }
      }
    }
    Sauce.updateOne({ _id: req.params.id}, updateLike)
      .then( () => res.status(200).json({ message: 'Sauce likée !!!'}))
      .catch( error => res.status(400).json({ error }));
};



// We export these functions to ../routes/sauce.js