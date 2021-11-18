// Import du Model Reaction
const reactionModel = require('../models/Reaction');


// Fonction affichant allLikes
exports.getAllLikes = async(req, res, next) => {
    const likes = await reactionModel.getLikes();
    res.status(200).json({
        message: 'Liste de tous les likes',
        likes: likes
    })
}


// Fonction affichant all dislikes
exports.getAllDislikes = async(req, res, next) => {
    const dislikes = await reactionModel.getDislikes();
    res.status(200).json({
        message:'Liste de tous les dislikes',
        dislikes: dislikes
    })
}


// Fonction créant un like
exports.likePost = async(req, res, next)=> {
    // Capture corps requête venant du front via axios
    // req.body.id_post_reacted => postID
    // req.body.id_user_auteur_reaction => userID
    const like = req.body;
    console.log('corps requête POST by axios: ', like);
    
    // condition si userID qui like a déja liker ou pas
    // if (req.body.like === 1) {
    //     // 1) si oui, renvoyer message d'erreur lui disant qu'il ne peut liker twice
    //     res.status(400).json({
    //         message: 'Vous aimez déjà ce post !!!'
    //     })
    
    // } else {
        // 2) sinon, créez le like et l'enregistrer dans table likes
        const createdLike = await reactionModel.liked(
            like.id_post_reacted,
            like.id_user_auteur_reaction
        );
        console.log('Résultat de la promise: ', createdLike)
        res.status(201).json({
            message:'like du post créé avec succés',
            likedPost: createdLike
        })
    //}
};


// Fonction créant un dislike
exports.dislikePost = async(req, res, next)=> {
    // Capture corps requête venant du front via axios
    const dislike = req.body;
    console.log('Corps de la requête venant du front via axios: ',dislike);
    // condition si userID qui dislike a déja disliker ou pas
    if (req.body.userID) {
        // 1) si oui, renvoyer message d'erreur lui disant qu'il ne peut disliker twice
        res.status(400).json({
            message: 'Vous n\'aimez pas ce post déjà !!!'
        })
    
    } else {
        // 2) sinon, créez le dislike et l'enregistrer dasn table dislikes
        const createdDislike = await reactionModel.dislike(
            dislike.id_post_reacted,
            dislike.id_user_auteur_reaction
        );
        console.log('Résultat de la promise: ', createdDislike)
        res.status(201).json({
            message:'dislike du post créè avec succés',
            dislikedPost: createdDislike
        })
    }
};

// Fonction modifiant un like
exports.updateLikePost = async(req, res, next)=> {}


// Fonction modifiant un dislike
exports.updateDislikePost = async(req, res, next)=> {}
