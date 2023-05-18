const Cocktail = require('../models/cocktail.model');
const Alcool = require('../models/alcool.model');
const Soft = require('../models/soft.model');
const Ingredient = require('../models/ingredient.model');


// CREATE
const createCocktail = async (req, res) => {
    try {
        if (!req.body.nom) {
            return res.status(400).json({ 
                message: "Cocktail name cannot be empty" 
            });
        }

        const existingCocktail = await Cocktail.findOne({ nom: req.body.nom });
        if (existingCocktail) {
            return res.status(400).json({ 
                message: "A cocktail with this name already exists" 
            });
        }

        for (const alcool of req.body.alcools) {
            if (alcool.qt_alc && Number.isNaN(Number(alcool.qt_alc)) || Number(alcool.qt_alc) <= 0) {
                return res.status(400).json({ 
                    message: "La quantité d'alcool doit être un nombre supérieur à zéro." 
                });
            }
            const alcoolExist = await Alcool.findById(alcool.id_alcool);
            if (!alcoolExist) {
                return res.status(404).json({ 
                    message: "L'alcool "+ alcool.id_alcool +" n'existe pas." 
                });
            }
        }

        for (const soft of req.body.softs) {
            if (soft.qt_soft && Number.isNaN(Number(soft.qt_soft)) || Number(soft.qt_soft) <= 0) {
                return res.status(400).json({ 
                    message: "La quantité de soft doit être un nombre supérieur à zéro." 
                });
            }
            const softExist = await Soft.findById(soft.id_soft);
            if (!softExist) {
                return res.status(404).json({ 
                    message: "Le soft "+ soft.id_soft +" n'existe pas." 
                });
            }
        }

        for (const ingredient of req.body.ingredients) {
            const alcoolExist = await Ingredient.findById(ingredient.id_ingredient);
            if (!alcoolExist) {
                return res.status(404).json({ 
                    message: "L'ingredient "+ ingredient.id_ingredient +" n'existe pas." 
                });
            }
        }

        const newCocktail = new Cocktail({
            nom: req.body.nom,
            alcools: req.body.alcools,
            softs: req.body.softs,
            ingredients: req.body.ingredients
        });

        await newCocktail.save();
        res.json({
            message: 'Cocktail added successfully'
        });
    } 
    catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while creating the Cocktail."
        });
        res.status(400).json({ 
            message: error.message || "Some error occurred while creating the Cocktail."
        });
    }
};


// READ ALL
const getCocktails = async (req, res) => {
    try {
        const cocktails = await Cocktail.find();
        res.json(cocktails);
    } 
    catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving cocktails."
        });
    }
};

// READ ONE
const getCocktailById = async (req, res) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id);
        if (!cocktail) {
            return res.status(404).json({
                message: "Cocktail not found with id " + req.params.id
            });
        }
        res.json(cocktail);
    } 
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "Cocktail not found with id " + req.params.id
            });
        }
        return res.status(500).json({
            message: "Error retrieving cocktail with id " + req.params.id
        });
    }
};


// UPDATE
const updateCocktail = async (req, res) => {
    try {
        const { id } = req.params;
        const cocktail = await Cocktail.findById(id);
    
        if (!cocktail) {
            return res.status(404).json({ message: 'Cocktail not found' });
        }
    
        const { nom, alcools, softs, ingredients } = req.body;
    
        // Vérification du nom du cocktail
        if (nom && nom.trim() !== '') {
            cocktail.nom = nom.trim();
        } else {
            return res.status(400).json({ message: 'Invalid cocktail name' });
        }
    
        // Vérification des alcools
        if (alcools && Array.isArray(alcools)) {
            for (const alcool of alcools) {
                if (alcool.id_alcool && alcool.qt_alc) {
                    const alcoolExist = await Alcool.findById(alcool.id_alcool);
                    if (!alcoolExist) {
                        return res.status(400).json({ message: 'Invalid alcohol' });
                    }
                } 
                if (alcool.qt_alcool && Number.isNaN(Number(alcool.qt_alcool)) || Number(alcool.qt_alcool) <= 0) {
                    return res.status(400).json({ message: 'Invalid alcohol quantity' });
                }
            }
            cocktail.alcools = alcools;
        } 
        else if (alcools === undefined) {
            // Si alcools n'est pas défini dans la requête, on ne modifie pas le champ
        } 
        else {
            return res.status(400).json({ message: 'Invalid alcohol format' });
        }
    
        // Vérification des softs
        if (softs && Array.isArray(softs)) {
            for (const soft of softs) {
                if (soft.id_soft) {
                    const softExist = await Soft.findById(soft.id_soft);
                    if (!softExist) {
                        return res.status(400).json({ message: 'Invalid soft' });
                    }
                } 
                if (soft.qt_soft && Number.isNaN(Number(soft.qt_soft)) || Number(soft.qt_soft) <= 0) {
                    return res.status(400).json({ message: 'Invalid soft quantity' });
                }
            }
            cocktail.softs = softs;
        } 
        else if (softs === undefined) {
            // Si softs n'est pas défini dans la requête, on ne modifie pas le champ
        } 
        else {
            return res.status(400).json({ message: 'Invalid soft format' });
        }

        // Vérification des ingredient
        if (ingredients && Array.isArray(ingredients)) {
            for (const ingredient of ingredients) {
                if (ingredient.id_ingredient) {
                    const ingredientExist = await Soft.findById(ingredient.id_ingredient);
                    if (!ingredientExist) {
                        return res.status(400).json({ message: 'Invalid ingredient' });
                    }
                } 
                else {
                    return res.status(400).json({ message: 'Invalid soft quantity' });
                }
            }
            cocktail.ingredients = ingredients;
        } 
        else if (ingredients === undefined) {
            // Si ingredients n'est pas défini dans la requête, on ne modifie pas le champ
        } 
        else {
            return res.status(400).json({ message: 'Invalid ingredient format' });
        }
    
        // Sauvegarde du cocktail
        const updatedCocktail = await cocktail.save();
        res.json(updatedCocktail);
    } 
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
  


// DELETE
const deleteCocktail = async (req, res) => {
    try {
        const cocktail = await Cocktail.findByIdAndRemove(req.params.id);
        if (!cocktail) {
            return res.status(404).json({ 
                message: "Cocktail not found with id " + req.params.id
            });
        }
        res.json({
            message: "Cocktail deleted successfully!"
        });
    } 
    catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                message: "Cocktail not found with id " + req.params.id
            });
        }
        return res.status(500).json({
            message: "Could not delete cocktail with id " + req.params.id
        });
    }
};


module.exports = {
    createCocktail,
    getCocktails,
    getCocktailById,
    updateCocktail,
    deleteCocktail
}