const express = require('express');
const router = express.Router();      //Building of a Router with express
const auth = require('../middleware/auth');  //Import of our middleware auth in order to secure all our routes
const sauceCtrl = require('../controllers/sauce');   //Import of our middlewares here from controller

//CRUD routes with user's auhorization

router.post('/' , auth , sauceCtrl.createSauce);

router.get('/:id' , auth , sauceCtrl.getOneSauce);

router.get('/' , auth , sauceCtrl.getAllSauce);

router.put('/:id' , auth , sauceCtrl.modifySauce);

router.delete('/:id' , auth , sauceCtrl.deleteSauce);


module.exports = router;  //Exporting routes to app.js