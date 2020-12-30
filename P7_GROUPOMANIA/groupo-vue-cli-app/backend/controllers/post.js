//const mysqlConnection = require('../mysqlConnection');
//const mysql = require('mysql');
const postModel = require('../models/Post'); // Import des fonctions Models possédant nos requetes SQL


/* LOGIQUES METIERS DES POSTS CRUD
Notre app doit permettre aux users d'accéder:
1) à tous les posts
2) à un post en particulier (id)
3) Opérations CUD (R read étant les 2 du haut).
*/

// Fonction créant un post
exports.createPost = async(req, res, next) => {
    const create = req.body; // on capture le corps de la requete dans une cste
    // on la passe à la fonction Model  en précisant les champs dans l'ordre de la requete sql (dans Models)
    const createdPost = await postModel.createPost(create.post, create.userId, create.date_creation);
    res.status(200).json({post: createdPost});
};



// Fonction affichant tous les posts (page d'accueil)
exports.getAllPosts = async(req, res, next) => {
    const posts = await postModel.getAll();  // model.nomFonctionModelPost
    res.status(200).json({ post : posts }); // on gere et on capte la reponse avec un statut 200
    //console.log(posts);
};


// Fonction affichant un seul post 
exports.getOnePost = async(req, res, next) => {
    const id = req.params.id;
    const post = await postModel.getOne(id);
    res.status(200).json({ post : post });
};


// Fonction modifiant un post
exports.updatePost = async(req, res, next) => {
    const id = req.params.id;
    const update = req.body; // on recupere le corps du nouveau post dans une constante
    // on les met en paramètre dans la fonction Model post
    const updatedPost = await postModel.updatePost(id, update.post, update.userId, update.date_creation );
    res.status(200).json({ post: updatedPost });
};


// Fonction supprimant un post
exports.deletePost = async(req, res, next) => {
    const id = req.params.id;
    const deletedPost = await postModel.deletePost(id);
    res.status(200).json({ post: deletedPost });
};


// Toutes nos fonctions exportées vers /routes/post