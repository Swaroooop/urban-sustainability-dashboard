const mongoose = require('mongoose');

const waterSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  consumption: {
    type: Number,
    required: true,
    min: 0
  },
  quality: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Water', waterSchema); 