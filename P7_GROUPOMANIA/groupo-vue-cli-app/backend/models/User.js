// Import des paramètres de connexion à notre bd groupomania
const dbmySql = require('../mysqlConnection'); 


/*FONCTIONS ET REQUETES SQL LIEES A LA TABLE users | OPERATIONS CRUD SUR TABLE user
Sur la table users, on doit pouvoir manipuler les données de la maniere suivante:
create | update | delete => on doit avoir ici les requêtes sql permettant d'effectuer 
ces opérations sur cette table => user: id (autoincrement) | username | email | password | date_creation
*/

// exemple de requete sql donné apres ajout dans bd:
// ALTER TABLE `users` ADD `test` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL AFTER `date_creation`;

/* Fonction de création de compte user sur l'application avec email et mot de passe
*/
exports.signUp = (username, email, password) => {
    return new Promise((resolve, reject) => {
        // préparation requete SQL
        const sql = 'INSERT INTO users (username, email, password) values ( username=?, email=?, password=? )'; // modif car ajout de username
        // excécution requete SQL
        dbmySql.query( sql, [username, email, password], function(error, result, field) {
            if(error) reject(error);
            resolve(result);
            console.log(field);
        })
    })
};


/* Fonction de connexion sécurisée avec remise de tokens
Les tokens d'authentification permettent aux utilisateurs de ne se connecter 
qu'une seule fois à leur compte. Au moment de se connecter, 
ils recevront leur token et le renverront automatiquement à chaque requête par la suite. 
Ceci permettra au back-end de vérifier que la requête est authentifiée. */

exports.login = (email) => {
    return new Promise((resolve, reject) => {
        // requete SQL préparée qui renverra tous les champs de la ligne ou cet email apparait
        const sql = 'SELECT * FROM users WHERE email=?';
        // excécution de la requête SQL
        dbmySql.query( sql, [email], function(error, result, field){
            if(error) reject(error);
            
            console.log(error);
        })
    })
};


// Fonction affichant un user qui est mon compte
exports.getOneUser = (primaryId) => {
    return new Promise((resolve, reject) =>{
        const sql = 'SELECT FROM users WHERE id=?'; // erreur envoyé apres requete .rest 50:12
        dbmySql.query( sql , [primaryId], function(error, result, field){
            if(error) reject (error);
            resolve(result);
            console.log(field);
        })
    })
};


// Fonction modifiant une ligne de la table users
exports.updateUser = (username, email, password, date_creation, primaryId) => {
    return new Promise((resolve, reject) =>{
        // prepared request
        const sql ='UPDATE FROM users SET username=?, email=?, password=?, date_creation=? WHERE id=?';
        //executed request
        dbmySql.query( sql, [username, email, password, date_creation, primaryId], function(error, result, field){ // modif car ajout clé username dans table
            if(error) reject(error);
            resolve(result);
            console.log(field);
        })
    })
};


// Fonction requete sql effacant la ligne liée à l'id de la table user
exports.deleteUser = (primaryId) => {
    return new Promise((resolve, reject) => {
        const sql ='DELETE FROM users WHERE id=?';
        dbmySql.query( sql, [primaryId], function(error, result, field){
            if(error) reject(error);
            resolve(result);
            console.log(field);
        })
    })
};























/*require('dotenv').config(); // plugin pour charger variable d'environement depuis .env

// connection à la bd mysql
const MyAppModel = mySqlModel.createConnection({
    host     : process.env.HOST,
    user     : process.env.NAME, 
    password : process.env.PASS, 
    database : process.env.DATABASENAME //  nom db créée (via phpmyadmin on a créé notre nomdb et tableau users)
});

//  Nom du tableau auquel le model User se réfère, ici users
const User = MyAppModel.extend({
    tableName: 'users',
});

// New instance
const userModel = new MyAppModel({tableName: "user"});
// ou de cette manière: const userModel = new User();

module.exports = userModel; // export du schema de donnees vers le user/control

*/

