const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const barSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
    }, 
    nom: {
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


barSchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastBar = await Bar.findOne({}, {}, { sort: { 'id': -1 } });
        const lastId = lastBar ? parseInt(lastBar.id) : 0;
        const newID = new mongoose.Types.ObjectId((lastId+1).toString().padStart(24, '0'));
        this.id = (lastId+1).toString().padStart(24, '0')
        this._id = newID;
    }
    next();
});

barSchema.set('toObject', { virtuals: true });
barSchema.set('toJSON', { virtuals: true });


const Bar = mongoose.model('Bar', barSchema);
module.exports = Bar;