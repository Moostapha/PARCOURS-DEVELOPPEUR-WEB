const validation = require('mongoose-validator'); 

/*VALIDATION DES CHAMPS DE FORMULAIRE POUR LES SAUCES
regex pour éviter les symboles caractères alpha-numérique seulement
longueur chaîne de caractère du champ => 'isLenght'
Nous devons valider 4 champs:
name | manufacturer | description | mainPepper
On ira ensuite modifier le schéma Sauce avec ce middleware
*/


exports.nameValidator = [
    validation({
        validator: 'isLength',
        arguments: [3, 30], // On s'assure que le nombre de caractère/users est limité
        message: 'Veuillez entrer entre {ARGS[0]} et {ARGS[1]} caractères',
    }),
    validation({
        validator: 'isLength', // On s'assure que les caractères entrés par le user sont des chiffres ou des lettres
        arguments: /^[a-z\d\-_\s]+$/i, // règles Regex
        message: 'Utilisation de chiffres et de lettres seulement'
    }),
];



exports.manufacturerValidator = [
    validation({
        validator: 'isLength',
        arguments: [3, 30],
        message: 'Veuillez entrer entre {ARGS[0]} et {ARGS[1]} caractères',

    }),
    validation({
        validator: 'isLength',
        arguments: /^[a-z\d\-_\s]+$/i,
        message: 'Utilisation de chiffres et de lettres seulement'
        
    }),

];


exports.descriptionValidator = [
    validation({
        validator: 'isLength',
        arguments: [3, 100],
        message: 'Veuillez entrer entre {ARGS[0]} et {ARGS[1]} caractères',
    }),
    validation({
        validator: 'isLength',
        arguments: /^[a-z\d\-_\s]+$/i,
        message: 'Utilisation de chiffres et de lettres seulement'
        

    }),

];


exports.mainPepperValidator = [
    validation({
        validator: 'isLength',
        arguments: [3, 30],
        message: 'Veuillez entrer entre {ARGS[0]} et {ARGS[1]} caractères',
    }),
];




