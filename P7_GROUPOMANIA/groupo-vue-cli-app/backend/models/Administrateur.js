// Import des paramètres de connexion à notre bd groupomania
const dbmySql = require('../mysqlConnection'); 

// Modèle sql donnant les infos persos des users et leurs posts respectifs 
exports.getUsersInfosAndStats = () => {
    
    return new Promise((resolve, reject) => {
        // SELECT `users`.`username`, `users`.`email`, `users`.`avatar`, `users`.`date_creation` AS date_creation_compte, `posts`.`contentPost`, `posts`.`imagePost`,`posts`.`date_creation` AS date_publication FROM `users` INNER JOIN `posts` ON `users`.`userID`=`posts`.`id_user_auteur_post`
        const sql = 'SELECT `users`.`userID`, `users`.`username`, `users`.`email`, `users`.`avatar`, `users`.`date_creation` AS date_creation_compte, COUNT(DISTINCT `posts`.`postID`) AS nbre_de_posts, COUNT(DISTINCT `comments`.`commentID`) AS nbre_de_commentaires, COUNT(DISTINCT `reactions`.`like`) AS nbre_de_like, COUNT(DISTINCT `reactions`.`dislike`) AS nbre_de_dislike FROM `users` LEFT JOIN `posts` ON `users`.`userID` = `posts`.`id_user_auteur_post` LEFT JOIN `comments` ON `users`.`userID` = `comments`.`id_user_auteur_comment`  LEFT JOIN `reactions` ON `users`.`userID` = `reactions`.`id_user_auteur_reaction` GROUP BY `users`.`userID`;';
        dbmySql.query(sql, function(error, results, fields) {
            if(error) reject (error);
            resolve(results);
            console.log(results)
        })
    })
};

// Modèle avec requeête SQL supprimant un userID
exports.deleteUser = (userID) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM `users` WHERE `users`.`userID` = ?';
        dbmySql.query( sql, [userID], function(error, result, field){
            if(error) reject(error);
            resolve(result);
            // console.log(field);
        })
    })
};

