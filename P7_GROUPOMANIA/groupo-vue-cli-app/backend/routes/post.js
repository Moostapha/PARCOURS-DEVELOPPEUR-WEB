const express = require('express');
const Router = express.Router();
const postCtler = require('../controllers/post');
// Middleware d'authentification 
const auth = require('../middlewares/authentification');
// Middleware gérant fichiers venant du front
const multer = require('../middlewares/multer');

// routes pour les posts CRUD | PGGPD
Router.post('/createPost/:postId', auth, multer, postCtler.createPost); // => Router.post('/', auth, multer, postCttler.createPost)
Router.get('/', auth, postCtler.getAllPosts); 
Router.get('/:postId', auth, postCtler.getOnePost);
Router.put('/:postId', auth, postCtler.updatePost);
Router.delete('/:postId', auth, postCtler.deletePost);

// EXPORT DU ROUTER VERS app.js
// export pour réutilisation dans app.js
module.exports = Router; 
