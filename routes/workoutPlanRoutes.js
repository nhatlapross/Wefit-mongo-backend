const express = require('express');
const router = express.Router();
const workoutPlanController = require('../controllers/workoutPlanController');
const auth = require('../middleware/auth');

router.post('/', auth, workoutPlanController.createWorkoutPlan);
router.get('/:id', auth, workoutPlanController.getWorkoutPlan);
router.put('/:id', auth, workoutPlanController.updateWorkoutPlan);
router.delete('/:id', auth, workoutPlanController.deleteWorkoutPlan);

module.exports = router;