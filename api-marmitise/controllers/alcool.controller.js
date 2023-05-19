const Alcool = require('../models/alcool.model');

// CREATE
const createAlcool = async (req, res, next) => {
    try {

        if (!req.body.nom || !req.body.degre) {
            return res.status(400).json({
                message: "Alcool name and alcool degre can not be empty"
            });
        }

        const currentYear = new Date().getFullYear();
        if (req.body.date_fabrication < 1850 || req.body.date_fabrication > currentYear) {
            return res.status(400).json({
                message: "the year of manufacture of this alcohol is impossible"
            });
        }

        const newAlcool = new Alcool({
            nom: req.body.nom,
            degre: req.body.degre,
            precision: req.body.precision,
            date_fabrication: req.body.date_fabrication
        });

        await newAlcool.save();
        res.json({
            message: 'Alcool added successfully'
        });
    } 
    catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while creating the Alcool."
        });
    }
};


// READ ALL
const getAlcools = async (req, res) => {
    try {
        const alcools = await Alcool.find();
        res.json(alcools);
    } 
    catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving alcools."
        });
    }
};


// READ ONE
const getAlcoolById = async (req, res) => {
    try {
        const alcool = await Alcool.findById(req.params.id);
        if (!alcool) {
            return res.status(404).json({
                message: "Alcool not found with id " + req.params.id
            });
        }
        res.json(alcool);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "Alcool not found with id " + req.params.id
            });
        }
        return res.status(500).json({
            message: "Error retrieving alcool with id " + req.params.id
        });
    }
};


// UPDATE
const updateAlcool = async (req, res) => {
    try {
        const alcool = await Alcool.findById(req.params.id);
        if (!alcool) {
            return res.status(404).json({ message: 'Alcool not found' });
        }
    
        // Vérification et mise à jour du nom de l'alcool
        if (req.body.nom) {
            const existingAlcool = await Alcool.findOne({ nom: req.body.nom });
            if (existingAlcool && existingAlcool.id.toString() !== req.params.id) {
                return res.status(400).json({ message: 'This name is already used by another alcohol' });
            }
            alcool.nom = req.body.nom;
        }
    
        // Vérification et mise à jour du degré de l'alcool
        if (req.body.degre && req.body.degre > 0) {
            alcool.degre = req.body.degre;
        }
    
        // Mise à jour de la précision de l'alcool
        if (req.body.precision) {
            alcool.precision = req.body.precision;
        }
    
        // Vérification et mise à jour de la date de fabrication de l'alcool
        if (req.body.date_fabrication) {
            const currentYear = new Date().getFullYear();
            if (req.body.date_fabrication < 1850 || req.body.date_fabrication > currentYear) {
                return res.status(400).json({
                    message: "the year of manufacture of this alcohol is impossible"
                });
            }
            alcool.date_fabrication = req.body.date_fabrication;
        }
    
        // Enregistrement de l'alcool mis à jour
        const updatedAlcool = await alcool.save();
        res.json({ message: 'Alcool mis à jour avec succès', alcool: updatedAlcool });
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// DELETE
const deleteAlcool = async (req, res) => {
    try {
        const alcool = await Alcool.findByIdAndRemove(req.params.id);
        if (!alcool) {
            return res.status(404).json({
                message: "Alcool not found with id " + req.params.id
            });
        }
        res.json({
            message: "Alcool deleted successfully!"
        });
    } 
    catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                message: "Alcool not found with id " + req.params.id
            });
        }
        return res.status(500).json({
            message: "Could not delete alcool with id " + req.params.id
        });
    }
};


module.exports = {
  createAlcool,
  getAlcools,
  getAlcoolById,
  updateAlcool,
  deleteAlcool,
};