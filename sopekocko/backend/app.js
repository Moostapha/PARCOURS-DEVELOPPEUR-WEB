const express = require('express'); // Import package express
const app = express(); // Express usage here in const app
const mongoose = require('mongoose'); // Import package mongoose facilitant les interactions avec la BDD
const bodyParser = require('body-parser'); // package gérant le format du corps des requêtes
const path = require('path'); // donne accés au chemin de notre systeme de fichier pour servir les images users
const morgan = require('morgan'); // Package donnant les login et statuts des requêtes dans le terminal
const helmet = require('helmet'); // plugin de sécurisation des headers (liés à la sécurité 11)

//require('dotenv').config() // va cacher nos passwords (données sensibles) de connection à la database sur mongoose.connect()

// IMPORT DES ROUTERS
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');


// CONNEXION A MONGODB DATABASE
mongoose.connect(
 'mongodb+srv://dbsopekocko:sopekocko@meanfullstack.rigxp.mongodb.net/<dbname>?retryWrites=true&w=majority',
 { useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
 }
)
.then(() => console.log('Connection à mongoDB réussie ! '))
.catch(() => console.log('Connection à mongoDB échouée ! '));


// MIDDLEWARES

//headers security
app.use(helmet());


// GESTIONS DES ERREURS CORS => AUTORSATIONS D'ACCES A L'API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Ajout des headers aux requêtes envoyées vers l'API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //envoie des requêtes avec les méthodes verbes
    next();
});



/* Request body parser:  
 extract the entire body portion of an incoming request stream and exposes it on req.body.
 Use of json function as a global middleware
*/
app.use(bodyParser.json()); 

// MORGAN will show all requests logs in terminal (for dev purposes)
app.use(morgan('dev'));

//Requêtes envoyées au serveur

// Requête pour la gestion des fichiers statiques
app.use('/images', express.static(path.join(__dirname, 'images'))); 

// Requêtes faites vers /api/sauces via les routers
app.use('/api/sauces' , sauceRoutes); 
app.use('/api/auth' , userRoutes);


module.exports = app;

