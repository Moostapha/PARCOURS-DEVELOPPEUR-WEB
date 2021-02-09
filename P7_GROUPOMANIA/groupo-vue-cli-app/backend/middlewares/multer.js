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