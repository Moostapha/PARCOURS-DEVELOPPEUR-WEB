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

//=> avec middleware validator faire attention à multer !!!
//Router.post('/create', auth, multer, rules.validForm(), rules.validate, postCtler.createPost);
//Router.post('/create', auth, multer, postCtler.createPost);

Router.post('/create', auth, multer, postCtler.createPost); 

// Router.get('/read/:postID', auth, postCtler.getOnePost);

// Router.put('update/:postID', auth, rules.validFormPost(), rules.validate, postCtler.updatePost);
Router.put(':postID/update', auth, postCtler.updatePost);

Router.delete(':postID/delete', auth, postCtler.deletePost);

Router.post(':postID/reaction');


// router.get("/", auth, postCtrl.getAllPosts);
// router.get("/:id", auth, postCtrl.getOnePost);
// router.post("/", auth, multer, postCtrl.createPost);
// router.delete("/:id", auth, postCtrl.deletePost);
// router.post("/:id/comment", auth, postCtrl.createComment);
// router.post("/:id/reaction", auth, postCtrl.reactPost);

// EXPORT DU ROUTER VERS app.js
// export pour réutilisation dans app.js
module.exports = Router; 
