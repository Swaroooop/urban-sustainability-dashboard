const express = require('express');
const router = express.Router();
const AirQuality = require('../models/AirQuality');
const { auth, checkRole } = require('../middleware/auth');

// Get air quality data for a specific location
router.get('/location', async (req, res) => {
  try {
    const { lat, lng, radius = 5000 } = req.query;

    const airQualityData = await AirQuality.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(radius)
        }
      }
    }).sort({ timestamp: -1 }).limit(1);

    res.json(airQualityData[0] || null);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching air quality data' });
  }
});

// Get historical air quality data
router.get('/history', async (req, res) => {
  try {
    const { lat, lng, startDate, endDate } = req.query;

    const query = {
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: 5000
        }
      }
    };

    if (startDate && endDate) {
      query.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const airQualityData = await AirQuality.find(query)
      .sort({ timestamp: 1 });

    res.json(airQualityData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching historical data' });
  }
});

// Add new air quality data (protected route)
router.post('/', auth, checkRole(['government', 'business']), async (req, res) => {
  try {
    const airQualityData = new AirQuality(req.body);
    await airQualityData.save();
    res.status(201).json(airQualityData);
  } catch (error) {
    res.status(500).json({ message: 'Error adding air quality data' });
  }
});

// Get air quality statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await AirQuality.aggregate([
      {
        $group: {
          _id: null,
          avgAQI: { $avg: '$aqi' },
          maxAQI: { $max: '$aqi' },
          minAQI: { $min: '$aqi' },
          avgPM25: { $avg: '$pm25' },
          avgPM10: { $avg: '$pm10' }
        }
      }
    ]);

    res.json(stats[0] || {});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics' });
  }
});

module.exports = router; 