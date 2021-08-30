// Importatin du modèle 'Sauces' pour l'utiliser dans les fonctions
const Sauce = require('../models/Sauces');

// Importation du modèle 'Like' pour l'utiliser dans les fonctions
const Like = require('../models/Like');

// Importation de file system pour la gestion des fichiers
const fs = require('fs');

// Fonction permettant de créer un objet 'sauce'
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce ({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes : 0,
        dislikes : 0,
        usersLiked : [],
        usersdisLiked : []
    });
    sauce.save()
        .then(() => res.status(201).json({ message: ' Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

// Fonction permettant la modification d'une sauce
exports.modifySauce =  (req, res, next) =>{
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    } : {...req.body}; 
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) 
        .then(()=> res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

// Fonction permettant la suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then( sauce => {
        const filename = sauce.imageUrl.split('/images')[1]
        fs.unlink(`images/${filename}`, () => { 
            Sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                .catch(error => res.status(404).json({ error }));
        })
    })
    .catch(error => res.status(500).json({ error }));
}; 

// Fonction permettant la récupération d'un seul objet (une sauce)
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// Fonction permettant la récupération de tous les objets (toutes les sauces)
exports.getAllSauces = (req, res, next) => {
    Sauce.find() 
        .then(sauces => res.status(200).json(sauces)) 
        .catch(error => res.status(400).json({ error }));
};

// Fonction permettant de liker ou disliker une sauce
exports.likeSauce= (req, res, next) => {
    // Définit le statut « Like » pour l'userId fourni
    const likeValue = req.body.like;
    const userId = req.body.userId;
    // Récupération de l'identifiant de la sauce pour liker ou disliker
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        let newUsersLiked = sauce.usersLiked;
        const newUsersDisliked = sauce.usersDisliked;
        // Si like = 1, l'utilisateur aime (= like) la sauce
        if (likeValue == 1) {
            newUsersLiked.push(userId)
            const newLikes = newUsersLiked.length
            Sauce.updateOne({ _id: req.params.id },{
                likes: newLikes,
                usersLiked: newUsersLiked
            }) 
        .then(()=> res.status(200).json({ message : 'Vous avez likée cette sauce !'}))
        .catch(error => res.status(400).json({ error }));
        }
        // Si like = 0, l'utilisateur annule son like ou son dislike
        else if (likeValue == 0) {
            const indexToRemoveFromLikes = newUsersLiked.indexOf(userId)
            newUsersLiked.splice(indexToRemoveFromLikes,1)
            const newLikes = newUsersLiked.length
            const indexToRemoveFromDislikes = newUsersDisliked.indexOf(userId)
            newUsersDisliked.splice(indexToRemoveFromDislikes,1)
            const newDislikes = newUsersDisliked.length
            Sauce.updateOne({ _id: req.params.id },{
                likes: newLikes,
                dislikes: newDislikes,
                usersLiked: newUsersLiked,
                usersDisliked: newUsersDisliked
            })
            .then(()=> res.status(200).json({ message: 'Notation annulée !' }))
            .catch(error => res.status(400).json({ error })); 
        }
        // Si like = -1, l'utilisateur n'aime pas (= dislike) la sauce
        else if (likeValue == -1) {
            newUsersDisliked.push(userId)
            const newDislikes = newUsersDisliked.length
            Sauce.updateOne({ _id: req.params.id },{
                dislikes: newDislikes,
                usersDisliked: newUsersDisliked
            })
            .then(()=> res.status(200).json({ message: 'Vous avez dislikée cette sauce !' }))
            .catch(error => res.status(400).json({ error }));
        }
    })
    .catch(error => res.status(500).json({ error }));
} 