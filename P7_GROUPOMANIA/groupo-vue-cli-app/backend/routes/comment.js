const express = require('express');
const Router = express.Router();
const commentCtler = require('../controllers/comment');
const auth = require('../middlewares/authentification');

// routes pour les comments ou commentPost  
// Pour 'commment', un user doit pouvoir créer | modifier (update) | supprimer son commentaire
Router.get('/', auth, commentCtler.readComment)
Router.post('/' , auth,  commentCtler.createComment);
Router.put('/:id', commentCtler.updateComment);
Router.delete('/:id', commentCtler.deleteComment);

module.exports = Router
