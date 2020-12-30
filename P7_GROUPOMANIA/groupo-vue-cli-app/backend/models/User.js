const dbmySql = require('../mysqlConnection'); // Import des paramètres de connexion à notre bd groupomania


/*FONCTIONS ET REQUETES SQL LIEES A LA TABLE users | OPERATIONS CRUD SUR TABLE user
Sur la table users, on doit pouvoir manipuler les données de la maniere suivante:
create | update | delete => on doit avoir ici les requêtes sql permettant d'effectuer 
ces opérations sur cette table
*/

// FONCTIONS C
// cryptage password
exports.signUp = () => {

};


// Fonction de connexion sécurisée avec remise de tokens
exports.login = () => {

};


// fonction affichant un user qui est mon compte
exports.getOneUser = (id) => {
    return new Promise((resolve, reject) =>{
        const sql = 'SELECT FROM users WHERE id=?';
        dbmySql.query( sql , [id], function(error, result, field){
            if(error) reject (error);
            resolve(result);
            console.log(field);
        })
    })
};

// Fonction modifiant une ligne de la table users
exports.updateUser = (id) => {
    return new Promise((resolve, reject) =>{
        const sql ='UPDATE FROM users WHERE id=?, SET email=?, SET password=?, SET date_creation=?';
        dbmySql.query( sql, [id], function(error, result, field){
            if(error) reject(error);
            resolve(result);
            console.log(field);
        })
    })
};


// Fonction requete sql effacant la ligne liée à l'id de la table user
exports.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        const sql ='DELETE FROM users WHERE id=?';
        dbmySql.query( sql, [id], function(error, result, field){
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

