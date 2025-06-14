const jwt = require('jsonwebtoken');
const User = require('../models/User');
const axios = require('axios');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate.' });
  }
};

const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied.' });
    }
    next();
  };
};

const fetchAirQualityData = async (req, res) => {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const dateTo = now.toISOString();
    const dateFrom = thirtyDaysAgo.toISOString();

    let url = `https://api.openaq.org/v2/measurements?city=Bengaluru&parameter=pm25&date_from=${dateFrom}&date_to=${dateTo}&limit=1000&sort=desc&order_by=datetime`;
    let res = await axios.get(url);
    let results = res.data.results;

    // If no results, try 'Bangalore'
    if (results.length === 0) {
      url = `https://api.openaq.org/v2/measurements?city=Bangalore&parameter=pm25&date_from=${dateFrom}&date_to=${dateTo}&limit=1000&sort=desc&order_by=datetime`;
      res = await axios.get(url);
      results = res.data.results;
    }

    res.json({ results });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch air quality data from OpenAQ' });
  }
};

module.exports = { auth, checkRole, fetchAirQualityData }; 