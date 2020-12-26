const express = require('express'); // import d'express
const router = express.Router(); // création d'un router avec la méthode Router() fournie par express
const userCtler = require('../controllers/user'); // Import du controller user.js (logique métier)

// import du middleware d'authentification
const auth = require('../middlewares/authentification');

// Routes du user CRUD + création|connexion le C de CRUD coorespondra dans ce projet à la création du user dans la database SQL
//router.get('/', auth, userCtler.); // route pour afficher  accueil où seront tous les posts
//router.get('/:id', auth, userCtler); // Route pour afficher un post identifié par id
router.post('/signup', auth, userCtler.signup); // route création compte user
router.post('/login', auth, userCtler.login); // route pour se connecter
router.delete('/:id', auth, userCtler.deleteMyAccount); // route pour effacer un user
router.put('/:id', auth, userCtler.updateMyAccount); // route pour modifier un user (commentaire ou fichiers...)
router.get('/:id', auth, userCtler.getMyAccount);

module.exports = router;