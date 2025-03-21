const express = require('express');
const router = express.Router();
const workoutSessionController = require('../controllers/workoutSessionController');
const auth = require('../middleware/auth');

router.post('/', auth, workoutSessionController.logWorkoutSession);
router.get('/:id', auth, workoutSessionController.getWorkoutSession);
router.put('/:id', auth, workoutSessionController.updateWorkoutSession);

module.exports = router;