const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'dist/assets/public/images');
    },
    filename: (req, file, cb) => {
        console.log("file: ", file);
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const flag = file.mimetype.startsWith('image');
    cb(null, flag);
}

const uploadFile = multer({
    storage: multerStorage,
    filter: fileFilter
});

module.exports = uploadFile;