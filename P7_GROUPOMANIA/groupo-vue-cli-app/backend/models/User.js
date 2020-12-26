const connexion = require('../mysqlConnection');
const mysqlBackbone = require('mysql-backbone'); // module pour l'écriture de models dans mysql db

const Movie = mysqlBackbone.Model.extend({
	connection: connexion,
	tableName: "movies",
});

const Movies = mysqlBackbone.Collection.extend({
	model: Movie,
	connection: connexion,
	tableName: "movies",
});

const movies = new Movies();




















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

