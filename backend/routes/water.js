const express = require('express');
const router = express.Router();
const Water = require('../models/Water');

// Get all water data
router.get('/', async (req, res) => {
  try {
    const waterData = await Water.find();
    res.json(waterData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get water data by location
router.get('/:location', async (req, res) => {
  try {
    const waterData = await Water.find({ location: req.params.location });
    if (waterData.length === 0) {
      return res.status(404).json({ message: 'No water data found for this location' });
    }
    res.json(waterData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new water data
router.post('/', async (req, res) => {
  const waterData = new Water({
    location: req.body.location,
    consumption: req.body.consumption,
    quality: req.body.quality,
    timestamp: req.body.timestamp || new Date()
  });

  try {
    const newWaterData = await waterData.save();
    res.status(201).json(newWaterData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 