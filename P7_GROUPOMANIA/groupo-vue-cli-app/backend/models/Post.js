const dbmySql = require('../mysqlconnection');  // import configuration de connection avec BD sql

/* FICHIER MODEL POST AVEC TOUTES LES REQUETES SQL CRUD concernant le tableau 'posts' de notre DB mysql
Requetes sql de l'API pour les 'posts'
Table post => id | post | userId | date_creation */

// REQUETES CRUD SUR LA TABLE POSTS DE NOTRE DB MYSQL

// Fonction requête sql pour affichage de tous les posts
exports.getAllInTable = () => {
    return new Promise((resolve, reject) => { 
        // Préparation requête SQL
        const sql = 'SELECT * FROM posts';
        // Exécution requête
        dbmySql.query( sql, function(error, results, fields) {
            if (error) reject(error);
            resolve(results);
            // console.log(fields);
        });
    })
};


// Fonction requête sql pour affichage d'un seul post
// Requete query on selectionne toutes les colonnes correspondant à l'id_post en parametre
exports.getOneInTable = (id_primary) => { // idPost === primaryId
    return new Promise((resolve, reject) => { //gestion asynchrone
        const sql = 'SELECT * FROM posts WHERE id= ?';
        dbmySql.query( sql , [id_primary] , function(error, results, fields) {
            if (error) reject(error);
            resolve(results);
            // console.log(fields);
        })
    })
};


// Fonction requête sql pour CREATION d'une ligne dans la table post
exports.createInTable = (post, userId) => { // userId est la clé primaire id de user
    return new Promise((resolve, reject) => {
        //ERREUR 44-17 | 40-12 |
        const dataInserted = [post, userId]
        const sql = 'INSERT INTO posts (post, userId)  VALUES (?, ?)';
        dbmySql.query(sql, dataInserted, function (error, results, fields){
            if (error) reject (error);
            resolve(results);
            console.log(results);
            // console.log(fields);
        })
    })
};


// Fonction requête sql pour MODIFIER un post
exports.updateInTable = ( post, userId, idPost ) => {
    return new Promise((resolve,reject) => {
        //requete sql dans une const
        const sql = 'UPDATE posts SET post=?, userId=? WHERE id=?';
        let dataUpdated = [post, userId, idPost]
        dbmySql.query( sql, dataUpdated , function (error, results, fields){
            if (error) reject (error);
            resolve(results);
            // console.log(fields);
        })
    
    })
    
};


// Fonction requête sql pour SUPPRIMER un post
exports.deleteInTable = (id_post) => { // ds ma db l'id du post est id et non id_post
    return new Promise((resolve,reject) => {
        const sql = 'DELETE FROM posts WHERE id= ?';
        dbmySql.query( sql, [id_post], function (error, results, fields){
            if (error) reject (error);
            resolve(results);
            // console.log(fields)
        })
    })
};


