//const {getAll, getOne, createPost, updatePost, deletePost} = require('../models/Post'); // import pour affectation dynamique sur une seul fonction getAll
const dbMysqlCon = require('../mysqlConnection');
const mysql = require('mysql');
/*exports.getAllPosts = (req, res, next) => {
    const posts = getAll();
    res.status(200).json({posts: posts}) // renvoie les posts au niveau du front
    
};*/

/* LOGIQUES METIERS DES POSTS


*/

// Fonction affichant tous les posts (page d'accueil)
exports.getAllPosts = (req, res, next) => {
    mysql.query('SELECT * FROM  POSTS',  (error, result , field) => {
        if (error) throw error; // gestion erreur sur requete
        console.log(results); // affiche resultat requete sql
        console.log(fields); // affiche dans console les champs de la requete sql
        return fields; 
    })
    res.status(200).json({posts: posts}); // renvoie all post sous forme json (front)
    
};

// Fonction affichant un seul post 
exports.getOnePost = (req, res, next) => {

};

// Fonction créant un post
exports.createPost = (req, res, next) => {

};

// Fonction modifiant un post
exports.updatePost = (req, res, next) => {

};

// Fonction supprimant un post
exports.deletePost = (req, res, next) => {

};




/*LOGIQUE METIER DES COMMENTAIRES*/

// Fonction affichant tous les posts (page d'accueil)
exports.getAllCommentsPosts =(req, res, next) => {

};

// Fonction affichant un seul commentaire
exports.getOneCommentPost = (req, res, next) => {

};


// Fonction créant un commentaire sur un post
exports.createCommentPost = (req, res, next) => {

};

// Fonction modifiant un commentaire sur un post
exports.updateCommentPost = (req, res, next) => {

};

// Fonction supprimant un commentaire
exports.deleteCommentPost = (req, res, next) => {

};




/*LOGIQUES METIERS DES LIKE ET DISLIKE SUR LES POSTS*/

// Fonction like d'un post par user 
exports.getAllLikePosts = (req, res, next) => {

};


// Fonction dislike d'un post par user
exports.postLikePost = (req, res, next) => {

};

// Fonctions exportées vers /routes/post