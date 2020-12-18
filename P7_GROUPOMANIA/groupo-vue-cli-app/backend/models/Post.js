const mySqlConnect = require('./db-connect-mysql');  // import

exports.getAll = () => {
    mySqlConnect.query('SELECT * FROM post', function (error, results, fields) {
        if (error) throw error;
        console.log(fields);
        console.log(results)
        return fields
    });
}

// Mettre les autres fonctions qui correspondent au CRUD