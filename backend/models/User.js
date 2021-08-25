// Importation de Mongoose permettant la création de schéma de données
const mongoose = require('mongoose');

// Importation du plugin unique validator pour s'assurer que deux utilisateurs ne peuvent pas utiliser la même adresse e-mail
const uniqueValidator = require('mongoose-unique-validator');

// Création d'un schéma de données pour l'utilisateur/user
// Nous voulons que l'adresse email d'un utilisateur soit unique
const userSchema = mongoose.Schema ({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Application du validateur au schéma "utilisateur"
userSchema.plugin(uniqueValidator);

// Exportation du schéma de données pour l'exploiter comme modèle dans le projet (nomDuModele,variableDuSchema)
module.exports = mongoose.model('User', userSchema); 