const Soft = require('../models/soft.model');

// CREATE
const createSoft = async (req, res, next) => {
    try {
        if (!req.body.nomSoft) {
            return res.status(400).json({
                message: "Soft name can not be empty"
            });
        }

        const newSoft = new Soft({
            nomSoft: req.body.nomSoft
        });

        await newSoft.save();
        res.json({
            message: 'Soft added successfully'
        });
    } 
    catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while creating the Soft."
        });
    }
};


// READ ALL
const getSofts = async (req, res) => {
    try {
        const softs = await Soft.find();
        res.json(softs);
    } 
    catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving softs."
        });
    }
};


// READ ONE
const getSoftById = async (req, res) => {
    try {
        const soft = await Soft.findById(req.params.id);
        if (!soft) {
            return res.status(404).json({
                message: "Soft not found with id " + req.params.id
            });
        }
        res.json(soft);
    } 
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "Soft not found with id " + req.params.id
            });
        }
        return res.status(500).json({
            message: "Error retrieving soft with id " + req.params.id
        });
    }
};


// UPDATE
const updateSoft = async (req, res) => {
    try {
        // Validate Request
        if (!req.body.nomSoft) {
            return res.status(400).json({
                message: "Soft name can not be empty"
            });
        }
        else if (typeof req.body.nomSoft !== "string" || req.body.nomSoft.trim().length === 0) {
            return res.status(400).json({
                message: "Invalid soft name format"
            });
        }

        // Check if soft with new name already exists
        const softWithNameExists = await Soft.findOne({
            nomSoft: req.body.nomSoft
        });
        if (softWithNameExists && softWithNameExists.id.toString() !== req.params.id) {
            return res.status(409).json({
                message: "Soft with name " + req.body.nomSoft + " already exists"
            });
        }

        // Find soft and update it with the request body
        const soft = await Soft.findByIdAndUpdate(req.params.id, {
            nomSoft: req.body.nomSoft
        }, {
            new: true
        });
        if (!soft) {
            return res.status(404).json({
                message: "Soft not found with id" + req.params.id
            });
        }
        res.json(soft);
    } 
    catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: err.message
            });
        } 
        else if (err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "Soft not found with id " + req.params.id
            });
        }
        return res.status(500).json({
            message: "Error updating soft with id " + req.params.id
        });
    }
};


// DELETE
const deleteSoft = async (req, res) => {
    try {
        const soft = await Soft.findByIdAndRemove(req.params.id);
        if (!soft) {
            return res.status(404).json({
                message: "Soft not found with id " + req.params.id
            });
        }
        res.json({
            message: "Soft deleted successfully!"
        });
    } 
    catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                message: "Soft not found with id " + req.params.id
            });
        }
        return res.status(500).json({
            message: "Could not delete soft with id " + req.params.id
        });
    }
};


module.exports = {
  createSoft,
  getSofts,
  getSoftById,
  updateSoft,
  deleteSoft
};