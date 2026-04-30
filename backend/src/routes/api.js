// src/routes/api.js
// Routes are thin — they only map URLs to controller functions.
// No logic lives here.

const express = require('express');
const router  = express.Router();
const { getAllPhases, getPhaseById } = require('../controllers/phasesController');
const { getQuestions, submitQuiz }   = require('../controllers/quizController');

router.get('/phases',        getAllPhases);
router.get('/phases/:id',    getPhaseById);
router.get('/quiz',          getQuestions);
router.post('/quiz/submit',  submitQuiz);

// Health check — Kubernetes uses this to know if the pod is alive
router.get('/health', (req, res) =>
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
);

module.exports = router;
