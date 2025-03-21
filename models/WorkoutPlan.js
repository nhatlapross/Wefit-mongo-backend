const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sets: {
    type: Number,
    required: true
  },
  reps: {
    type: String,
    required: true
  },
  rest: {
    type: String
  },
  notes: {
    type: String
  }
});

const workoutSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true
  },
  focus: {
    type: String,
    required: true
  },
  duration: {
    type: String
  },
  exercises: [exerciseSchema]
});

const workoutPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  planName: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  daysPerWeek: {
    type: Number,
    required: true
  },
  focusAreas: [{
    type: String
  }],
  workouts: [workoutSchema],
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);

module.exports = WorkoutPlan;