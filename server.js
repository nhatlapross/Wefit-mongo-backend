const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const workoutPlanRoutes = require('./routes/workoutPlanRoutes');
const workoutSessionRoutes = require('./routes/workoutSessionRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Key middleware
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: 'Invalid API key' });
  }
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/workout-plans', workoutPlanRoutes);
app.use('/api/workout-sessions', workoutSessionRoutes);
app.use('/api/ai', aiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An internal server error occurred' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});