const express = require('express');
const ExerciseController = require('../controllers/ExerciseController');
const auth = require('../middleware/auth');

const router = express.Router();

// Traer lista de metas
router.get('/lista', auth, ExerciseController.getEjercicios);

module.exports = router;