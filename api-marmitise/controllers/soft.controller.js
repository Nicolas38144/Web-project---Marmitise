const Soft = require('../models/soft.model');

// CREATE
const createSoft = async (req, res) => {
  try {
    const soft = new Soft(req.body);
    await soft.save();
    res.status(201).json({ success: true, data: soft });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};


// READ ALL
const getSofts = async (req, res) => {
  try {
    const softs = await Soft.find();
    res.json({ success: true, data: softs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


// READ ONE
const getSoftById = async (req, res) => {
  try {
    const soft = await Soft.findById(req.params.id);
    if (!soft) throw new Error('Soft not found');
    res.json({ success: true, data: soft });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};


// UPDATE
const updateSoft = async (req, res) => {
  try {
    const soft = await Soft.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!soft) throw new Error('Soft not found');
    res.json({ success: true, data: soft });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};


// DELETE
const deleteSoft = async (req, res) => {
  try {
    const soft = await Soft.findByIdAndDelete(req.params.id);
    if (!soft) throw new Error('Soft not found');
    res.json({ success: true, data: soft });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};


module.exports = {
  createSoft,
  getSofts,
  getSoftById,
  updateSoft,
  deleteSoft,
};