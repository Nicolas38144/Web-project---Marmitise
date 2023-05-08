const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const softSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
    }, 
    nomSoft: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true,
    versionKey: false,
    _id: true
});

softSchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastSoft = await Soft.findOne({}, {}, { sort: { 'id': -1 } });
        const lastId = lastSoft ? parseInt(lastSoft.id) : 0;
        const newID = new mongoose.Types.ObjectId((lastId+1).toString().padStart(24, '0'));
        this.id = (lastId+1).toString().padStart(24, '0')
        this._id = newID;
    }
    next();
});


softSchema.set('toObject', { virtuals: true });
softSchema.set('toJSON', { virtuals: true });

const Soft = mongoose.model('Soft', softSchema);
module.exports = Soft;