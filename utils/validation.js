const Joi = require('joi');

// User Registration Validation
exports.registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).required(),
    age: Joi.number().integer().min(13).max(100),
    gender: Joi.string().valid('male', 'female', 'other', 'prefer not to say'),
    fitnessLevel: Joi.string().valid('beginner', 'intermediate', 'advanced'),
    fitnessGoals: Joi.array().items(Joi.string()),
    healthLimitations: Joi.string(),
    preferences: Joi.object({
      likes: Joi.string(),
      dislikes: Joi.string()
    })
  });
  
  return schema.validate(data);
};

// Login Validation
exports.loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });
  
  return schema.validate(data);
};

// Workout Plan Validation
exports.workoutPlanValidation = (data) => {
  const exerciseSchema = Joi.object({
    name: Joi.string().required(),
    sets: Joi.number().required(),
    reps: Joi.string().required(),
    rest: Joi.string(),
    notes: Joi.string()
  });

  const workoutSchema = Joi.object({
    day: Joi.number().required(),
    focus: Joi.string().required(),
    duration: Joi.string(),
    exercises: Joi.array().items(exerciseSchema)
  });

  const schema = Joi.object({
    userId: Joi.string().required(),
    planName: Joi.string().required(),
    duration: Joi.string().required(),
    daysPerWeek: Joi.number().required(),
    focusAreas: Joi.array().items(Joi.string()),
    workouts: Joi.array().items(workoutSchema)
  });
  
  return schema.validate(data);
};

// AI Workout Plan Generation Validation
exports.aiWorkoutPlanValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    fitnessGoals: Joi.array().items(Joi.string()).required(),
    fitnessLevel: Joi.string().valid('beginner', 'intermediate', 'advanced').required(),
    availability: Joi.object({
      daysPerWeek: Joi.number().min(1).max(7).required(),
      timePerWorkout: Joi.number().min(10).max(180).required()
    }).required(),
    equipment: Joi.object({
      location: Joi.string().required(),
      available: Joi.array().items(Joi.string())
    }).required(),
    limitations: Joi.string().allow('', null),
    preferences: Joi.object({
      likes: Joi.string().allow('', null),
      dislikes: Joi.string().allow('', null)
    })
  });
  
  return schema.validate(data);
};