// Import des paramètres de connexion à notre bd groupomania
const dbmySql = require('../mysqlConnection'); 


// Fonction de création de compte user sur l'application avec email et mot de passe

exports.signUp = (username, email, password) => {
    return new Promise((resolve, reject) => {
        // préparation requete SQL modif car ajout de username
        // Attention dans VALUES, ne pas mettre champ=? mais juste des ? sinon le user est créé 
        // mais dans les champs de la db => 0 sera écrit à la place des infos attendues 
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ? )'; 
        let dataNewUser = [username, email, password]
        // excécution requete SQL
        dbmySql.query( sql, dataNewUser, function(error, result, field) {
            if(error) reject(error);
            resolve(result);
            console.log(result);
        })
    })
};



// Fonction de connexion à l'application

exports.login = (email) => {
    return new Promise((resolve, reject) => {
        // requete SQL préparée qui renverra tous les champs de la ligne ou cet email apparait:
        const sql = 'SELECT * FROM users WHERE email=?' //'SELECT userID, password FROM users WHERE email=?'; 
        // excécution de la requête SQL:
        dbmySql.query( sql, [email], function(error, result, field){
            if(error) reject(error);
            resolve(result);
            console.log(error);
            console.log(result);
        })
    })
};



// Fonction affichant un user par son id

exports.getOneUser = (userID) => {
    return new Promise((resolve, reject) =>{
        // Préparation requête:
        const sql = 'SELECT * FROM users WHERE userID=?'; 
        // exécution requête:
        dbmySql.query( sql, [userID], function(error, result, field){
            if(error) reject (error);
            resolve(result);
            console.log(result);
            // console.log(field);
        })
    })
};



// Fonction modifiant une ligne de la table users

exports.updateUser = (username,  password, primaryId) => {
    return new Promise((resolve, reject) =>{
        // prepared request
        const sql ='UPDATE FROM users SET username=?, password=? WHERE id=?'; // est ce que la requête correspond à update Username || password?
        let dataUpdated = [username, password, primaryId]
        //executed request
        dbmySql.query( sql, dataUpdated, function(error, result, field){ // modif car ajout clé username dans table
            if(error) reject(error);
            resolve(result);
            // console.log(field);
        })
    })
};



// Fonction requete sql effacant la ligne liée à l'id de la table user

exports.deleteUser = (userID) => {
    return new Promise((resolve, reject) => {
        const sql ='DELETE FROM users WHERE id=?';
        dbmySql.query( sql, [userID], function(error, result, field){
            if(error) reject(error);
            resolve(result);
            // console.log(field);
        })
    })
};



// Fonction requête pour afficher tous les users

exports.getUsers = () => {
    return new Promise((resolve,reject) => {
        const sql = 'SELECT * FROM users WHERE is_admin=0';
        dbmySql.query(sql, function(error, results, fields) {
            if (error) reject(error);
            resolve(results);
        })
    })

};