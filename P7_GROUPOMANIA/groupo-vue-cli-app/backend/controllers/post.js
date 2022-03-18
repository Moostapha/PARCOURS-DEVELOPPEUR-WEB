const postModel = require('../models/Post'); // Import des fonctions Models possédant nos requetes SQL

/* LOGIQUES METIERS DES POSTS CRUD
Notre app doit permettre aux users d'accéder:
1) à tous les posts
2) à un post en particulier (id)
3) Opérations CUD (R read étant les 2 du haut).
*/

// Fonction affichant tous les posts (page d'accueil) admin
exports.getAllPosts = async(req, res, next) => {
    const posts = await postModel.getAll();  // model.nomFonctionModelPost
    res.status(200).json({
        message:'Liste des posts', 
        posts : posts 
    });
};


// Fonction affichant un seul post => Pour component UpdatePost
exports.getOnePost = async(req, res, next) => {
    const postID = req.params.postID; // clé primaire de la ligne de table posts
    const post = await postModel.getOne(postID);
    res.status(200).json({ 
        message:'post sélectionné', 
        post : post 
    });
};


// Fonction créant un post
exports.createPost = async(req, res, next) => {
    
    // 1) on capture le corps de la requete dans une cst => Requête axios
    const created = req.body;
    
    // Affichage du corps de requête dans la console
    console.log('---- 1) CORPS REQUETE CREATEPOST() PAR AXIOS: ', created);
    
    // 2) on la passe à la fonction Model  en précisant les champs dans l'ordre de la requete sql (dans Models)
    const createdPost = await postModel.create( 
        // inputs du front:
        created.userID,    
        created.username, 
        created.contentPost
    );
    console.log("----- 2) RESULTAT DE LA PROMISE: ", createdPost)
    res.status(201).json({ 
        message:'post créé avec succés',  
        post: createdPost,
        // postID: createdPost.insertId // pour récupération via localStorage côté front
    });
};


// Fonction modifiant un post (after) => axios.put dans Post.vue
exports.updatePost = async(req, res, next) => {
    const postID = req.params.postID;  // clé primaire du post dans db
    // on recupere le corps du nouveau post dans une constante
    const newPost = req.body;
    console.log('----1) POSTID POST MODIFIE: ', postID);
    console.log('----2) TYPE DE POSTID: ', typeof postID);
    console.log('----3) CORPS REQUETE UPDATEPOST(): ', newPost);
    console.log('----4) TYPE DE LA REQUETE UPDATEPOST(): ', typeof newPost);
    
    if (newPost.contentPost === 'null') {
        res.status(204).json({ 
            message:'post non modifié', 
        })
    } else {
        // on les met en paramètre dans la fonction Model update de Post.js
        const updatedPost = await postModel.update( 
            newPost.contentPost, 
            newPost.postID 
        );
        console.log("----5) RESULTAT DE LA PROMISE UPDATEPOST(): ", updatedPost)
        res.status(201).json({ 
            message:'post modifié avec succés', 
            post: updatedPost 
        });
    }
    
};


// Fonction supprimant un post (after) à modifier pour supprimer file 
exports.deletePost = async(req, res, next) => {
    
    //Récup. clé primaire à supp
    const postID = req.params.postID;
    console.log('postId post supprimé: ', postID);
    
    //On la met en paramètre dans la fonction delete de Post.js
    const deletedPost = await postModel.delete(postID);
    console.log("résultat de la promise: ", deletedPost);
    
    // Renvoie de la réponse au front 
    res.status(200).json({ 
        message:'post supprimé avec succés', 
        post: deletedPost 
    });
};


