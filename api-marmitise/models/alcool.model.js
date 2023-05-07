const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

// Schéma pour la table Alcool
const alcoolSchema = new Schema({
    nom: {
        type: String,
        required: true
    },
    precision: String,
    date_fabrication: Date
}, {
  timestamps: true,
  versionKey: false
});

alcoolSchema.plugin(autoIncrement.plugin, {
    model: 'Alcool',
    field: 'id',
    startAt: 1,
    incrementBy: 1
});

alcoolSchema.set('toObject', { virtuals: true });
alcoolSchema.set('toJSON', { virtuals: true });


const Alcool = mongoose.model('Alcool', alcoolSchema);
module.exports = Alcool;