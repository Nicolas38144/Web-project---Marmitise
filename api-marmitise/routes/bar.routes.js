const router = require('express').Router();
const BarController = require('../controllers/bar.controller');

// Create a new Bar
router.post('/', BarController.createBar);

// Retrieve all Bars
router.get('/', BarController.getBars);

// Retrieve a single Bar with id
router.get('/:id', BarController.getBarById);

// Update a Bar with id
router.put('/:id', BarController.updateBar);

// Delete a Bar with id
router.delete('/:id', BarController.deleteBar);

module.exports = router;