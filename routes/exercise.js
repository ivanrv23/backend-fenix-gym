const express = require('express');
const exerciseController = require('../controllers/exerciseController');
const auth = require('../middleware/auth');

const router = express.Router();

// Traer lista de metas
router.get('/lista', auth, exerciseController.getEjercicios);

module.exports = router;