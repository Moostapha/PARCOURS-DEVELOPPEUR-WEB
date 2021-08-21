// import d'express
const express = require('express');

// création d'un router avec la méthode Router() fournie par express
const Router = express.Router();

// Import du controller post.js (logique métier)
const reactionCtler = require('../controllers/reaction');

// Middleware d'authentification 
const auth = require('../middlewares/authentification');

// Middleware gérant fichiers venant du front
const multer = require('../middlewares/multer');


Router.post('/:postID/like', auth, multer, reactionCtler.likePost);

Router.post('/:postID/dislike', auth, multer, reactionCtler.dislikePost);


module.exports = Router