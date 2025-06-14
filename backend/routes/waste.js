const express = require('express');
const router = express.Router();
const Waste = require('../models/Waste');

// Get all waste data
router.get('/', async (req, res) => {
  try {
    const wasteData = await Waste.find();
    res.json(wasteData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get waste data by location
router.get('/:location', async (req, res) => {
  try {
    const wasteData = await Waste.find({ location: req.params.location });
    if (wasteData.length === 0) {
      return res.status(404).json({ message: 'No waste data found for this location' });
    }
    res.json(wasteData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new waste data
router.post('/', async (req, res) => {
  const wasteData = new Waste({
    location: req.body.location,
    amount: req.body.amount,
    type: req.body.type,
    timestamp: req.body.timestamp || new Date()
  });

  try {
    const newWasteData = await wasteData.save();
    res.status(201).json(newWasteData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 