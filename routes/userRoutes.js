const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Protected routes
router.get('/:id', auth, userController.getUserProfile);
router.put('/:id', auth, userController.updateUserProfile);
router.get('/:id/workout-plans', auth, userController.getUserWorkoutPlans);
router.get('/:id/workout-history', auth, userController.getUserWorkoutHistory);

module.exports = router;