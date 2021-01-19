const express = require('express');
const Router = express.Router();
const postCtler = require('../controllers/post');

// Middleware d'authentification à retravailler pour ce P7
const auth = require('../middlewares/authentification');

// routes pour les posts CRUD | PGGPD
Router.post('/',postCtler.createPost);
Router.get('/', auth, postCtler.getAllPosts); // route modifiée
Router.get('/:id',postCtler.getOnePost);
Router.put('/:id', postCtler.updatePost);
Router.delete('/:id',postCtler.deletePost);

// EXPORT DU ROUTER VERS app.js
module.exports = Router; // export pour réutilisation dans app.js