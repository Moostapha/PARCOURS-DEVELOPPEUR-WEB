// import d'express
const express = require('express');

// création d'un router avec la méthode Router() fournie par express
const Router = express.Router();

// Import du controller comment.js (logique métier)
const commentCtler = require('../controllers/comment');

// import du middleware d'authentification
const auth = require('../middlewares/authentification');

// Middleware de validation des user's inputs
const rules= require('../middlewares/validator');

// Middleware gérant fichiers venant du front
const multer = require('../middlewares/multer');



// ROUTES COMMENT ENDPOINTS CRUD Pour 'commment', un user doit pouvoir créer | modifier (update) | supprimer son commentaire


Router.get('/readAll', auth, commentCtler.readComment);


// un commentaire se fait sur un post qui a une ID
Router.post('/create/:postID', auth, rules.validForm, rules.validate, multer, commentCtler.createComment);


Router.put('updateOne/:commentID', auth, rules.validForm, rules.validate, commentCtler.updateComment);


Router.delete('deleteOne/:commentID', auth, commentCtler.deleteComment);

// router.post("/:id/comment", auth, postCtrl.createComment);
// router.post("/:id/reaction", auth, postCtrl.reactPost);

// Exportation
module.exports = Router
