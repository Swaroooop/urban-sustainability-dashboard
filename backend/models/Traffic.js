const mongoose = require('mongoose');

const trafficSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  congestionLevel: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  vehicleCount: {
    type: Number,
    required: true,
    min: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Traffic', trafficSchema); 