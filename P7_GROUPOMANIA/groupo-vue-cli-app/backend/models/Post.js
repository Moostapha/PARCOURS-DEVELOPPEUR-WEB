const dbmySql = require('../mysqlconnection');  // import configuration de connection avec BD sql

/* FICHIER MODEL POST AVEC TOUTES LES REQUETES SQL CRUD concernant le tableau 'posts' de notre DB mysql
Requetes sql de l'API pour les 'posts'
Table post => postID | idUserAuteur | username | contentPost | date_creation */

// REQUETES CRUD SUR LA TABLE POSTS DE NOTRE DB MYSQL

// Fonction requête sql pour affichage de tous les posts
exports.getAll = () => {
    return new Promise((resolve, reject) => { 
        // Préparation requête SQL
        // const sql = 'SELECT * FROM posts' changement SQL avec jointure sur table users
        // faire des tests ici pour enlever le duplicated key id et userId the same
        const sql = 'SELECT * FROM posts ORDER BY posts.date_creation DESC';
        // Exécution requête
        dbmySql.query( sql, function(error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });
    })
};


// Fonction requête sql pour affichage d'un seul post
// Requete query on selectionne toutes les colonnes correspondant à l'id_post en parametre
exports.getOne = (id_primary) => { // idPost === primaryId
    return new Promise((resolve, reject) => { //gestion asynchrone
        // const sql = 'SELECT * FROM posts WHERE id= ?';
        const sql = 'SELECT * FROM posts JOIN users ON posts.userId = users.id WHERE id=?'
        dbmySql.query( sql , [id_primary] , function(error, results, fields) {
            if (error) reject(error);
            resolve(results);
        })
    })
};


// Fonction requête sql pour CREATION d'une ligne dans la table post
// userID est la clé primaire id de user
exports.create = ( userID, username, contentPost ) => { 
    return new Promise((resolve, reject) => {
        // colonnes de la table posts à remplir Mysql request
        const sql = 'INSERT INTO posts ( id_user_auteur_post, username, contentPost ) VALUES (?,?,?)';
        // data postée venant du front
        let dataInserted = [ userID, username, contentPost ]
        dbmySql.query(sql, dataInserted, function (error, results, fields){
            if (error) reject (error);
            resolve(results);
            console.log(results);
        })
    })
};


// Fonction requête sql pour MODIFIER un post after
exports.update = ( contentPost, postID ) => {
    return new Promise((resolve,result,reject) => {
        //requete sql dans une const
        //'UPDATE posts SET contentPost=? WHERE postID =?'   
        // UPDATE `posts` SET `contentPost` = 'test' WHERE `posts`.`postID` = 11
        const sql = 'UPDATE `posts` SET `contentPost`= ? WHERE `posts`.`postID` = ?' ;
        let dataUpdated = [contentPost, postID]
        dbmySql.query( sql, dataUpdated , function (error, results, fields){
            if(error) reject(error);
            resolve(results);
            console.log(results.affectedRows + " record(s) updated");
        })
    })
};


// Fonction requête sql pour SUPPRIMER un post
exports.delete = (userID,postID) => { 
    return new Promise((resolve,reject) => {
        // const sql = 'DELETE FROM posts WHERE id= ?';
        // DELETE FROM `posts` WHERE `posts`.`id` = 1;
        const sql = 'DELETE FROM posts WHERE userID=? AND postID=?';
        dbmySql.query( sql, [userID,postID], function (error, results, fields){
            if (error) reject (error);
            resolve(results);
        })
    })
};

