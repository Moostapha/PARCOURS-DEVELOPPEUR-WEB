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

Router.get('/readAll', auth, postCtler.getAllPosts); 


// Route création post (text) => avec middleware validator + content-type: multipart-form-data faire attention à multer !!!
Router.post('/create', auth, multer, rules.validFormPost(), rules.validate, postCtler.createPost); 


// Route Modification d'un post par son auteur => Nécessité de multer lorsque le content-type posté est du multipart form data
// Modif de cette route avec contentPost en dynamique pour afficher l'ancien post dans le textarea dédié de UpdatePost.vue
Router.put('/:postID/update/:contentPost', auth, multer, rules.validFormPost(), rules.validate, postCtler.updatePost);


// Route de création fichier multimédia pour un post
Router.post('/uploadImg', auth, multer, postCtler.uploadImagePost); 


// Route de modif fichier multimédia pour un post => Nécessité de multer lorsque le content-type posté est du multipart form data
Router.put('/:postID/updateImg', auth, multer, postCtler.updateImagePost);


// Route suppression post par auteur + admin
Router.delete('/:postID/delete', auth, postCtler.deletePost);


// TESTS
// Router.post('/:postID/like');
// Router.post('/:postID/dislike');
// router.post("/:id/comment", auth, postCtrl.createComment);
// router.post("/:id/reaction", auth, postCtrl.reactPost);
// Router.post(':postID/reaction', auth, postCtler.deletePost);
// TESTS
// Router.get('/read/:postID', auth, postCtler.getOnePost);
// router.get("/", auth, postCtrl.getAllPosts);
// router.get("/:id", auth, postCtrl.getOnePost);
// router.post("/", auth, multer, postCtrl.createPost);
// router.delete("/:id", auth, postCtrl.deletePost);
// router.post("/:id/comment", auth, postCtrl.createComment);
// router.post("/:id/reaction", auth, postCtrl.reactPost);
// EXPORT DU ROUTER VERS app.js
// export pour réutilisation dans app.js

module.exports = Router; 
