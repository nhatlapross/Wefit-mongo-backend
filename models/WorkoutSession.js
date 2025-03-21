const mongoose = require('mongoose');

const exerciseLogSchema = new mongoose.Schema({
  exerciseId: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  sets: [{
    weight: Number,
    reps: Number,
    completed: {
      type: Boolean,
      default: true
    }
  }],
  notes: {
    type: String
  }
});

const workoutSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  workoutPlanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkoutPlan'
  },
  day: {
    type: Number
  },
  focus: {
    type: String
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date
  },
  duration: {
    type: Number // in minutes
  },
  exercises: [exerciseLogSchema],
  notes: {
    type: String
  },
  rating: {
    type: Number, // 1-5 scale
    min: 1,
    max: 5
  }
}, { timestamps: true });

const WorkoutSession = mongoose.model('WorkoutSession', workoutSessionSchema);

module.exports = WorkoutSession;