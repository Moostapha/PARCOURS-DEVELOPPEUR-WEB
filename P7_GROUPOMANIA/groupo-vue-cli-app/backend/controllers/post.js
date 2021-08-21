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
    // on capture le corps de la requete dans une cst
    // const avatar = `${req.protocol}://${req.get('host')}/posts/${req.file.filename}`
    const created = JSON.parse(JSON.stringify(req.body));
    // const created = req.body;
    console.log('corps requête POST by axios: ', created);
    
    // on la passe à la fonction Model  en précisant les champs dans l'ordre de la requete sql (dans Models)
    const createdPost = await postModel.create( 
        // inputs du front:
        created.userID,    
        created.username, 
        created.contentPost,
    );
    console.log("résultat de la promise", createdPost)
    res.status(201).json({ 
        message:'post créé avec succés',  
        post: createdPost,
        postID: createdPost.insertId // pour récupération via localStorage côté front
    });
};


// Fonction modifiant un post (after) => axios.put dans Post.vue
exports.updatePost = async(req, res, next) => {
    const postID = req.params.postID;  // clé primaire du post dans db
    // on recupere le corps du nouveau post dans une constante
    const newPost = req.body;
    console.log('postId post modifié: ', postID);
    console.log('type de postID: ', typeof postID);
    console.log('corps de la requête: ', newPost);
    console.log('type de la requête: ', typeof newPost);
    
    // on les met en paramètre dans la fonction Model update de Post.js
    const updatedPost = await postModel.update( 
        newPost.contentPost, 
        newPost.postID 
    );
    console.log("résultat de la promise: ", updatedPost)
    res.status(201).json({ 
        message:'post modifié avec succés', 
        post: updatedPost 
    });
};

// Fonction supprimant un post (after)
exports.deletePost = async(req, res, next) => {
    //Récup. clé primaire à supp
    const postID = req.params.postID;
    console.log('postId post supprimé: ', postID);
    
    //On la met en paramètre dans la fonction delete de Post.js
    const deletedPost = await postModel.delete(postID);
    console.log("résultat de la promise: ", deletedPost);
    
    // Renvoie de la réponse au front 
    res.status(200).json({ 
        message:'post supprimé avec succés', 
        post: deletedPost 
    });
};


// Fonction supprimant un post (before)
// exports.deletePost = async(req, res, next) => {
//     const postID = req.params.postID;
//     const userID = req.params.userID;
//     const deletedPost = await postModel.delete(userID,postID);
//     console.log("résultat de la promise", deletedPost); 
//     res.status(200).json({ message:'post supprimé avec succés', post: deletedPost });
// };


// Toutes nos fonctions exportées vers /routes/post
