const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cocktailSchema = new Schema({
  nom: {
    type: String,
    required: true
  },
  alcool: [{
    type: Schema.Types.ObjectId,
    ref: 'Alcool'
  }],
  soft: [{
    type: Schema.Types.ObjectId,
    ref: 'Soft'
  }],
  qt_alc: {
    type: Number,
    required: true
  },
  qt_soft: {
    type: Number,
    required: true
  }
}, { timestamps: true });


softSchema.virtual('id').get(function() {
    return this._id.toHexString();
});  
softSchema.set('toObject', { virtuals: true });
softSchema.set('toJSON', { virtuals: true });


const Cocktail = mongoose.model('Cocktail', cocktailSchema);
module.exports = Cocktail;