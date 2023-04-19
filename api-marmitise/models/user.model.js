const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,   // ajout de l'option unique pour le champ email
        required: true,  // ajout de l'option required pour le champ email (si nécessaire)
    },
    password: {
        type: String,
        required: true  // ajout de l'option required pour le champ password (si nécessaire)
    }
}, {
    timestamps: true,
    versionKey: false    // désactivation de la création automatique du champ "__v" par Mongoose
});
  

// Ajouter une propriété virtuelle pour le champ id qui sera égal à l'_id de l'utilisateur.
userSchema.virtual('id').get(function() {
    return this._id.toHexString();
});
userSchema.set('toObject', { virtuals: true });   // ajout des getters pour la sérialisation des objets
userSchema.set('toJSON', { virtuals: true });     // ajout des getters pour la sérialisation en JSON


const User = mongoose.model('User', userSchema);
module.exports = User;