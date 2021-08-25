// Importation d'Express
const express = require('express');
// Importation de Mongoose
const mongoose = require('mongoose');
// Importation de Path pour accéder au path de notre serveur
const path = require('path');

// Importation de Cors
const cors = require('cors');

// Importation des routeurs
const userRoutes = require('./routes/user');

// Connection API au cluster MongoDB
mongoose.connect('mongodb+srv://new_user87:Moononthewater87@cluster0.lxpxl.mongodb.net/Cluster0?retryWrites=true&w=majority',
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Fonction permettant d'appeler la fonction express (créer une application Express)
const app = express();

// Middleware global pour éviter erreur CORS
app.use(cors());

// Message s'affichant dans la console quand une requête est reçue
app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
});


// Middleware général appliqué à toute les réquêtes et réponses
// Headers permettent d'accéder : à notre API depuis n'importe quelle origine ( '*' )
// d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.)
// d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Middleware global remplaçant body-parser (méthode de body-parser pour transformer le corps de la requête en JSON / objet JS utilisable)
app.use(express.json());

// app.use = Middleware

// Middleware pour la gestion de l'enregistrement des images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware servant à utiliser les routes
app.use('/api/auth', userRoutes);

// Exporter cette application pour pouvoir y accéder depuis autres fichiers du projet (serveur Node)
module.exports = app;