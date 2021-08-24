// Importation d'Express
const express = require('express');

// Importation de Mongoose
const mongoose = require('mongoose');

// Connection API au cluster MongoDB
mongoose.connect('mongodb+srv://new_user87:Moononthewater87@cluster0.lxpxl.mongodb.net/Cluster0?retryWrites=true&w=majority',
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Fonction permettant d'appeler la fonction express (créer une application Express)
const app = express();

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

// Création d'une route POST
app.post('/api/stuff', (req, res, next) => {
    console.log(req.body,'Route Post');
    res.status(201).json({
        message: 'Objet créé !'
    });
});

// Création d'une route GET
// Récupérer deux objets au endpoint 'http://localhost:3000/api/stuff' (URI)
app.use('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'oeihfzeoi',
            title: 'Mon premier objet',
            description: 'Les infos de mon premier objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 4900,
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'Mon deuxième objet',
            description: 'Les infos de mon deuxième objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 2900,
            userId: 'qsomihvqios',
        },
    ];
    res.status(200).json(stuff);
});

// Exporter cette application pour pouvoir y accéder depuis autres fichiers du projet (serveur Node)
module.exports = app;