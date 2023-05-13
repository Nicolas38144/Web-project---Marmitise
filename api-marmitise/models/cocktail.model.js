const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alcoolSchema = new Schema({
    alcool: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alcool',
        required: true
    },
    qt_alc: {
        type: Number,
        required: true
    }
}, {
    _id: false
});

const softSchema = new Schema({
    soft: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Soft',
        required: true
    },
    qt_soft: {
        type: Number,
        required: true
    }
}, {
    _id: false
});

const ingredientSchema = new Schema({
    ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
        required: true
    }
}, {
    _id: false
});

const cocktailSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
    },
    nom: {
        type: String,
        required: true,
        unique: true
    },
    alcools: [alcoolSchema],
    softs: [softSchema],
    ingredients: [ingredientSchema]
}, {
    timestamps: true,
    versionKey: false
});

cocktailSchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastCocktail = await Cocktail.findOne({}, {}, { sort: { 'id': -1 } });
        const lastId = lastCocktail ? parseInt(lastCocktail.id) : 0;
        const newID = new mongoose.Types.ObjectId((lastId+1).toString().padStart(24, '0'));
        this.id = (lastId+1).toString().padStart(24, '0')
        this._id = newID;
    }
    next();
});


cocktailSchema.set('toObject', { virtuals: true });
cocktailSchema.set('toJSON', { virtuals: true });

const Cocktail = mongoose.model('Cocktail', cocktailSchema);
module.exports = Cocktail;