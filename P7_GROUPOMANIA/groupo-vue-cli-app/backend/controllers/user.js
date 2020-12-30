const mysqlConnection = require('../mysqlConnection');
//const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // schema de donnees User de User/model


// Creation de la table users
/*exports.createuserstable = (req, res, next) => {
    //query de création dans un const
    let sql = 'CREATE DATABASE '
};*/


/* API LOGIQUES METIERS CRUD LIE AU USER qui doit pouvoir :
1) créer un compte => signup avec mail et password sécurisés dans la bdMysql 
2) se connecter =>  login de manière authentique et sécurisée (bcrypt, jsonwebtoken)
3) Pouvoir avoir accés à son compte ,une fois ces étapes effectuées, Doit pouvoir le modifier => readMyAccount et UpdateMyAccount
4) Le supprimer => deleteMyAccount
5) Editer un post
6) Poster un commentaire sur son post ou celui des autres.
7) Liker/disliker des commentaires => Fonctions likePost et dislikePost
*/


// Fonction signup création de compte user
exports.signup = (req, res, next) => {

};


// Fonction login connexion sécurisée et authentifiée du user
exports.login = (req, res, next) => {

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


// Chercher all users
/*exports.findAll = (req, res, next) => {
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


//query pour test de connection à la db groupamana-database créée via phpmyadmin
/*db.connect(function(err) { // on voit l'etat de connection et on gere l'erreur
    if (err) throw err; // si erreur de connection on jette une erreur
    console.log("connecté à la base de donnée groupomania"); // Si tout va bien message ds la console
    db.query("SELECT * FROM users" , function (err , result){
        if (err) throw err;
        console.log(result);
    })
});*/