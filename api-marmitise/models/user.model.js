const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
    }, 
    email: {
        type: String,
        unique: true,   // ajout de l'option unique pour le champ email
        required: true,  // ajout de l'option required pour le champ email (si nécessaire)
    },
    password: {
        type: String,
        required: true  // ajout de l'option required pour le champ password (si nécessaire)
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false,    // désactivation de la création automatique du champ "__v" par Mongoose
    _id: true
});
  

userSchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastUser = await User.findOne({}, {}, { sort: { 'id': -1 } });
        const lastId = lastUser ? parseInt(lastUser.id) : 0;
        const newID = new mongoose.Types.ObjectId((lastId+1).toString().padStart(24, '0'));
        this.id = (lastId+1).toString().padStart(24, '0')
        this._id = newID;
    }
    next();
});

userSchema.set('toObject', { virtuals: true });   // ajout des getters pour la sérialisation des objets
userSchema.set('toJSON', { virtuals: true });     // ajout des getters pour la sérialisation en JSON


const User = mongoose.model('User', userSchema);
module.exports = User;