const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schéma pour la table Alcool
const alcoolSchema = new Schema({
  nom: {
    type: String,
    required: true
  },
  precision: {
    type: String,
    required: true
  },
  date_fabrication: {
    type: Date,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});


alcoolSchema.virtual('id').get(function() {
    return this._id.toHexString();
});
alcoolSchema.set('toObject', { virtuals: true });
alcoolSchema.set('toJSON', { virtuals: true });


const Alcool = mongoose.model('Alcool', alcoolSchema);
module.exports = Alcool;