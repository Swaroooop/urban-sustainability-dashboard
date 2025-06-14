import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import axios from 'axios';

const Energy = () => {
  const [energyData, setEnergyData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data for demonstration
        const mockEnergyData = {
          totalConsumption: 1250,
          renewablePercentage: 35,
          peakHours: 3,
          timestamp: new Date().toISOString(),
          sources: [
            { name: 'Solar', value: 30 },
            { name: 'Wind', value: 25 },
            { name: 'Hydro', value: 15 },
            { name: 'Non-Renewable', value: 30 },
          ],
        };

        const mockHistoricalData = Array.from({ length: 24 }, (_, i) => ({
          time: `${i}:00`,
          consumption: Math.floor(Math.random() * 1000) + 500,
          renewable: Math.floor(Math.random() * 50),
        }));

        setEnergyData(mockEnergyData);
        setHistoricalData(mockHistoricalData);
      } catch (err) {
        setError('Error fetching energy data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Energy Monitoring
      </Typography>

      <Grid container spacing={3}>
        {/* Current Energy Status */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Energy Status
              </Typography>
              {energyData && (
                <>
                  <Typography variant="h3" color="primary">
                    {energyData.totalConsumption} kW
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Total Consumption
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Last updated: {new Date(energyData.timestamp).toLocaleString()}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Energy Metrics */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {energyData && [
              { label: 'Renewable Energy', value: energyData.renewablePercentage, unit: '%' },
              { label: 'Peak Hours', value: energyData.peakHours, unit: 'hours' },
            ].map((metric) => (
              <Grid item xs={6} key={metric.label}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {metric.label}
                  </Typography>
                  <Typography variant="h6">
                    {metric.value} {metric.unit}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Energy Source Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Energy Source Distribution
            </Typography>
            <ResponsiveContainer width={600} height={300}>
              <PieChart>
                <Pie
                  data={energyData?.sources}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {energyData?.sources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Historical Data Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Energy Consumption Trend (24 Hours)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="consumption"
                  stroke="#1976d2"
                  name="Consumption (kW)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="renewable"
                  stroke="#2e7d32"
                  name="Renewable %"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Energy Saving Tips */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Energy Saving Tips
            </Typography>
            <Grid container spacing={2}>
              {[
                'Turn off lights when not in use',
                'Use energy-efficient appliances',
                'Set thermostat to optimal temperature',
                'Unplug devices when not in use',
                'Use natural light during daytime',
                'Regular maintenance of HVAC systems',
              ].map((tip, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography variant="body2">{tip}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Energy; 