const express = require('express');
const router = express.Router();  //Building a Router with express
const bouncer = require ("express-bouncer")(500, 60000, 2) // Protection contre attaque brute-force DDOS => Blocage après 2 tentatives incorrectes
const userCtrl = require ('../controllers/user'); //Importing functions from usercontrollers

//Routes given by frontend for signup and login
router.post('/signup' , userCtrl.signup); 
router.post('/login' , bouncer.block, userCtrl.login); //Route protégées contre les attaques de force brute

module.exports = router; // Exporting routes to app.js