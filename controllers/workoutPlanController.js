const WorkoutPlan = require('../models/WorkoutPlan');
const { workoutPlanValidation } = require('../utils/validation');

// Create a new workout plan
exports.createWorkoutPlan = async (req, res) => {
    try {
        const { error } = workoutPlanValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { userId, planName, duration, daysPerWeek, focusAreas, workouts } = req.body;

        // Check if user is authorized
        if (req.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        // Create new workout plan
        const workoutPlan = new WorkoutPlan({
            userId,
            planName,
            duration,
            daysPerWeek,
            focusAreas,
            workouts
        });

        // Save to database
        await workoutPlan.save();

        res.status(201).json({
            message: 'Workout plan created successfully',
            workoutPlan
        });
    } catch (error) {
        console.error('Error creating workout plan:', error);
        res.status(500).json({ message: 'Error creating workout plan' });
    }
};

// Get a workout plan by ID
exports.getWorkoutPlan = async (req, res) => {
    try {
        const planId = req.params.id;

        const workoutPlan = await WorkoutPlan.findById(planId);

        if (!workoutPlan) {
            return res.status(404).json({ message: 'Workout plan not found' });
        }

        // Check if user is authorized to access this plan
        if (req.userId !== workoutPlan.userId.toString()) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        res.status(200).json(workoutPlan);
    } catch (error) {
        console.error('Error fetching workout plan:', error);
        res.status(500).json({ message: 'Error fetching workout plan' });
    }
};

// Update a workout plan
exports.updateWorkoutPlan = async (req, res) => {
    try {
        const { error } = workoutPlanValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const planId = req.params.id;
        const updates = req.body;

        // Find the plan first to check authorization
        const workoutPlan = await WorkoutPlan.findById(planId);

        if (!workoutPlan) {
            return res.status(404).json({ message: 'Workout plan not found' });
        }

        // Check if user is authorized to update this plan
        if (req.userId !== workoutPlan.userId.toString()) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        // Update the plan
        Object.keys(updates).forEach(key => {
            workoutPlan[key] = updates[key];
        });

        await workoutPlan.save();

        res.status(200).json({
            message: 'Workout plan updated successfully',
            workoutPlan
        });
    } catch (error) {
        console.error('Error updating workout plan:', error);
        res.status(500).json({ message: 'Error updating workout plan' });
    }
};

// Delete a workout plan
exports.deleteWorkoutPlan = async (req, res) => {
    try {
        const planId = req.params.id;

        // Find the plan first to check authorization
        const workoutPlan = await WorkoutPlan.findById(planId);

        if (!workoutPlan) {
            return res.status(404).json({ message: 'Workout plan not found' });
        }

        // Check if user is authorized to delete this plan
        if (req.userId !== workoutPlan.userId.toString()) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        await WorkoutPlan.findByIdAndDelete(planId);

        res.status(200).json({
            message: 'Workout plan deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting workout plan:', error);
        res.status(500).json({ message: 'Error deleting workout plan' });
    }
};