const router = require('express').Router();
const SoftController = require('../controllers/soft.controller');

// Create a new Soft
router.post('/', SoftController.createSoft);

// Retrieve all Softs
router.get('/', SoftController.getSofts);

// Retrieve a single Soft with id
router.get('/:id', SoftController.getSoftById);

// Update a Soft with id
router.put('/:id', SoftController.updateSoft);

// Delete a Soft with id
router.delete('/:id', SoftController.deleteSoft);

module.exports = router;