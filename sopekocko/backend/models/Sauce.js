const mongoose = require('mongoose');
const formSauce = require('../middleware/formSauceValidation'); // Import middlewrare will check form validation inputs for creating a sauce


const sauceSchema = mongoose.Schema(
   {
   userId: {type: String , required: true},
   name: { type: String , required: true, validate: formSauce.nameValidator},
   manufacturer: { type: String , required: true, validate: formSauce.manufacturerValidator},
   description: { type: String , required: true, validate: formSauce.descriptionValidator},
   mainPepper: { type: String , required: true, validate: formSauce.mainPepperValidator},
   imageUrl: { type: String , required: true},
   heat: { type: Number , required: true , default: 0},
   likes: { type: Number , default: 0},
   dislikes: { type: Number , default: 0},
   usersLiked:  [{type: String, required: false, default: [] }],
   usersDisliked: [{type: String, required: false, default: [] }],
   }
);

module.exports = mongoose.model('Sauce' , sauceSchema);