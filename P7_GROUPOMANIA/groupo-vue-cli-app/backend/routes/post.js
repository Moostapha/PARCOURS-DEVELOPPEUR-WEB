const express = require('express');
const Router = express.Router();
const postCtler = require('../controllers/post');

// Middleware d'authentification à retravailler pour ce P7
const auth = require('../middlewares/authentification');

// routes pour les posts CRUD | PGGPD
Router.post('/create', auth, postCtler.createPost);
Router.get('/', auth, postCtler.getAllPosts); // route modifiée
Router.get('/:id', auth, postCtler.getOnePost);
Router.put('/:id', auth, postCtler.updatePost);
Router.delete('/:id', auth, postCtler.deletePost);

// EXPORT DU ROUTER VERS app.js
// export pour réutilisation dans app.js
module.exports = Router; 