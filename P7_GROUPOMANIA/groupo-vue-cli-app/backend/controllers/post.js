//const mysqlConnection = require('../mysqlConnection');
//const mysql = require('mysql');
const postModel = require('../models/Post'); // Import des fonctions Models possédant nos requetes SQL


/* LOGIQUES METIERS DES POSTS CRUD
Notre app doit permettre aux users d'accéder:
1) à tous les posts
2) à un post en particulier (id)
3) Opérations CUD (R read étant les 2 du haut).
*/


// Fonction affichant tous les posts (page d'accueil)
exports.getAllPosts = async(req, res, next) => {
    const posts = await postModel.getAllInTable();  // model.nomFonctionModelPost
    res.status(200).json({ post : posts }); // on gere et on capte la reponse avec un statut 200
    //console.log(posts);
};


// Fonction affichant un seul post 
exports.getOnePost = async(req, res, next) => {
    const id = req.params.id; // clé primaire de la ligne de table posts
    const post = await postModel.getOneInTable(id);
    res.status(200).json({ post : post });
};


// Fonction créant un post
exports.createPost = async(req, res, next) => {
    const create = req.body; // on capture le corps de la requete dans une cste
    // on la passe à la fonction Model  en précisant les champs dans l'ordre de la requete sql (dans Models)
    const createdPost = await postModel.createInTable(create.post, create.userId);
    res.status(201).json({post: createdPost});
};



// Fonction modifiant un post
exports.updatePost = async(req, res, next) => {
    const idPost = req.params.id; // clé primaire du post dans db
    const update = req.body; // on recupere le corps du nouveau post dans une constante
    // on les met en paramètre dans la fonction Model post
    const updatedPost = await postModel.updateInTable( update.post, update.userId, idPost );
    res.status(201).json({ post: updatedPost });
};


// Fonction supprimant un post
exports.deletePost = async(req, res, next) => {
    const id = req.params.id;
    const deletedPost = await postModel.deleteInTable(id);
    res.status(200).json({ post: deletedPost });
};


// Toutes nos fonctions exportées vers /routes/post