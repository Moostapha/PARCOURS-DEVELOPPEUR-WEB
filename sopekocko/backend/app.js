const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// IMPORT DES ROUTES
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// CONNEXION A MONGODB
mongoose.connect('mongodb+srv://dbsopekocko:sopekocko@meanfullstack.rigxp.mongodb.net/<dbname>?retryWrites=true&w=majority',
{ useNewUrlParser: true,
useUnifiedTopology: true})
.then(() => console.log('Connection à mongoDB réussie ! '))
.catch(() => console.log('Connection à mongoDB échouée ! '));

const app = express();

// GESTIONS DES ERREURS CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(bodyParser.json()); // Request body parser

// USAGE DES ROUTES walabok
app.use('/api/sauces' , sauceRoutes);
app.use('/api/auth' , userRoutes);


module.exports = app;

