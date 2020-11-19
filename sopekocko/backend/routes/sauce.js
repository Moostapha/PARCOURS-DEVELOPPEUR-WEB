const express = require('express');
const router = express.Router();      //Building of a Router with express

// CONTROLLERS AND MIDDLEWARES IMPORT
const sauceCtrl = require('../controllers/sauce');   // Import of our controllers controller
const auth = require('../middleware/auth');  // Import of our middleware auth in order to secure all our routes
const multer = require('../middleware/multer-config'); // Import of multer-config midlleware that handle input files from the front

//CRUD routes 
router.post('/' , auth , multer, sauceCtrl.createSauce); // Route for sauce creation : multer allows user's to download images with well encoded URL
router.post('/:id/like' , auth , sauceCtrl.reactToSauce); // Route for liking or disliking sauces by users
router.get('/:id' , auth , sauceCtrl.getOneSauce); // Route that shows one sauce clicked
router.put('/:id' , auth , multer , sauceCtrl.modifySauce); // Route for changing sauce's infos and image with multer
router.delete('/:id' , auth , sauceCtrl.deleteSauce); // Route deleting a sauce
router.get('/' , auth , sauceCtrl.getAllSauces); // Route main where all sauces are displayed


module.exports = router;  //Exporting routes to app.js