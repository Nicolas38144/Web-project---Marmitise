const Bar = require('../models/bar.model');

// CREATE
const createBar = async (req, res) => {
    try {
        if (!req.body.nom || !req.body.localisation) {
            return res.status(400).send({ message: 'Bar name and localisation can not be empty' });
        }

        const existingBar = await Bar.findOne({ nom: req.body.nom, localisation : req.body.localisation });
        if (existingBar) {
            return res.status(409).send({ 
                message: 'A bar with this name and location already exists' 
            });
        }

        const bar = new Bar({
            nom: req.body.nom,
            localisation: req.body.localisation,
            cocktails: req.body.cocktails
        });

        await bar.save();
        res.send({
            message: 'Bar added successfully'
        });
    } 
    catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Bar."
        });
    }
};

// READ ALL
const getBars = async (req, res) => {
    try {
        const bars = await Bar.find(req.params.id);
        res.json(bars);
    } 
    catch (err) {
        res.status(500).json({ 
            message: err.message || "Some error occurred while retrieving bars."
        });
    }
};

// READ ONE
const getBarById = async (req, res) => {
    try {
        const bar = await Bar.findById(req.params.id);
        if (!bar) {
            return res.status(404).json({ 
                message: 'Bar not found' 
            });
        }
        res.json(bar);
    } 
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Bar not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving bar with id " + req.params.id
        });
    }
};

// UPDATE
const updateBar = async (req, res) => {
    try {

        if (!req.body.nom || !req.body.localisation) {
            return res.status(400).send({ message: 'Bar name and location can not be empty' });
        }

        const existingBar = await Bar.findOne({ nom: req.body.nom, localisation : req.body.localisation });
        if (existingBar && (existingBar.id.toString() !== req.params.id)) {
            return res.status(409).send({ 
                message: 'A bar with this name and location already exists' 
            });
        }

        const bar = await Bar.findById(req.params.id);
        if (!bar) {
            return res.status(404).send({ message: 'Bar not found' });
        }
    
        bar.nom = req.body.nom;
        bar.localisation = req.body.localisation;
        bar.cocktails = req.body.cocktails;

        const updatedBar = await bar.save();
        res.send({ 
            message: 'Bar mis à jour avec succès', bar: updatedBar
        });
    } 
    catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// DELETE
const deleteBar = async (req, res) => {
    try {
        const bar = await Bar.findByIdAndRemove(req.params.id);
        if (!bar) {
            return res.status(404).send({ 
                message: 'Bar not found with id ' + req.params.id
            });
        }
        res.send({
            message: "Bar deleted successfully!"
        });
    } 
    catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Bar not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete bar with id " + req.params.id
        });
    }
};

module.exports = {
    createBar,
    getBars,
    getBarById,
    updateBar,
    deleteBar
};