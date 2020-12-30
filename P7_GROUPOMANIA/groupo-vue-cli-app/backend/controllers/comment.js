const commentModel = require('../models/Comment');

/* LOGIQUE METIER DES COMMENTAIRES 
Les commentaires doivent pouvoir etre crees , modifier ou effacer par un utilisateur
Doit on pouvoir voir les commentaires des autres users?
*/


// Fonction créant un commentaire sur un post
exports.createComment = async(req, res, next) => {
    const newComment = req.body;
    const createdComment = await commentModel.create( newComment.userId, newComment.postId, newComment.commentaire , newComment.date_creation);
    res.status(200).json({ comment: createdComment });
};


// Fonction modifiant un commentaire sur un post
exports.updateComment = async(req, res, next) => {
     const id = req.params.id;  // capture de l'id du commentaire modifié
    const modify = req.body;
    const updatedComment = await commentModel.update( id, modify.userId , modify.postId , modify.commentaire , modify.date_creation );
    res.status(200).json({comment: updatedComment});
};



// Fonction supprimant un commentaire
exports.deleteComment = async(req, res, next) => {
    const id = req.params.id;
    const deletedComment = await commentModel.delete(id);
    res.status(200).json({comment: deletedComment});

};




// ELEMENTS NON NECESSAIRES AU CTLER 'comment' ?
// // Fonction affichant tous les posts (page d'accueil)
// exports.getAllCommentsPosts =(req, res, next) => {

// };


// // Fonction affichant un seul commentaire
// exports.getOneCommentPost = (req, res, next) => {

// };

