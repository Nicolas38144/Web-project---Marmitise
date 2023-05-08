const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schéma pour la table Alcool
const alcoolSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
    },
    nom: {
        type: String,
        required: true,
        unique: true
    },
    degre: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} is not a valid integer!`
        }
    },
    precision: {
        type: String
    },
    date_fabrication: {
        type: Date
    }
}, {
  timestamps: true,
  versionKey: false
});

alcoolSchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastAlcool = await Alcool.findOne({}, {}, { sort: { 'id': -1 } });
        const lastId = lastAlcool ? parseInt(lastAlcool.id) : 0;
        const newID = new mongoose.Types.ObjectId((lastId+1).toString().padStart(24, '0'));
        this.id = (lastId+1).toString().padStart(24, '0')
        this._id = newID;
    }
    next();
});

alcoolSchema.set('toObject', { virtuals: true });
alcoolSchema.set('toJSON', { virtuals: true });


const Alcool = mongoose.model('Alcool', alcoolSchema);
module.exports = Alcool;