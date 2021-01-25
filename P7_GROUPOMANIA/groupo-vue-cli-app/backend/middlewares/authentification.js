const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            // ajout nouveau code lié a p7 ici
            if(req.method == "GET") {
                req.body.userId = userId
            }
            next();
        }
    }  catch {
        res.status(401).json({
        error: new Error('Invalid request!')
        });
    };
}

// ancien code cf P6 etait ligne 17
// catch {
//     res.status(401).json({
//         error: new Error('Invalid request!')
//     });

// catch (error) {
//     console.log(error);
//     console.log('requête non authentifiée !!!');
// }