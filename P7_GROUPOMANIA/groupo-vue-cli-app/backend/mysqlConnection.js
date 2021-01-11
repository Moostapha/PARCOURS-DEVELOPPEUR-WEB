 // import driver js mysql pour Node => nodemysql
const mysql = require('mysql');
// plugin pour charger variable d'environnement depuis .env
require('dotenv').config() ;



// Params de la connection avec infos de la database créée et masquage des données sensibles
const mysqlConnection = mysql.createConnection({ 
  host     : process.env.HOST, // changer le code ici avec l'adresse mysql cree en ligne
  user     : process.env.USER,     // MySQLonline username
  password : process.env.PASSWORD, // MySQLonline password
  database : process.env.DATABASENAME, //nom db créé en ligne 28 (si code l-28 absent commenter cette ligne)
  debug: true
});
//console.log(mysqlConnection);

// etablissement de la connection avec le serveur mysql | état de la connection et gestion erreur
mysqlConnection.connect( (err) => { // notation ES6 pour les fonctions
    if (err) {
      console.error('erreur de connection: ' + err.stack);
      return;
    }
    console.log('database'+ mysqlConnection.state);
    console.log('connecté à mysql avec l\'id ' + mysqlConnection.threadId);
    console.log('Connecté à la base de données MySQL !!!')
});

// creation de la database nodemysql_groupomania, une fois connecté on va créer une database pour ce projet


module.exports = mysqlConnection; 

/*MODULE DE CONNECTION AVEC SERVER MYSQL*/


