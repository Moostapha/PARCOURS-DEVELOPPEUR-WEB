const commentModel = require('../models/Comment');

/* LOGIQUE METIER DES COMMENTAIRES 
Les commentaires doivent pouvoir etre crees , modifier ou effacer par un utilisateur
Doit on pouvoir voir les commentaires des autres users?
*/

//Afficher commentaire
exports.readComment = async(req, res, next) => {
    const comments = await commentModel.read();
    res.status(200).json({comments: comments})
};

// Fonction créant un commentaire sur un post
//commun a user + admin
exports.createComment = async(req, res, next) => {
    const newComment = req.body;
    console.log(" Infos new commentaire:  ", newComment); 
    const createdComment = await commentModel.create( newComment.commentaire , newComment.postId , newComment.userId, newComment.username );
    console.log("résultat promise: ", createdComment)
    res.status(201).json({ comment: createdComment });
};


// Fonction modifiant un commentaire sur un post
exports.updateComment = async(req, res, next) => {
    const id = req.params.id;  // capture de l'id du commentaire modifié
    const modify = req.body;
    // Attention !!! Respecter ordre des paramètres de fonction
    const updatedComment = await commentModel.update(  modify.userId , modify.postId , modify.commentaire , id );
    res.status(200).json({comment: updatedComment});
};



// Fonction supprimant un commentaire
exports.deleteComment = async(req, res, next) => {
    const id = req.params.id;
    const deletedComment = await commentModel.delete(id);
    res.status(200).json({comment: deletedComment});

};


