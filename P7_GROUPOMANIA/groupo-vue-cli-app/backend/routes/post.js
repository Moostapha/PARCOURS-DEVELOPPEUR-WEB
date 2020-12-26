const express = require('express');
const router = express.Router();
const postCtler = require('../controllers/post');

// Middleware d'authentification
const auth = require('../middlewares/authentification');

// routes pour les posts CRUD | PGGPD
router.post('/' , auth, postCtler.createPost);
router.get('/', auth, postCtler.getAllPosts);
router.get('/:id', auth, postCtler.getOnePost);
router.put('/:id', auth, postCtler.updatePost);
router.delete('/:id', auth, postCtler.deletePost);

// routes pour les comments ou commentPost CRUD | PGGPD | Pour commment doit on pouvoir voir un comment en particulier, le mien en temps que user?
router.post('/' , auth, postCtler.createCommentPost);
router.get('/', auth, postCtler.getAllCommentsPosts);
// router.get('/:id', auth, postCtler.getOneCommentPost); ???? 
router.put('/:id', auth, postCtler.updateCommentPost);
router.delete('/:id', auth, postCtler.deleteCommentPost);

// routes pour afficher les posts like et poster un like
router.get('/likes' , auth, postCtler.getAllLikePosts);
router.post('/like/:id' , auth, postCtler.postLikePost);

module.exports = router; // export pour réutilisation dans app.js