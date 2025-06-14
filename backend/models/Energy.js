const mongoose = require('mongoose');

const energySchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  consumption: {
    type: Number,
    required: true,
    min: 0
  },
  source: {
    type: String,
    required: true,
    enum: ['solar', 'wind', 'hydro', 'thermal', 'nuclear', 'fossil']
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Energy', energySchema); 