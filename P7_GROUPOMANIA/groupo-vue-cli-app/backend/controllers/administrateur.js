// schema de donnees User de User/model
const Admin = require('../models/Administrateur'); 

// Fonction pour voir toutes les infos et activités des users
exports.getAllUsersInfos = async(req, res, next) => {
    const allUsersInfos = await Admin.getUsersInfosAndStats();
    res.status(200).json({ 
        message:'Infos de tous les users et leurs statistiques', 
        users: allUsersInfos 
    });
};

exports.getUsersLikesAndDislikes = async(req, res, next) => {
    const allLikesDislikesByUser = await Admin.getUsersAllReactions();
    res.status(200).json({
        message: 'Likes et Dislikes par user',
        reactions: allLikesDislikesByUser
    });
}

exports.deleteUser = async(req, res, next) => {
    const userById  = req.params.userID;
    console.log("=> ID Utilisateur supprimé:  ", userById); 
    const deletedAccount = await Admin.deleteUser(userById);
    res.status(200).json({ 
        message:'Utilisateur supprimé avec succés', 
        userDeleted : deletedAccount
    });
};