// Importation de l'infrastructure d'application Web Node.js
const express = require('express');

// Création du routeur
const router = express.Router();

// Importation du controlleur 'user'
const userCtrl = require('../controllers/user');

// Les routes utilisent la méthode POST pour les fonctions 'signup' et 'login'
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Exportation du routeur 
module.exports = router;