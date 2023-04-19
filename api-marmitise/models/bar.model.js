const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const barSchema = new Schema({
  Nom: {
    type: String,
    required: true
  },
  localisation: {
    type: String,
    required: true
  },
  cocktails: [{
    type: Schema.Types.ObjectId,
    ref: 'Cocktail'
  }]
}, {
  timestamps: true,
  versionKey: false
});


softSchema.virtual('id').get(function() {
    return this._id.toHexString();
});
barSchema.set('toObject', { virtuals: true });
barSchema.set('toJSON', { virtuals: true });


const Bar = mongoose.model('Bar', barSchema);
module.exports = Bar;