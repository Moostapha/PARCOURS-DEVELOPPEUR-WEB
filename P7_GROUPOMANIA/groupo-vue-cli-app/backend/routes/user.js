const express = require('express'); // import d'express
const router = express.Router(); // création d'un router avec la méthode Router() fournie par express
const userCtler = require('../controllers/user'); // Import du controller user.js (logique métier)
// Protection contre attaque brute force => Blocage après 2 tentatives erronées
const bouncer = require('express-bouncer')(500, 60000, 2) // a mettre sur route /login => sécurité
// import du middleware d'authentification
const auth = require('../middlewares/authentification');


// Routes du user CRUD + création | connexion le C de CRUD correspondra dans ce projet à la création du user dans la database SQL
router.post('/signup', userCtler.signup); // route création compte user
router.post('/login', bouncer.block ,userCtler.login); // route pour se connecter
router.delete('/:id', userCtler.deleteMyAccount); // route pour effacer un user
router.put('/:id', userCtler.updateMyAccount); // route pour modifier un user (commentaire ou fichiers...)
router.get('/', userCtler.getMyAccount);

module.exports = router;