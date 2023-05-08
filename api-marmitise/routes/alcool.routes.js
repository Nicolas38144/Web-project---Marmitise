const router = require('express').Router();
const AlcoolController = require('../controllers/alcool.controller');

// Create a new Alcool
router.post('/', AlcoolController.createAlcool);

// Retrieve all Alcools
router.get('/', AlcoolController.getAlcools);

// Retrieve a single Alcool with id
router.get('/:id', AlcoolController.getAlcoolById);

// Update a Alcool with id
router.put('/:id', AlcoolController.updateAlcool);

// Delete a Alcool with id
router.delete('/:id', AlcoolController.deleteAlcool);

module.exports = router;