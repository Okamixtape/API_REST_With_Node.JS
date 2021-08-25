// Importation de l'infrastructure d'application Web Node.js
const express = require('express');

// Création du routeur
const router = express.Router();

// Importation du controlleur 'sauces'
const saucesCtrl = require('../controllers/sauces');

// Importation du Middleware d'authentification
const auth = require('../middleware/auth')
// Importation du Middleware de configuration de multer
const multer = require('../middleware/multer-config')

// Route utilisant la méthode POST pour ajouter une sauce
router.post('/', auth, multer, saucesCtrl.createSauce);

// Route utilisant la méthode PUT pour modifier une sauce existante
router.put ('/:id', auth, multer, saucesCtrl.modifySauce);

// Route utilisant la méthode DELETE pour supprimer une sauce existante
router.delete('/:id', auth, saucesCtrl.deleteSauce );

// Route utilisant la méthode GET pour récupérer une sauce avec son identifiant
// ':' indique que la route est dynamique
router.get('/:id', auth, saucesCtrl.getOneSauce );

// Route utilisant la méthode GET pour récupérer toutes les sauces
router.get('/', auth, saucesCtrl.getAllSauces);

// Exportation du routeur 
module.exports = router;