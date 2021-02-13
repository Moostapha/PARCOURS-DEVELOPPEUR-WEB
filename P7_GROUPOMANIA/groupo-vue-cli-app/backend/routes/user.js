// import d'express
const express = require('express'); 
// création d'un router avec la méthode Router() fournie par express
const router = express.Router(); 
// Import du controller user.js (logique métier)
const userCtler = require('../controllers/user'); 
// Protection contre attaque brute force => Blocage après 2 tentatives erronées
const bouncer = require('express-bouncer')(500, 60000, 2) // a mettre sur route /login => sécurité
// import du middleware d'authentification
const auth = require('../middlewares/authentification');
// Middleware gérant fichiers venant du front
const multer = require('../middlewares/multer');

// Routes du user CRUD 

// route création compte user
router.post('/signup', userCtler.signup); 
// route connexion user
router.post('/login', bouncer.block ,userCtler.login); 
// route affichage profil user => component UserAccount.vue
router.get('/:userId', auth, userCtler.getUser); // router.get('/:userId', auth, userCtler.getUser);
// ajout route pour voir all users (manquante) => component PostsComments.vue
router.get('/', auth, userCtler.getAllUsers); 
// route pour effacer un user => UserAccount.vue
router.delete('/deleteuser/:userId', auth, userCtler.deleteUser); 
// route pour update profil user  => UserAccount.vue
router.put('/updateuser/:userId', auth, multer, userCtler.updateUser); 

// Methods	Urls	Actions
// GET	api/tutorials	get all Tutorials
// GET	api/tutorials/:id	get Tutorial by id
// POST	api/tutorials	add new Tutorial
// PUT	api/tutorials/:id	update Tutorial by id
// DELETE	api/tutorials/:id	remove Tutorial by id
// DELETE	api/tutorials	remove all Tutorials
// GET	api/tutorials?title=[kw]	find all Tutorials which title contains 'kw'

module.exports = router;