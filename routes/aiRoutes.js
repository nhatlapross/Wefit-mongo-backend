const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const auth = require('../middleware/auth');

router.post('/generate-workout-plan', auth, aiController.generateWorkoutPlan);

module.exports = router;