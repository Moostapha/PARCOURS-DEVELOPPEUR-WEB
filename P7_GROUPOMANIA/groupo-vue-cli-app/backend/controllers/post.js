const {getAll} = require('../models/Post'); // import dynamique sur une seul fonction getAll

exports.getAllPosts = (req, res, next) => {
const posts = getAll();
res.status(200).json({posts: posts}) // renvoie les posts au niveau du front

} 