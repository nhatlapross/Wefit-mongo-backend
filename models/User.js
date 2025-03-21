const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer not to say']
  },
  height: {
    type: Number
  },
  weight: {
    type: Number
  },
  fitnessLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  fitnessGoals: [{
    type: String
  }],
  healthLimitations: {
    type: String
  },
  preferences: {
    likes: String,
    dislikes: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;