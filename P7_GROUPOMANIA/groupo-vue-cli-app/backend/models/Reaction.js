// Import des paramètres de connexion à notre bd groupomania
const dbmySql = require('../mysqlconnection');


// Fonction GET donnant tous les likes sur un post
exports.getLikes = () => {
    
    return new Promise((resolve, reject) => {
        //'SELECT SUM (`like`) FROM `reactions`' => additionne tous les likes de la table
        //'SELECT * FROM `reactions` WHERE `reactions`.`like` = 1'
        //SELECT SUM (`like`) FROM `reactions` WHERE `reactions`.`id_post_reacted`= 23; => addition all likes pour post 23
        // SUM OU COUNT CHECKER LES 2
        const sql = 'SELECT `posts`.`postID`, COUNT(DISTINCT `reactions`.`like`) AS reactionsLike FROM `posts` LEFT JOIN `reactions` ON `posts`.`postID` = `reactions`.`id_post_reacted` GROUP BY `posts`.`postID`';
        dbmySql.query(sql, function(error, results, fields){
            if (error) reject(error);
            resolve(results);
            console.log(results);
            // console.log(fields)
        })
    })
}


// Fonction GET donnant tous les dislikes sur un post
exports.getDislikes = () => {
    // SELECT * FROM `reactions` WHERE `reactions`.`dislike` = 1
    // SUM OU COUNT checker les 2
    //SELECT `posts`.`postID`, SUM(DISTINCT `reactions`.`dislike`) AS reactionsDislike FROM `posts` LEFT JOIN `reactions` ON `posts`.`postID` = `reactions`.`id_post_reacted` GROUP BY `posts`.`postID`
    return new Promise((resolve, reject) => {
        const sql = 'SELECT `posts`.`postID`, COUNT(DISTINCT `reactions`.`dislike`) AS reactionsDislike FROM `posts` LEFT JOIN `reactions` ON `posts`.`postID` = `reactions`.`id_post_reacted` GROUP BY `posts`.`postID`';
        dbmySql.query(sql, function(error, results, fields){
            if(error) reject (error);
            resolve(results);
            console.log(results);
            // console.log(fields);
        })
    })
}



// Fonction réaction like +1 => j'aime ou create like dans table reaction
exports.liked = async(postID, userID) => {
    
    return new Promise((resolve, reject) => {
        
        const sql = 'INSERT INTO `reactions` (`id_post_reacted`, `id_user_auteur_reaction`, `like`) VALUES (?,?,1)';
        let data = [postID, userID]
        dbmySql.query(sql, data, function(error, result, fields){
            if(error) reject (error);
            resolve(result);
            console.log(result);
            // console.log(fields);
        })
    })

};

// Fonction update like




// Fonction réaction dislike +1 => j'aime pas
exports.dislike = async(postID, userID) => {
    
    return new Promise((resolve, reject) => {
        
        const sql = 'INSERT INTO `reactions` (`id_post_reacted`, `id_user_auteur_reaction`, `dislike`) VALUES (?,?,1)';
        let data = [postID, userID]
        dbmySql.query(sql, data, function(error, result, fields){
            if(error) reject (error);
            resolve(result);
            console.log(result);
            // console.log(fields);
        })
    })
};



// Fonction update dislike