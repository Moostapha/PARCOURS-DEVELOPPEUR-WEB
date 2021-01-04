const dbmySql = require('../mysqlconnection');  // import configuration de connection avec BD sql

// FICHIER MODEL POST AVEC TOUTES LES REQUETES SQL CRUD concernant le tableau 'posts' de notre DB mysql
// Requetes sql de l'API pour les 'posts'


// REQUETES CRUD SUR LA TABLE POSTS DE NOTRE DB MYSQL

// Fonction requête sql pour affichage de tous les posts
exports.getAllInTable = () => {
    return new Promise((resolve, reject) => { //gestion asynchrone
        const sql = 'SELECT * FROM posts';
        dbmySql.query( sql, function(error, results, fields) {
            if (error) reject(error);
            resolve(results);
            console.log(fields);
        });
    })
};


// Fonction requête sql pour affichage d'un seul post
// Requete query on selectionne toutes les colonnes correspondant à l'id_post en parametre
exports.getOneInTable = (id_post) => { // id_post === primaryId
    return new Promise((resolve, reject) => { //gestion asynchrone
        const sql = 'SELECT * FROM posts WHERE id= ?';
        dbmySql.query( sql , [id_post] , function(error, results, fields) {
            if (error) reject(error);
            console.log(fields);
            resolve(results);
        })
    })
};



// Fonction requête sql pour CREATION d'un post
exports.createInTable = (post, userId, date_creation) => {
    return new Promise((resolve, reject) => {
        // requete de création de ligne dans table posts
        const sql = 'INSERT INTO posts VALUES (post=?, userId=?, date_creation=?)';
        dbmySql.query( sql, [post, userId, date_creation], function (error, results, fields){
            if (error) reject (error);
            resolve(results);
            console.log(fields);
        })
    })
};


// Fonction requête sql pour MODIFIER un post
exports.updateInTable = (id_post, post, userId, date_creation) => {
    return new Promise((resolve,reject) => {
        //requete sql dans une const
        const sql = 'UPDATE posts SET post=?, userId=?, date_creation=? WHERE id=?';
        dbmySql.query( sql, [post, userId, date_creation, id_post], function (error, results, fields){
            if (error) reject (error);
            resolve(results);
            console.log(fields);
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
            console.log(fields)
        })
    })
};

