const { body, check, validationResult} = require('express-validator');

// FORM VALIDATION DES SAISIES USERS
// user input rules sur tous les formulaires signup | login | champs post + comment


// MES REGEXS CARACTERES SPECIAUX
const specialCharsMail = "/^[^*|\":<>[\]{}`\\()';&$]+$";
const specialChars = "/^[^*|\":<>[\]{}`\\()';@&$]+$";



// FORMULAIRE LOGIN
const userLoginInput = () => { 
    
    return [
    
       // inputs rules au niveau des 2 champs email | mot de passe pour login
        
        // email: .not(specialCharsMail).withMessage("caractères spéciaux: *|\":<>[\]{}`\\()';&$ non acceptés.")
        // .isAlphanumeric().withMessage('Votre mail ne doit contenir que des caractères alphanumériques')
        // password: .not(specialChars).withMessage("caractères spéciaux: *|\":<>[\]{}`\\()';@&$ non acceptés.")

        body('email')
            .not().isEmpty().withMessage('Champs "Email" requis')
            .isEmail().normalizeEmail().withMessage('Format email non valide')
            .trim()
            .escape(),
            
        body('password')
            .not().isEmpty().withMessage('Champs "Mot de passe" requis')
            .isAlphanumeric().withMessage(' Caractères alphanumériques')
            .isLength({min:3, max:10}).withMessage(' minimum 3 caractères, maximum 10')
            .trim()
            .escape(),
            
    ]
};



// FORMULAIRE SIGNUP
const userSignupInput = () => { 
    
    return [
    
    // inputs rules au niveau des 3 champs username | email | mot de passe pour signup
        
        body('username')
            .not().isEmpty().withMessage('Champs "Username" requis')
            .isAlphanumeric().withMessage('Caractères alphanumériques')
            .isLength({min:3, max:10}).withMessage('Le username doit avoir minimum 3 caractères, maximum 10')
            .not(specialChars).withMessage("caractères spéciaux: *|\":<>[\]{}`\\()';@&$ non acceptés.")
            .trim()
            .escape(),
            
        
        body('email')
            .not().isEmpty().withMessage('Champs "Email" requis')
            .isEmail().normalizeEmail().withMessage('Format email non valide')
            .trim()
            .escape(),
            
        
        body('password')
            .not().isEmpty().withMessage('Champs "Mot de passe" requis')
            .isAlphanumeric().withMessage('Caractères alphanumériques')
            .isLength({min:3, max:10}).withMessage('Longueur minimum 3 caractères, maximum 10')
            .not(specialChars).withMessage("caractères spéciaux: *|\":<>[\]{}`\\()';@&$ non acceptés.")
            .trim()
            .escape(),
            
    ]
};


// FORMULAIRE USERACCOUNT
const userAccountInput = () => { 
    
    return [
    
    // inputs rules au niveau des 2 champs username | mot de passe pour useraccount
        body('username')
            .not().isEmpty().withMessage('Champs "Username" requis')
            .isAlphanumeric().withMessage('Caractères alphanumériques')
            .isLength({min:3, max:10}).withMessage('Longueur minimum 3 caractères, maximum 10')
            .not(specialChars).withMessage("caractères spéciaux: *|\":<>[\]{}`\\()';@&$ non acceptés.")
            .trim()
            .escape(),
            
        
        body('password')
            .not().isEmpty().withMessage('Champs "Mot de passe" requis')
            .isAlphanumeric().withMessage('Caractères alphanumériques')
            .isLength({min:3, max:10}).withMessage('Longueur minimum 3 caractères, maximum 10')
            .not(specialChars).withMessage("caractères spéciaux: *|\":<>[\]{}`\\()';@&$ non acceptés.")
            .trim()
            .escape(),
            
    ]
};


// FORMULAIRE POST
const userPostInput = () => {

    return [
    
    // input's rules du form post
        body('post')
            .not().isEmpty().withMessage('Champs requis')
            .isAlphanumeric().withMessage('Veuillez n\'écrire que des caractères alphanumériques')
            .trim()
            .escape(),
    ]
};


// FORMULAIRE COMMENTAIRE
const userCommentInput = () => {

    return [
        // input's rules du form comment 
        body('comment')
            .not().isEmpty().withMessage('Champs requis')
            .isAlphanumeric().withMessage('Veuillez n\'écrire que des caractères alphanumériques')
            .trim()
            .escape(),
    ]

};


// VALIDATION DES REGLES DES FORMULAIRES
const validate = (req,res,next) => {
    
    // Check des éléments de la requête (inputs)
    const errors = validationResult(req);
    console.log(req.body);

    // Si aucune erreur détectée, on passe au middleware next
    if(errors.isEmpty()) {
        return next()
    }
    const erreur = errors.array();
    console.log(erreur)
    // Sinon on extrait les erreurs dans ce tableau vide
    // const extractedErrors = []
    // errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    // console.log(extractedErrors);
    // on renvoie le tableau des erreurs sous forme json dans la réponse
    return res.status(422).json({ message:"Array des erreurs d'express-validator", errors: errors.array() })

    // S'il y a une erreur
    // if(!errors.isEmpty()) {

        // Stockage du tableau des erreurs possibles
    //     const alert = errors.array();

    //     // Rendu de ces erreurs dans les vues dans une alerte
    //     res.render('AccueilConnexion', 'Inscription', 'UserAccount' , 'PostsComments',{
    //         alert
    //     })
    // } else {
    //     next()
    // }
};


// Exportation pour utilisation sur les routes
module.exports = {
    userSignupInput,
    userLoginInput,
    userAccountInput,
    userPostInput,
    userCommentInput,
    validate,
};

