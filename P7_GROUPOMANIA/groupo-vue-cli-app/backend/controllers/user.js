// Import du package de cryptage pour password
const bcrypt = require('bcrypt');
// Import du package de remise de TOKEN pour authentification
const jwt = require('jsonwebtoken');
// schema de donnees User de User/model
const User = require('../models/User'); 


/* 
========================================================================================================================================================
API LOGIQUES METIERS CRUD LIE AU USER qui doit pouvoir :
1) créer un compte => signup avec mail et password sécurisés dans la bdMysql 
2) se connecter =>  login de manière authentique et sécurisée (bcrypt, jsonwebtoken)
3) Pouvoir avoir accés à son compte ,une fois ces étapes effectuées, Doit pouvoir le modifier => readMyAccount et UpdateMyAccount
4) Le supprimer => deleteMyAccount
5) Editer un post
6) Poster un commentaire sur son post ou celui des autres.
7) Liker/disliker des commentaires => Fonctions likePost et dislikePost
=======================================================================================================================================================
*/


// FONCTION SIGNUP CREATION COMPTE USER AVEC CRYPTAGE MOT DE PASSE

exports.signup = (req, res, next) => {
    // Validation des inputs formulaire signup
    
    // récupération infos envoyées par le front
    const newUser = req.body;
    console.log(" Infos new user:  ", newUser); 
    // Cryptage | hash du password
    bcrypt.hash(newUser.password , 10) // cryptage de ce dernier
    .then (
        async(hash) => {
            const inscription = await User.signUp( newUser.username, newUser.email, hash ); // params fonction ici dans le meme ordre que params fonction du Model
            res.status(201).json({ 
                message:'Utilisateur créé avec succés' , 
                account: inscription 
            });
            // console.log(inscription);
        }
    )
    .catch( error => res.status(500).json({ message: error }) );
};


//Fonction de connexion sécurisée avec remise de tokens

exports.login = async(req, res, next) => {

    // Récupération password et email send avec requête depuis le front
    const password = req.body.password;
    console.log(" Password venant du front:  ", password); 
    const email = req.body.email; 
    console.log(" email venant du front:  ", email); 

    // Gestion erreur 1 => Cas ou une entrée manque => est ce nécessaire vu que cas traité via validator?
    if( password == null || email == null){
        return res.status(400).json({ error: "Il manque une entrée password ou email !!!" })
    };

    // email user dans la promise login/User.js => renverra les infos de la ligne ou email apparait dans la table users
    const result = await User.login(email); 

    // resultat de la promise affichée dans console toujours sur des var et des resultats attendus comme await
    console.log("résultat de la promise", result[0]); 

    // Gestion erreur 2 => cas où le résultat de la requête est vide
    if(result.length == 0) {
        return res.status(401).json({ error: "Utilisateur non trouvé !!!" })
    };

    // comparaison password entré avec password stocké dans db
    bcrypt.compare(password, result[0].password)  
    .then( valid => { 

        // Gestion erreur 3 => cas ou la comparaison est invalide
        if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !!!' }); 
        }

        // émission du token d'authentification du user
        const token = jwt.sign(
            {userID: result[0].userID},
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h'},
        );
        // Check du token 
        console.log(token);

        // réponse renvoyée au front
        // succés et assignation du TOKEN + récupération du userId
        res.status(200).json({ 
            message: 'Authentification user réussie', 
            USER_AUTH_TOKEN: token, 
            userID: result[0].userID, 
            username: result[0].username 
        }) 
    })
    .catch(error => res.status(500).json({ error }));
};



//Fonction pour lire mon compte user

// commun a user + admin
exports.getUser = async(req, res, next) => {
    
    console.log('param de la requete axios.get: ',req.params);
    const userById = req.params.userID;
    console.log('type de userID: ', typeof userById);
    console.log("userId de la request: ", userById);
    // on reprend la fonction getOneUser du model
    const result = await User.getOneUser(userById); 
    console.log("résultat de la promise", result[0]); 
    res.status(200).json(
        { 
            message:'user loggé et authentifié', 
            user: result[0]
        }
    );
};



// Fonction modif de mon compte user => Choix laissé au user de changer leur username + password

// commun a user + admin
exports.updateUser = async(req, res, next) => {
    const userId = req.body.id;
    const updated = req.body;
    // const userImage = JSON.parse(req.body.file);
    // const imageUrl =  `${req.protocol}://${req.get('host')}/image/${req.file.filename}`; 
    console.log(" Update venant du front:  ", updated); 
    // Cas ou le user veut modifier soit son username soit son password
    if ( updated.username || updated.password ) {
        bcrypt.hash(updated.password, 10)
        .then(async(hash)=>{
            const updatedAccount = await User.updateUser( updated.username, hash,  userId )
            res.status(201).json({ 
                message:'Modifications réussies',
                updatedPassword: updatedAccount,
                updatedUsername: updatedAccount
            })
            console.log(updatedAccount)
        })
        .catch( error => res.status(500).json({ message: error }));
    }
};



// Fonction suppression de mon compte user

// commun a user + admin
exports.deleteUser = async(req, res, next) => {
    const userById  = req.params.userId;
    console.log("Utilisateur supprimé:  ", userById); 
    const deletedAccount = await User.deleteUser(userById);
    res.status(200).json({ 
        message:'Utilisateur supprimé avec succés', userDeleted : deletedAccount
    });
};


// Fonction pour voir les autres users non administrateur
exports.getAllUsers = async(req, res, next) => {
    const allUsers = await User.getUsers();
    res.status(200).json({ message:'Liste des users statut 0', users: allUsers });
};
