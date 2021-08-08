const postModel = require('../models/Post'); // Import des fonctions Models possédant nos requetes SQL
// const { post } = require('../routes/post');
//Validation inputs commentaire et post
const { check, validationResult } = require('express-validator');

/* LOGIQUES METIERS DES POSTS CRUD
Notre app doit permettre aux users d'accéder:
1) à tous les posts
2) à un post en particulier (id)
3) Opérations CUD (R read étant les 2 du haut).
*/

// Fonction affichant tous les posts (page d'accueil) admin
exports.getAllPosts = async(req, res, next) => {
    const posts = await postModel.getAll();  // model.nomFonctionModelPost
    res.status(200).json({ message:'Liste des posts', posts : posts }); // on gere et on capte la reponse avec un statut 200
    //console.log(posts);
};


// Fonction affichant un seul post 
exports.getOnePost = async(req, res, next) => {
    const id = req.params.id; // clé primaire de la ligne de table posts
    const post = await postModel.getOne(id);
    res.status(200).json({ message:'post sélectionné', post : post });
};


// Fonction créant un post
exports.createPost = async(req, res, next) => {
    
    // on capture le corps de la requete dans une cste
    const created = req.body;
    // On check la validité du contenu du post
    const content = req.body.contentPost;
    
    // on la passe à la fonction Model  en précisant les champs dans l'ordre de la requete sql (dans Models)
    console.log(" Infos new post:  ", created); 
    const createdPost = await postModel.create( 
        created.id_user_auteur_post, 
        created.username, 
        created.contentPost 
    );
    console.log("résultat de la promise", createdPost); 
    res.status(201).json({ 
        message:'post créé avec succés',  
        post: createdPost,
        postID: createdPost.postID // pour récupération via localStorage côté front
    });
};

// Fonction modifiant un post after
exports.updatePost = async(req, res, next) => {
    const postID = req.params.postID; // clé primaire du post dans db
    const update = req.body; // on recupere le corps du nouveau post dans une constante
    // on les met en paramètre dans la fonction Model post
    const updatedPost = await postModel.update( update.postContent, postID );
    res.status(201).json({ 
        message:'post modifié avec succés', 
        post: updatedPost 
    });
};


// Fonction modifiant un post before
// exports.updatePost = async(req, res, next) => {
//     const idPost = req.params.id; // clé primaire du post dans db
//     const update = req.body; // on recupere le corps du nouveau post dans une constante
    // on les met en paramètre dans la fonction Model post
//     const updatedPost = await postModel.update( update.post, update.userId, idPost );
//     res.status(201).json({ 
//         message:'post modifié avec succés', 
//         post: updatedPost 
//     });
// };


// Fonction supprimant un post
exports.deletePost = async(req, res, next) => {
    const id = req.params.id;
    const deletedPost = await postModel.delete(id);
    console.log("résultat de la promise", deletedPost); 
    res.status(200).json({ message:'post supprimé avec succés', post: deletedPost });
};
// Toutes nos fonctions exportées vers /routes/post
