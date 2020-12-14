const Sauce = require('../models/Sauce');  //We import sauceSchemas here in order to create new sauces
const fs = require('fs'); // file system will allow us to delete uploaded files


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
      .catch( error =>  {
        console.log(error)
        res.status(400).json({error})
        
    }); 
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



/* Logique de la route POST reactToSauce pour like|dislike et unlike|undislike les sauces par users
$inc => opérateur mongoDB qui incrémente un champ de la BD par valeur positive ou négative
$push => opérateur qui ajoute une valeur à un tableau
$pull => retire
*/

exports.reactToSauce = (req, res, next) => {  // Function that allows users to like / dislike / un-like / un-dislike sauces
  Sauce.findOne({_id: req.params.id})
  .then(sauce => { 
    switch (req.body.like) {  // switch de ce paramètre entre les case ci dessous 
        case 1 : // si user like une sauce
            if (!sauce.usersLiked.includes(req.body.userId)) {  // qu'il n'a pas encore liker
              Sauce.updateOne({_id: req.params.id}, {$inc: {likes: 1}, $push: {usersLiked: req.body.userId}, _id: req.params.id})
              .then(() => res.status(201).json({ message: 'Like ajouté avec succès !' }))
              .catch((error) => {res.status(400).json({error: error});});
            } // Ajout d'un like à cette sauce et on push son userId dans le tableau usersLiked
          break;
  
        case -1 :  // si user Dislike une sauce
            if (!sauce.usersDisliked.includes(req.body.userId)) {  // qu'il n'a pas encore disliker
              Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: 1}, $push: {usersDisliked: req.body.userId}, _id: req.params.id})
              .then(() => res.status(201).json({ message: 'Dislike ajouté avec succès !' }))
              .catch(error => res.status(400).json({ error }));
            }  // Ajout d'un dislike à cette sauce et on push son userId dans le tableau usersDisliked
          break;
  
        case 0: // 2 cas à prendre en compte, soit on enlève un like ou on enlève un dislike
            if (sauce.usersLiked.includes(req.body.userId)) { // si l'id du user est déjà présent dans usersLiked
              Sauce.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: req.body.userId}, _id: req.params.id})
              .then(() => res.status(201).json({ message: 'Like annulé avec succès !' })) // en cliquant sur like, on enlève un like à la sauce et on supprime le userId du tableau usersLiked
              .catch(error => res.status(400).json({ error }));
            } else if (sauce.usersDisliked.includes(req.body.userId)) { // si l'id du user est déjà présent dans usersDisliked
              Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: req.body.userId}, _id: req.params.id})
              .then(() => res.status(201).json({ message: 'Dislike annulé avec succès !' })) //  en cliquant sur dislike, on enlève un dislike à la sauce et on supprime le userId du tableau usersDisliked
              .catch(error => res.status(400).json({ error })); 
            }   
          break;
        
        default: // Si aucune des 4 options ci dessus => message d'erreur
          throw { error: "Impossible de modifier vos likes, merci de bien vouloir réessayer ultérieurement" };
    }
  })
  .catch(error => res.status(400).json({ error }));
};


/*exports.reactToSauce = (req, res, next) => {
  let updateLike;     // Mise à jour like
  if (req.body.like === 1) {  // user aime la sauce
    updateLike = {
      $inc: { likes: 1 }, $push: { usersLiked: req.body.userId }, _id: req.params.id // like +1 et ajout ID user
    }
    Sauce.updateOne({ _id: req.params.id }, updateLike)    // Mise à jour dans la base de données
    .then( () => res.status(200).json({ message: 'Sauce likée !!!'}))
    .catch( error => res.status(400).json({ error }));
  
  } else if (req.body.like === 0) { // User annule like ou dislike
    Sauce.findOne({ _id: req.params.id })
    .then( sauce => {
      console.log(sauce)
      if ( sauce.usersLiked.includes(req.body.userId) ){ // Si l'id du user est déjà dans usersLiked
        updateLike = {
          $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId }, _id: req.params.id
        }
        Sauce.updateOne({ _id: req.params.id}, updateLike)
        .then( () => res.status(200).json({ message: 'Like supprimée!!!'})) // on supprime un like et le userId du tableau
        .catch( error => res.status(400).json({ error }));
      }
      else if ( sauce.usersDisliked.includes(req.body.userId) ){  // Si l'id du user est déjà dans usersDisliked
        updateLike = {
          $inc: { dislikes: -1 }, $pull: { usersDisLiked: req.body.userId }, _id: req.params.id
        }
        Sauce.updateOne({ _id: req.params.id }, updateLike)
        .then( () => res.status(200).json({ message: 'dislike supprimée!!!'}))
        .catch( error => res.status(400).json({ error }));
      }
    })
    .catch( error => res.status(400).json({ error }));
  } else if (req.body.like === -1) {
    updateLike = {
      $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId }, _id: req.params.id
    }
    Sauce.updateOne({ _id: req.params.id}, updateLike)
    .then( () => res.status(200).json({ message: 'Sauce dislikée !!!'}))
    .catch( error => res.status(400).json({ error }));

  } else {
    res.status(500).json({error: 'Une erreur serveur est survenue !!!'});
  }
};*/

// We export these functions to ../routes/sauce.js