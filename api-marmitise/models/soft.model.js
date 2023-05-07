const mongoose = require('mongoose');
//const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const softSchema = new Schema({
    nomSoft: {
      type: String,
      required: true,
      unique: true
    }
  }, {
    timestamps: true,
    versionKey: false
  });

//softSchema.plugin(AutoIncrement, { inc_field: 'id' });
softSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

softSchema.set('toObject', { virtuals: true });
softSchema.set('toJSON', { virtuals: true });

const Soft = mongoose.model('Soft', softSchema);

module.exports = Soft;