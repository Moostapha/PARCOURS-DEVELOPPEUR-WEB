const dbmySql = require('../mysqlconnection');  // import configuration de connection avec BD sql

// FICHIER MODEL POST AVEC TOUTES LES REQUETES SQL CRUD concernant le tableau 'posts' de notre DB mysql
// Requetes sql de l'API pour les 'posts'


// REQUETES CRUD SUR LA TABLE POSTS DE NOTRE DB MYSQL

// Fonction requête sql pour affichage de tous les posts
exports.getAll = () => {
    return new Promise((resolve, reject) => { //gestion asynchrone
        const sql = 'SELECT * FROM posts'
        dbmySql.query( sql, function(error, results, fields) {
            if (error) reject(error);
            resolve(results);
            console.log(fields);
        });
    })
    
};


// Fonction requête sql pour affichage d'un seul post
// Requete query on selectionne toutes les colonnes correspondant à l'id_post en parametre
exports.getOne = (id_post) => {
    return new Promise((resolve, reject) => { //gestion asynchrone
        const sql = 'SELECT * FROM posts WHERE id= ?'
        dbmySql.query( sql , [id_post] , function(error, results, fields) {
            if (error) reject(error);
            console.log(fields);
            resolve(results);
            
        })
    })
    
};


// Fonction requête sql pour CREATION d'un post
exports.createPost = () => {
    return new Promise((resolve, reject) => {
        // requete de création de ligne dans table posts
        const sql = 'INSERT INTO posts VALUES (post=?, userId=?, date_creation=?)'
        dbmySql.query( sql, function (error, results, fields){
            if (error) reject (error);
            resolve(results);
            console.log(fields);
        })
    // ALTER TABLE `posts` ADD `post` VARCHAR NOT NULL,
    })
    
};


// Fonction requête sql pour MODIFIER un post
exports.updatePost = (id_post) => {
    return new Promise((resolve,reject) => {
        //requete sql dans une const
        const sql = 'UPDATE posts set post=?, SET userId=?, set date_creation=? WHERE id= ?'
        dbmySql.query(sql, [id_post], function (error, results, fields){
            if (error) reject (error);
            resolve(results);
            console.log(fields);
        })
    
    })
    
};


// Fonction requête sql pour SUPPRIMER un post
exports.deletePost = (id_post) => { // ds ma db l'id du post est id et non id_post
    return new Promise((resolve,reject) => {
        dbmySql.query('DELETE FROM posts WHERE id= ?', [id_post], function (error, results, fields){
            if (error) reject (error);
            resolve(results);
            console.log(fields)
        })
    })
};

