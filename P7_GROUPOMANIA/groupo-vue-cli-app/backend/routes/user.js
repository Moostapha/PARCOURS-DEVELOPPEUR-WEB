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

// Middleware de validation des user's inputs avec rules des inputs du formulaire
const rules = require('../middlewares/validator');

// Middleware gérant fichiers venant du front
const multer = require('../middlewares/multer');



// ROUTES ENDPOINTS CRUD USER 

// route création compte user
router.post('/signup', bouncer.block, rules.userSignupInput(), rules.validate, userCtler.signup); 


// route connexion user
// , bouncer.block avant all others
router.post('/login', bouncer.block, rules.userLoginInput(), rules.validate, userCtler.login); 


//  route pour voir all users  => component PostsComments.vue
router.get('/', auth, userCtler.getAllUsers); 


// route affichage profil user => component UserAccount.vue
router.get('/:userID', auth, userCtler.getUser); 


// route pour effacer un user => UserAccount.vue
router.delete('/deleteuser/:userID', auth, userCtler.deleteUser); 


// route pour update password et username profil user  => UserAccount.vue
router.put('/updateuser/:userID', auth,  multer, rules.userAccountInput(), rules.validate, userCtler.updateUser); 



// Methods	Urls	Actions
// GET	api/user	get all users
// GET	api/user/:id	get user by id
// POST	api/user	add new user
// PUT	api/user/:id	update user by id
// DELETE	api/user/:id	remove user by id
// DELETE	api/user	remove all user
// GET	api/user?title=[kw]	find all user which title contains 'kw'

module.exports = router;