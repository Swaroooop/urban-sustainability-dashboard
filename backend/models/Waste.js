const mongoose = require('mongoose');

const wasteSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  type: {
    type: String,
    required: true,
    enum: ['recyclable', 'organic', 'hazardous', 'general']
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Waste', wasteSchema); 