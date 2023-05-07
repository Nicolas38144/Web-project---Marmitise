const Soft = require('../models/soft.model');

// CREATE
const createSoft = async (req, res, next) => {
    try {

        if (!req.body.nomSoft) {
            console.log('Le champ est vide');
            return res.status(400).send({
                message: "Soft name can not be empty"
            });
        }

        const newSoft = new Soft({
            nomSoft: req.body.nomSoft
        });

        await newSoft.save();
        console.log(newSoft);
        res.json({
            message: 'Soft added successfully'
        });
    } 
    catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Soft."
        });
    }
};


// READ ALL
const getSofts = async (req, res) => {
    try {
        const softs = await Soft.find();
        res.send(softs);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving softs."
        });
    }
};


// READ ONE
const getSoftById = async (req, res) => {
    try {
        const soft = await Soft.findById(req.params.id);
        if (!soft) {
            return res.status(404).send({
                message: "Soft not found with id " + req.params.id
            });
        }
        res.send(soft);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Soft not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving soft with id " + req.params.id
        });
    }
};


// UPDATE
const updateSoft = async (req, res) => {
    try {
        // Validate Request
        if (!req.body.nomSoft) {
            return res.status(400).send({
                message: "Soft name can not be empty"
            });
        }

        // Find soft and update it with the request body
        const soft = await Soft.findByIdAndUpdate(req.params.id, {
            nomSoft: req.body.nomSoft
        }, {
            new: true
        });
        if (!soft) {
            return res.status(404).send({
                message: "Soft not found with id" + req.params.id
            });
        }
        res.send(soft);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Soft not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating soft with id " + req.params.id
        });
    }
};


// DELETE
const deleteSoft = async (req, res) => {
    try {
        const soft = await Soft.findByIdAndRemove(req.params.id);
        if (!soft) {
            return res.status(404).send({
                message: "Soft not found with id " + req.params.id
            });
        }
        res.send({
            message: "Soft deleted successfully!"
        });
    } catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Soft not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete soft with id " + req.params.id
        });
    }
};


module.exports = {
  createSoft,
  getSofts,
  getSoftById,
  updateSoft,
  deleteSoft,
};