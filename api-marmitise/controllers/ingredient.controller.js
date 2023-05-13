const Ingredient = require('../models/ingredient.model');

// CREATE
const createIngredient = async (req, res, next) => {
    try {
        if (!req.body.nomIngredient) {
            return res.status(400).json({
                message: "Ingredient name can not be empty"
            });
        }

        const newIngredient = new Ingredient({
            nomIngredient: req.body.nomIngredient
        });

        await newIngredient.save();
        res.json({
            message: 'Ingredient added successfully'
        });
    } 
    catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while creating the Ingredient."
        });
    }
};


// READ ALL
const getIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredient.find();
        res.json(ingredients);
    } 
    catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving ingredients."
        });
    }
};


// READ ONE
const getIngredientById = async (req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id);
        if (!ingredient) {
            return res.status(404).json({
                message: "Ingredient not found with id " + req.params.id
            });
        }
        res.json(ingredient);
    } 
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "Ingredient not found with id " + req.params.id
            });
        }
        return res.status(500).json({
            message: "Error retrieving ingredient with id " + req.params.id
        });
    }
};


// UPDATE
const updateIngredient = async (req, res) => {
    try {
        // Validate Request
        if (!req.body.nomIngredient) {
            return res.status(400).json({
                message: "Ingredient name can not be empty"
            });
        }
        else if (typeof req.body.nomIngredient !== "string" || req.body.nomIngredient.trim().length === 0) {
            return res.status(400).json({
                message: "Invalid ingredient name format"
            });
        }

        // Check if ingredient with new name already exists
        const ingredientWithNameExists = await Ingredient.findOne({
            nomIngredient: req.body.nomIngredient
        });
        if (ingredientWithNameExists && ingredientWithNameExists.id.toString() !== req.params.id) {
            return res.status(409).json({
                message: "Ingredient with name " + req.body.nomIngredient + " already exists"
            });
        }

        // Find ingredient and update it with the request body
        const ingredient = await Ingredient.findByIdAndUpdate(req.params.id, {
            nomIngredient: req.body.nomIngredient
        }, {
            new: true
        });
        if (!ingredient) {
            return res.status(404).json({
                message: "Ingredient not found with id" + req.params.id
            });
        }
        res.json(ingredient);
    } 
    catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: err.message
            });
        } 
        else if (err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "Ingredient not found with id " + req.params.id
            });
        }
        return res.status(500).json({
            message: "Error updating ingredient with id " + req.params.id
        });
    }
};


// DELETE
const deleteIngredient = async (req, res) => {
    try {
        const ingredient = await Ingredient.findByIdAndRemove(req.params.id);
        if (!ingredient) {
            return res.status(404).json({
                message: "Ingredient not found with id " + req.params.id
            });
        }
        res.json({
            message: "Ingredient deleted successfully!"
        });
    } 
    catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                message: "Ingredient not found with id " + req.params.id
            });
        }
        return res.status(500).json({
            message: "Could not delete ingredient with id " + req.params.id
        });
    }
};


module.exports = {
  createIngredient,
  getIngredients,
  getIngredientById,
  updateIngredient,
  deleteIngredient
};