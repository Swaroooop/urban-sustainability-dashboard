const express = require('express');
const router = express.Router();
const Traffic = require('../models/Traffic');

// Get all traffic data
router.get('/', async (req, res) => {
  try {
    const trafficData = await Traffic.find();
    res.json(trafficData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get traffic data by location
router.get('/:location', async (req, res) => {
  try {
    const trafficData = await Traffic.find({ location: req.params.location });
    if (trafficData.length === 0) {
      return res.status(404).json({ message: 'No traffic data found for this location' });
    }
    res.json(trafficData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new traffic data
router.post('/', async (req, res) => {
  const trafficData = new Traffic({
    location: req.body.location,
    congestionLevel: req.body.congestionLevel,
    vehicleCount: req.body.vehicleCount,
    timestamp: req.body.timestamp || new Date()
  });

  try {
    const newTrafficData = await trafficData.save();
    res.status(201).json(newTrafficData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 