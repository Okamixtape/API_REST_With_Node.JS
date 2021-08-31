// Importation de multer
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Objet de configuration de multer 
// Enregistrement sur le disque 
const storage = multer.diskStorage ({
    // 1er argument : Explication à multer dans quel dossier enregistré le fichier image
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    // 2e argument : Explication à multer quel nom utilisé pour le fichier image
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    },
});

// Déclaration d'une constante pour limiter la taille des images téléchargées
const maxFileSize = 1 * 1024 * 1024;

module.exports = multer({ storage, limits: {fileSize: maxFileSize} }).single('image');
