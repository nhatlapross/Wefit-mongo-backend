const WorkoutPlan = require('../models/WorkoutPlan');
const User = require('../models/User');
const { aiWorkoutPlanValidation } = require('../utils/validation');


exports.generateWorkoutPlan = async (req, res) => {
    const { error } = aiWorkoutPlanValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const {
            userId,
            fitnessGoals,
            fitnessLevel,
            availability,
            equipment,
            limitations,
            preferences
        } = req.body;

        // Validate user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if user is authorized
        if (req.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        // In a real app, you'd call an AI service here
        // For demonstration, we'll generate a simple plan

        // Create plan name
        const planName = `${fitnessLevel.charAt(0).toUpperCase() + fitnessLevel.slice(1)} ${fitnessGoals[0]} Plan`;

        // Generate workouts based on availability
        const workouts = [];
        const focusAreas = ['Upper Body', 'Lower Body', 'Core', 'Cardio', 'Full Body', 'Recovery'];

        for (let day = 1; day <= availability.daysPerWeek; day++) {
            // Assign focus areas in rotation
            const focusArea = focusAreas[(day - 1) % focusAreas.length];

            workouts.push({
                day,
                focus: focusArea,
                duration: `${availability.timePerWorkout} minutes`,
                exercises: generateExercisesForFocus(focusArea, fitnessLevel, equipment)
            });
        }

        // Create the workout plan
        const workoutPlan = new WorkoutPlan({
            userId,
            planName,
            duration: '8 weeks',
            daysPerWeek: availability.daysPerWeek,
            focusAreas: fitnessGoals,
            workouts
        });

        // Save to database
        await workoutPlan.save();

        res.status(201).json(workoutPlan);
    } catch (error) {
        console.error('Error generating workout plan:', error);
        res.status(500).json({ message: 'Error generating workout plan' });
    }
};

// Helper function to generate exercises
function generateExercisesForFocus(focusArea, level, equipment) {
    // Define exercise libraries based on focus areas
    const exercisesByFocus = {
        'Upper Body': [
            { name: 'Push-ups', sets: 3, reps: level === 'beginner' ? '8-10' : '12-15', rest: '60 sec' },
            { name: 'Dumbbell Rows', sets: 3, reps: '10-12', rest: '60 sec' },
            { name: 'Shoulder Press', sets: 3, reps: '10-12', rest: '60 sec' },
            { name: 'Tricep Dips', sets: 3, reps: '10-12', rest: '60 sec' }
        ],
        'Lower Body': [
            { name: 'Bodyweight Squats', sets: 3, reps: '12-15', rest: '60 sec' },
            { name: 'Lunges', sets: 3, reps: '10 each leg', rest: '60 sec' },
            { name: 'Glute Bridges', sets: 3, reps: '15-20', rest: '45 sec' },
            { name: 'Calf Raises', sets: 3, reps: '15-20', rest: '45 sec' }
        ],
        'Core': [
            { name: 'Plank', sets: 3, reps: '30-60 sec hold', rest: '45 sec' },
            { name: 'Russian Twists', sets: 3, reps: '15 each side', rest: '45 sec' },
            { name: 'Bicycle Crunches', sets: 3, reps: '15-20 each side', rest: '45 sec' },
            { name: 'Mountain Climbers', sets: 3, reps: '20 each leg', rest: '45 sec' }
        ],
        'Cardio': [
            { name: 'Jumping Jacks', sets: 1, reps: '3 min', rest: '60 sec' },
            { name: 'High Knees', sets: 3, reps: '30 sec', rest: '30 sec' },
            { name: 'Burpees', sets: 3, reps: '10-15', rest: '60 sec' },
            { name: 'Jump Rope', sets: 1, reps: '3-5 min', rest: 'N/A' }
        ],
        'Full Body': [
            { name: 'Burpees', sets: 3, reps: '10-15', rest: '60 sec' },
            { name: 'Mountain Climbers', sets: 3, reps: '20 each leg', rest: '45 sec' },
            { name: 'Kettlebell Swings', sets: 3, reps: '15-20', rest: '60 sec' },
            { name: 'Squat to Press', sets: 3, reps: '12-15', rest: '60 sec' }
        ],
        'Recovery': [
            { name: 'Foam Rolling', sets: 1, reps: '5-10 min', rest: 'N/A' },
            { name: 'Static Stretching', sets: 1, reps: '10-15 min', rest: 'N/A' },
            { name: 'Light Walking', sets: 1, reps: '15-20 min', rest: 'N/A' },
            { name: 'Deep Breathing', sets: 1, reps: '3-5 min', rest: 'N/A' }
        ]
    };

    // Return exercises based on focus area or default to full body
    return exercisesByFocus[focusArea] || exercisesByFocus['Full Body'];
}