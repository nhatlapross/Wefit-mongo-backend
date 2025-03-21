const User = require('../models/User');
const WorkoutPlan = require('../models/WorkoutPlan');
const WorkoutSession = require('../models/WorkoutSession');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../utils/validation');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { email, password, name, age, gender, fitnessLevel, fitnessGoals } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create new user
    const user = new User({
      email,
      password, // Will be hashed by pre-save hook
      name,
      age,
      gender,
      fitnessLevel,
      fitnessGoals
    });

    // Save user to database
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user info and token (excluding password)
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user info and token (excluding password)
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      message: 'Login successful',
      user: userResponse,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Check if user has access to this profile
    if (req.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Check if user has access to update this profile
    if (req.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const updates = req.body;
    
    // Don't allow password update through this endpoint
    if (updates.password) {
      delete updates.password;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Error updating user profile' });
  }
};

// Get user workout plans
exports.getUserWorkoutPlans = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Check if user has access to this data
    if (req.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const workoutPlans = await WorkoutPlan.find({ userId });

    res.status(200).json(workoutPlans);
  } catch (error) {
    console.error('Error fetching workout plans:', error);
    res.status(500).json({ message: 'Error fetching workout plans' });
  }
};

// Get user workout history
exports.getUserWorkoutHistory = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Check if user has access to this data
    if (req.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    // Get query parameters for filtering
    const { start, end, limit } = req.query;
    const queryFilter = { userId };
    
    // Add date filters if provided
    if (start) {
      queryFilter.startTime = { $gte: new Date(start) };
    }
    if (end) {
      queryFilter.startTime = { ...queryFilter.startTime, $lte: new Date(end) };
    }

    // Set up pagination
    const pageLimit = limit ? parseInt(limit) : 20;
    
    const workoutSessions = await WorkoutSession.find(queryFilter)
      .sort({ startTime: -1 })
      .limit(pageLimit);

    res.status(200).json(workoutSessions);
  } catch (error) {
    console.error('Error fetching workout history:', error);
    res.status(500).json({ message: 'Error fetching workout history' });
  }
};