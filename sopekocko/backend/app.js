const express = require('express'); // Import package express
// Express usage here in const app
const app = express(); 
// Import package mongoose facilitant les interactions avec la BDD
const mongoose = require('mongoose'); 
// Package gérant le format du corps des requêtes
const bodyParser = require('body-parser'); 
// Accés au chemin de notre systeme de fichier pour servir les images users
const path = require('path'); 
// Plugin de sécurisation des headers (liés à la sécurité 11 points de sécurités assurés sur le header http)
// OWASP clickjacking | XSS protection | MIME TYPE sniffing | DNS prefetching
const helmet = require('helmet'); 
// plugin contre faille xss
const xss = require('xss-clean'); 
// Données sensibles de connection à la BD dans fichier .env (variables d'environnement)
require('dotenv').config(); // plugin dotenv permettant de placer les donnees sensibles dans fichier .env


// IMPORT DES ROUTERS
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');



// CONNEXION A MONGODB DATABASE
mongoose.connect(
  process.env.DB_CONNEXION, // Toutes les infos de connexion à la database ont été masquées dans DB_CONNEXION (.env)
  { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
  }
)
.then(() => console.log('Connection à mongoDB réussie ! '))
.catch(() => console.log('Connection à mongoDB échouée ! '));



// GLOBAL MIDDLEWARES

//headers security
app.use(helmet());


// GESTIONS DES ERREURS CORS (Cross Origin Ressource Sharing) => AUTORSATIONS D'ACCES A L'API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Ajout des headers aux requêtes envoyées vers l'API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //envoie des requêtes avec les méthodes verbes
    next();
});

// Middleware Node.js de connection pour sécuriser les users inputs venant de POST, GET et des URL PARAMS
app.use(xss()); 

// Request body parser:  
// extract the entire body portion of an incoming request stream and exposes it on req.body.
// Use of json function as a global middleware
app.use(bodyParser.json()); 

// Requêtes envoyées au serveur

// 1) Requête pour la gestion des fichiers statiques upload fichiers images / users
app.use('/images', express.static(path.join(__dirname, 'images'))); 

// 2) Requêtes faites vers /api/sauces via les routers
app.use('/api/sauces' , sauceRoutes); 
app.use('/api/auth' , userRoutes);


module.exports = app;

