const express = require('express');
const router = express.Router();  //Building a Router with express

const userCtrl = require ('../controllers/user'); //Importing functions from usercontrollers

router.post('/signup' , userCtrl.signup); //Routes for signup and login
router.post('/login' , userCtrl.login);

module.exports = router; //Exporting routes to app.js