// Fonction uploadFile qui permet aux users de télécharger une image pour la publier
exports.uploadImagePost = async(req, res, next) => {
    
    // Récupération corps post request chaine de caractère transformée en objet JS
    // const createdData = JSON.parse(req.body);
    const createdData = req.body;
    console.log('----- 1) CORPS REQUETE AXIOS UPLOADIMAGEPOST(): ', createdData);
    
    if (createdData.imagePost === 'null') {
        res.status(204).json({
            message:'Fichier non mis à jour, ancien fichier conservé',
        })
    } else {
        // Fichier téléchargé et envoyé depuis le front
        const file = req.file;
        console.log('----- 2) MEDIA TELECHARGE: ', file)
        
        // URL image pour lecture GET au niveau frontend + configuration URL dynamique des fichiers images
        // cet URL sera dans la colonne imagePost de notre database
        const imageURL = `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`;
        console.log('--- 2) URL FICHIER IMAGE UPLOADED : ', imageURL);
        console.log('--- 3) NOM DU FICHIER TELECHARGE: ', req.file.filename,);
        
        // Insertion ligne dans database
        const uploadedFilePost = await postModel.uploadImage(
            //inputs venant du front (axios)
            createdData.userID,
            createdData.username,
            imageURL, 
        );
        console.log('4) RESULTAT DE LA PROMISE UPLOADIMAGEPOST(): ', uploadedFilePost);
        res.status(200).json({
            message:'Fichier téléchargé avec succés',
            fileUploaded: uploadedFilePost
        })
    }
    // (async function () {
    //     var result = await returnsPromise().catch((e) => { console.error(e.message) })
    //     console.log( result ? 'This was a success! ' + result : 'This was a failure.' )
    //     })()
};


// Fonction de modification fichier image
exports.updateImagePost = async(req, res, next) => {
    // // postID dont on modifie l'image
    const updatedData = req.body;
    console.log("------ 1) Corps de la requête axios pour update image ------>", updatedData);
    // // Fichier nouveau choisi par user
    const uploadedImg = req.body.imagePost
    console.log("------ 2) Fichier téléchargé non modifié par user ----->", uploadedImg)
    
    if (updatedData.imagePost === 'null') {
        // return {
            res.status(204).json({
                message:'Fichier non mis à jour, ancien fichier conservé',
            })
            
        //}
    } else {
        const file = req.file;
        console.log("------- 3) URL Nouveau fichier ------> ", file); 
        
        // URL dynamique du fichier mis à jour à stocker dans la db + Stockage dans backend/images
        const imageURL = `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`;
        
        // Enregistrement dans la db via le Model updateUpload
        const updatedFilePost = await postModel.updateUploadImage(
            imageURL,
            updatedData.postID
        );
        console.log('Résultat de la promise: ', updatedFilePost);
        res.status(200).json({
            message:'Fichier mis à jour avec succés',
            fileUpdated: updatedFilePost
        }).catch( e => { console.error(e) })
    }

    // const file = req.file;
    // console.log("------- 3) URL Nouveau fichier ------> ", file); 
    
    // // URL dynamique du fichier mis à jour à stocker dans la db + Stockage dans backend/images
    // const imageURL = `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`;
    
    // // Enregistrement dans la db via le Model updateUpload
    // const updatedFilePost = await postModel.updateUploadImage(
    //     imageURL,
    //     updatedData.postID
    // );
    // console.log('Résultat de la promise: ', updatedFilePost);
    // res.status(200).json({
    //     message:'Fichier mis à jour avec succés',
    //     fileUpdated: updatedFilePost
    // }).catch( e => { console.error(e) })
    
    // if (uploadedImg === null) {
    //     // Enregistrement dans la db via le Model updateUpload
    //     const imageURL = `${req.protocol}://${req.get('host')}/images/post/${req.body.filename}`
    //     const updatedFilePost = await postModel.updateUploadImage(
    //     imageURL,
    //     updatedData.postID
    // );
    // console.log('Résultat de la promise: ', updatedFilePost);
    // res.status(200).json({
    //     message:'Fichier mis à jour avec succés',
    //     fileUpdated: updatedFilePost
    // })
    // } else if(uploadedImg === !null) {
    //     const file = req.file;
    //     console.log("------- 3) URL Nouveau fichier ------> ", file); 
    //     // URL dynamique du fichier mis à jour à stocker dans la db
    //     const imageURL = `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`;
        
    //     // Enregistrement dans la db via le Model updateUpload
    //     const updatedFilePost = await postModel.updateUploadImage(
    //         imageURL,
    //         updatedData.postID
    //     );
    //     console.log('Résultat de la promise: ', updatedFilePost);
    //     res.status(200).json({
    //         message:'Fichier mis à jour avec succés',
    //         fileUpdated: updatedFilePost
    //     })
    // }
    
}

// Toutes nos fonctions exportées vers /routes/post
