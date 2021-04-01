// import d'express
const express = require('express');

// création d'un router avec la méthode Router() fournie par express
const Router = express.Router();

// Import du controller post.js (logique métier)
const postCtler = require('../controllers/post');

// Middleware d'authentification 
const auth = require('../middlewares/authentification');

// Middleware rules de validation des user's inputs
const rules = require('../middlewares/validator');

// Middleware gérant fichiers venant du front
const multer = require('../middlewares/multer');



// ROUTES POST ENDPOINTS CRUD | PGGPD

Router.post('/createPost/:postId', auth, rules.userPostInput(), rules.validate, multer, postCtler.createPost); // => Router.post('/', auth, multer, postCttler.createPost)


Router.get('/', auth, postCtler.getAllPosts); 


Router.get('/:postId', auth, postCtler.getOnePost);


Router.put('/:postId', auth, rules.userPostInput(), rules.validate, postCtler.updatePost);


Router.delete('/:postId', auth, postCtler.deletePost);



// EXPORT DU ROUTER VERS app.js
// export pour réutilisation dans app.js
module.exports = Router; 
