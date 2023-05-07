const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const cocktailSchema = new Schema({
    nom: {
      type: String,
      required: true
    },
    alcools: [{
        type: Number,
        ref: 'Alcool'
      }],
      softs: [{
        type: Number,
        ref: 'Soft'
      }],
      ingredients: [{
        alcool: {
          type: Number,
          ref: 'Alcool'
        },
        soft: {
          type: Number,
          ref: 'Soft'
        },
        qt_alc: {
          type: Number,
          required: true
        },
        qt_soft: {
          type: Number,
          required: true
        }
      }]
}, { 
    timestamps: true,
    versionKey: false
});

cocktailSchema.plugin(autoIncrement.plugin, {
    model: 'Cocktail',
    field: 'id',
    startAt: 1,
    incrementBy: 1
});
 
cocktailSchema.set('toObject', { virtuals: true });
cocktailSchema.set('toJSON', { virtuals: true });


const Cocktail = mongoose.model('Cocktail', cocktailSchema);
module.exports = Cocktail;