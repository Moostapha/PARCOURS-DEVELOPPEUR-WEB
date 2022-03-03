// import d'express
const express = require('express'); 

// création d'un router avec la méthode Router() fournie par express
const router = express.Router(); 

// Import du controller user.js (logique métier)
const adminCtler = require('../controllers/administrateur'); 

// import du middleware d'authentification
const auth = require('../middlewares/authentification');

// Middleware gérant fichiers venant du front
const multer = require('../middlewares/multer');


// route pour voir all users infos + statistiques (nbre de posts, comments, likes, dislikes)
router.get('/infos', auth, adminCtler.getAllUsersInfos, adminCtler.getUsersLikesAndDislikes);


// route donnant tous les likes | dislikes par user
router.get('/reactions', auth, adminCtler.getUsersLikesAndDislikes); 


// route donnant dernier post d'un user
router.get('/lastPost', auth, adminCtler.lastUserPost); 


// route donnant dernier commentaire d'un user
router.get('/lastComment', auth, adminCtler.lastUserComment); 


// route pour effacer/ bannir un user
router.delete('/:userID/delete', auth, adminCtler.deleteUser); 


// Exportation vers app.js
module.exports = router;