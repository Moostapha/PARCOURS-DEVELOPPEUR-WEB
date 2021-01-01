// Import du package de cryptage pour password
const bcrypt = require('bcrypt');
// Import du package de remise de TOKEN pour authentification
const jwt = require('jsonwebtoken');
// schema de donnees User de User/model
const User = require('../models/User'); 


/* API LOGIQUES METIERS CRUD LIE AU USER qui doit pouvoir :
1) créer un compte => signup avec mail et password sécurisés dans la bdMysql 
2) se connecter =>  login de manière authentique et sécurisée (bcrypt, jsonwebtoken)
3) Pouvoir avoir accés à son compte ,une fois ces étapes effectuées, Doit pouvoir le modifier => readMyAccount et UpdateMyAccount
4) Le supprimer => deleteMyAccount
5) Editer un post
6) Poster un commentaire sur son post ou celui des autres.
7) Liker/disliker des commentaires => Fonctions likePost et dislikePost
*/


/* Fonction signup création de compte user et cryptant le password
Utilisation de la fonction de hachage de bcrypt sur le mot de passe afin de le crypter
afin de stocker les passwods des users cryptés sur la BD SQL*/
exports.signup = async(req, res, next) => {
    const motDePasse = req.body.password;
    bcrypt.hash(motDePasse , 20);
    const inscription = await User.signUp(motDePasse);
    res.status(200).json({ account: inscription });
};


/* Fonction login connexion sécurisée et authentifiée du user 
Les tokens d'authentification permettent aux utilisateurs de ne se connecter 
qu'une seule fois à leur compte. Au moment de se connecter, 
ils recevront leur token et le renverront automatiquement à chaque requête par la suite. 
Ceci permettra au back-end de vérifier que la requête est authentifiée.
Le Token est assigné à l'id clé primaire du user dans notre BD SQL. L'id clé primaire 
nous servira aussi à identifier de manière unique un user qui se connecte à l'app.
*/
exports.login = async(req, res, next) => {
    const inputLoginPassword = req.body.password; // password send avec requête
    const id = req.params.id; // id clé primaire table users qui est notre objet filtre (car unique)

    // cas ou on ne trouve pas l'id clé primaire dans la DB:
    if(!id) {
        return res.status(401).json({message:'Utilisateur non trouvé !!!'});
    };

    // comparaison ok des logins (stocké ds DB et entrée input) => comparaison input password avec hash gardé dans la BD
    if (bcrypt.compare(inputLoginPassword, id)){
        const token = jwt.sign(
            {userId: id},
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h'},
        );
        const connexion = await User.login(id, token);
        res.status(200).json({ account: connexion });
        res.status(200).json({ message: 'Connexion à votre compte réussie !!!' });
    } else {
        // cas ou comparaison entrée stockée invalide => input password ne match pas avec le hash de la BD
        return res.status(401).json({ message:'Mot de passe incorrect !!!'});
    }
};



//Fonction pour lire mon compte user
exports.getMyAccount = async(req, res, next) => {
    const id = req.params.id // id encodé dans l'URL
    const myAccount = await User.getOneUser(id); // on reprend la fonction getOneUser du model
    res.status(200).json({ account: myAccount});
};


// Fonction modif de mon compte user
exports.updateMyAccount = async(req, res, next) => {
    const id = req.params.id;
    const modify = req.body;
    const updated = await User.updateUser( id, modify.email, modify.password, modify.date_creation);
    res.status(200).json({ account: updated});
};


// Fonction suppression de mon compte user
exports.deleteMyAccount = async(req, res, next) => {
    const id = req.params.id;
    const deletedaccount = await User.deleteUser(id);
    res.staus().json({account : deletedaccount});
};



// PARTIE TESTS ET BROUILLONS 

/* Chercher all users
exports.findAll = (req, res, next) => {
    console.log(req.body);
    User.find('all', function(err, rows, fields) {
        if(!err) {
            res.send(rows);
        };
        console.log(fields);
        console.log('test');
    }) 
    dbmysql.query('SELECT * from users', function(err, rows) {
        console.log(rows);
    });
    const value = {'email': 'emtee@walabok.com'};
    User.save(value);

}*/  


/*query pour test de connection à la db groupamana-database créée via phpmyadmin
db.connect(function(err) { // on voit l'etat de connection et on gere l'erreur
    if (err) throw err; // si erreur de connection on jette une erreur
    console.log("connecté à la base de donnée groupomania"); // Si tout va bien message ds la console
    db.query("SELECT * FROM users" , function (err , result){
        if (err) throw err;
        console.log(result);
    })
});*/


/* Creation de la table users
exports.createuserstable = (req, res, next) => {
    //query de création dans un const
    let sql = 'CREATE DATABASE '
};*/
