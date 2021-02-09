const express = require('express');
const Router = express.Router();
const commentCtler = require('../controllers/comment');
const auth = require('../middlewares/authentification');
const multer = require('../middlewares/multer');

// routes pour les comments ou commentPost  
// Pour 'commment', un user doit pouvoir créer | modifier (update) | supprimer son commentaire
Router.get('/', auth, commentCtler.readComment)
Router.post('/:postId/createCommentaire', auth, multer, commentCtler.createComment);
Router.put('/:idCommentaire', auth, commentCtler.updateComment);
Router.delete('/:idCommentaire', auth, commentCtler.deleteComment);

module.exports = Router
