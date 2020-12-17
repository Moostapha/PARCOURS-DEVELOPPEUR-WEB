const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // plugin allowing just one unique email by user
const userInput = require('../middleware/mailPasswordValidation') // Middleware de validation de champs mail et password

const userSchema = mongoose.Schema(
    {
    email: { type: String , required: true , unique: true , validate: userInput.mailValidator },
    password: { type: String , required: true , validate: userInput.passwordValidator},
    }
);


userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User' , userSchema);