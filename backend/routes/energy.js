const express = require('express');
const router = express.Router();
const Energy = require('../models/Energy');

// Get all energy data
router.get('/', async (req, res) => {
  try {
    const energyData = await Energy.find();
    res.json(energyData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get energy data by location
router.get('/:location', async (req, res) => {
  try {
    const energyData = await Energy.find({ location: req.params.location });
    if (energyData.length === 0) {
      return res.status(404).json({ message: 'No energy data found for this location' });
    }
    res.json(energyData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new energy data
router.post('/', async (req, res) => {
  const energyData = new Energy({
    location: req.body.location,
    consumption: req.body.consumption,
    source: req.body.source,
    timestamp: req.body.timestamp || new Date()
  });

  try {
    const newEnergyData = await energyData.save();
    res.status(201).json(newEnergyData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 