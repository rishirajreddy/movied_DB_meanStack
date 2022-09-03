const multer = require('multer')

const videoStorage = multer.diskStorage({
    destination: 'videos', // Destination to store video 
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("");
        // const extension = MIME_TYPE_MAP[file.mimetype];
        cb(null, name);
    }
});

module.exports = multer({storage:videoStorage}).single("video");
