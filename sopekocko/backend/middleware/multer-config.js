const multer = require('multer');

//object created to handle files extension with mime types in filename
const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png'
};

//configuration object that will handle input files
const storage = multer.diskStorage({      
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype]; // we got access to files'mimetypes that we then convert with our object
        callback(null, name + Date.now() + '.' + extension); // We name our input file using a time stamp with date.now()
    }
});

module.exports = multer({ storage: storage }).single('image');

/*MULTER
We need to now apply this middleware on POST routes in sauces controller in order to let users load their files

on our app dynamically. Indeed now URL format is not the same when we join a file to it from the frontend

This will require a modification on routes' codes | controllers logic. Modificated routes will be PUT and DELETE also

For PUT route we'll need to handle 2 possibilities:

1) User just change text and not the image
2) User change image
*/