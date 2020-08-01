const multer = require('multer');
const storage = multer.diskStorage({
    //Specify properties
    //this property sets the files destination
    destination: (req, file, callback) => {
        callback(null, 'images/');
    },

    //this property can define the filename
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
});
//  require('../')
// filter out certain files
const fileFilter = (req, file, callback) => {
    if( file.mimetype == 'image/jpeg' ||  file.mimetype == 'image/png'){
        callback(null, true);
    }else {
        callback(new Error('Error upload supports only static image files.'), false);
    }
}

const upload = multer({
    storage: storage, 
    limits: {
    fileSize: 1024 * 1024 * 2,
    fieldNameSize: 800
    },
    fileFilter
})

module.exports = upload;