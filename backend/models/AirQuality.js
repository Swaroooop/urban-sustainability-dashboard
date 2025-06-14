const mongoose = require('mongoose');

const airQualitySchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  aqi: {
    type: Number,
    required: true
  },
  pm25: {
    type: Number,
    required: true
  },
  pm10: {
    type: Number,
    required: true
  },
  o3: {
    type: Number,
    required: true
  },
  no2: {
    type: Number,
    required: true
  },
  so2: {
    type: Number,
    required: true
  },
  co: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  source: {
    type: String,
    enum: ['sensor', 'api', 'user_report'],
    required: true
  }
});

// Create geospatial index
airQualitySchema.index({ location: '2dsphere' });

module.exports = mongoose.model('AirQuality', airQualitySchema); 