const dbmySql = require('../mysqlconnection');  // import configuration de connection avec BD sql

// Creer des models de données ici avec des tableaux key:value
// Que l'on utilisera ensuite dans nos logiques métiers

// Fonctions de l'API

// Fonction getAll affichant tous les posts
exports.getAll = () => {
    dbmySql.query('SELECT * FROM post', function (error, results, fields) {
        if (error) throw error;
        console.log(fields);
        console.log(results);
        return fields;
    });
};

// Mettre les autres fonctions qui correspondent au CRUD
// Requete query on selectionne toutes les colonnes correspondant à l'id_post en parametre

exports.getOne = (id_post) => {
    dbmySql.query('SELECT * FROM post WHERE id= id_post' , function (error, results, fields) {
        if (error) throw error;
        console.log(fields);
        console.log(results)
        return fields
    })

};

exports.createPost = () => {
    dbmySql.query('', function (error, results, fields){

    })

};

exports.updatePost = () => {
    dbmySql.query('', function (error, results, fields){
        
    })

};

exports.deletePost = () => {
    dbmySql.query('', function (error, results, fields){
        
    })

};