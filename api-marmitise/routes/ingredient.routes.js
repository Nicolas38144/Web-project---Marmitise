const router = require('express').Router();
const IngredientController = require('../controllers/ingredient.controller');

// Create a new Ingredient
router.post('/', IngredientController.createIngredient);

// Retrieve all Ingredients
router.get('/', IngredientController.getIngredients);

// Retrieve a single Ingredient with id
router.get('/:id', IngredientController.getIngredientById);

// Update a Ingredient with id
router.put('/:id', IngredientController.updateIngredient);

// Delete a Ingredient with id
router.delete('/:id', IngredientController.deleteIngredient);

module.exports = router;