const dbmySql = require('../mysqlConnection');   // import configuration de connection avec BD sql

// Nous écrivons les fonctions query du model Comment:
// User doit pouvoir créer | modifier | effacer son commentaire


exports.create = () => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO comments VALUES (userId=?, postId=?, commentaire=?, date_creation=?,)'
        dbmySql.query( sql, function(error, result, field) {
            if (error) reject (error);
            resolve (result);
            console.log(field);
        })
    })
};



exports.update = (id_primary) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO comments values( userId=?, postId=?, commentaire=?, date_creation=? ) WHERE id=?'
        dbmySql.query( sql , [id_primary] ,function(error, result, field) {
            if ( error ) reject( error );
            resolve(result);
            console.log(field)
        })
    })
};


exports.delete = (id_primary) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM comments WHERE id=?'
        dbmySql.query( sql, [id_primary] ,function(error, result, field){
            if (error) reject(error);
            resolve(result);
            console.log(field)
        })
    })
};
