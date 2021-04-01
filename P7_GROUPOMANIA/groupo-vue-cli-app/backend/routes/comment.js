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


Router.get('/', auth, commentCtler.readComment);


Router.post('/:postId/createCommentaire', auth, rules.userCommentInput, rules.validate, multer, commentCtler.createComment);


Router.put('/:idCommentaire', auth, rules.userCommentInput, rules.validate, commentCtler.updateComment);


Router.delete('/:idCommentaire', auth, commentCtler.deleteComment);


// Exportation
module.exports = Router
