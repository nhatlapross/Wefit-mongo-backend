const WorkoutSession = require('../models/WorkoutSession');
const WorkoutPlan = require('../models/WorkoutPlan');

// Log a workout session
exports.logWorkoutSession = async (req, res) => {
  try {
    const { 
      userId, 
      workoutPlanId, 
      day, 
      focus, 
      startTime, 
      endTime, 
      duration, 
      exercises, 
      notes, 
      rating 
    } = req.body;
    
    // Check if user is authorized
    if (req.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    
    // Create new workout session
    const workoutSession = new WorkoutSession({
      userId,
      workoutPlanId,
      day,
      focus,
      startTime,
      endTime,
      duration,
      exercises,
      notes,
      rating
    });
    
    // Save to database
    await workoutSession.save();
    
    res.status(201).json({
      message: 'Workout session logged successfully',
      workoutSession
    });
  } catch (error) {
    console.error('Error logging workout session:', error);
    res.status(500).json({ message: 'Error logging workout session' });
  }
};

// Get a workout session by ID
exports.getWorkoutSession = async (req, res) => {
  try {
    const sessionId = req.params.id;
    
    const workoutSession = await WorkoutSession.findById(sessionId);
    
    if (!workoutSession) {
      return res.status(404).json({ message: 'Workout session not found' });
    }
    
    // Check if user is authorized to access this session
    if (req.userId !== workoutSession.userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    
    res.status(200).json(workoutSession);
  } catch (error) {
    console.error('Error fetching workout session:', error);
    res.status(500).json({ message: 'Error fetching workout session' });
  }
};

// Update a workout session
exports.updateWorkoutSession = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const updates = req.body;
    
    // Find the session first to check authorization
    const workoutSession = await WorkoutSession.findById(sessionId);
    
    if (!workoutSession) {
      return res.status(404).json({ message: 'Workout session not found' });
    }
    
    // Check if user is authorized to update this session
    if (req.userId !== workoutSession.userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    
    // Update the session
    Object.keys(updates).forEach(key => {
      workoutSession[key] = updates[key];
    });
    
    await workoutSession.save();
    
    res.status(200).json({
      message: 'Workout session updated successfully',
      workoutSession
    });
  } catch (error) {
    console.error('Error updating workout session:', error);
    res.status(500).json({ message: 'Error updating workout session' });
  }
};