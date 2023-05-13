const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
    }, 
    nomIngredient: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true,
    versionKey: false,
    _id: true
});

ingredientSchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastIngredient = await Ingredient.findOne({}, {}, { sort: { 'id': -1 } });
        const lastId = lastIngredient ? parseInt(lastIngredient.id) : 0;
        const newID = new mongoose.Types.ObjectId((lastId+1).toString().padStart(24, '0'));
        this.id = (lastId+1).toString().padStart(24, '0')
        this._id = newID;
    }
    next();
});


ingredientSchema.set('toObject', { virtuals: true });
ingredientSchema.set('toJSON', { virtuals: true });

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient;