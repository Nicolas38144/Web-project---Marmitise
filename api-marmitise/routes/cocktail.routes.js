const router = require('express').Router();
const CocktailController = require('../controllers/cocktail.controller');

// Create a new Cocktail
router.post('/', CocktailController.createCocktail);

// Retrieve all Cocktails
router.get('/', CocktailController.getCocktails);

// Retrieve a single Cocktail with id
router.get('/:id', CocktailController.getCocktailById);

// Update a Cocktail with id
router.put('/:id', CocktailController.updateCocktail);

// Delete a Cocktail with id
router.delete('/:id', CocktailController.deleteCocktail);

module.exports = router;