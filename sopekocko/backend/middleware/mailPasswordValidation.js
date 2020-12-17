const validation = require('mongoose-validator');

/*Fonction mailValidator pour validation champ email*/

exports.mailValidator = [
    validation({
        validator: 'isLength', 
        arguments: [3, 30],
        message: "Veuillez entrer entre {ARGS[0]} et {ARGS[1]} caractères",
    }),
    validation({
        validator: 'isLength',
        arguments: /^[a-z\d\-_\s]+$/i,
        message: 'Utilisation de chiffres et de lettres seulement'
    }),
    validation({
        validator: 'matches',
        arguments: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 
        message: 'Veuillez entrer votre mail au format utilisateur@adressemail.com'
    })

];

/*Fonction passwordValidator pour validation champ password*/

exports.passwordValidator = [
    validation ({
        validator: 'isLength', 
        arguments: [3, 100], // mettre la possibilité de plusieurs caractères car le password est crypté et son cryptage génére un long string
        message: "Veuillez entrer entre {ARGS[0]} et {ARGS[1]} caractères",
    }),
    validation ({
        validator: 'isLength', 
        arguments: /^[a-z\d\-_\s]+$/i,
        message: "Utilisation de chiffres et de lettres seulement",
    }),
];

