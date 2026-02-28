const express = require('express');
const router = express.Router();
const { diagnoseSymptoms, explainPrescription } = require('../controllers/aiController');
const { protect } = require('../middlewares/authMiddleware');
const { roleCheck } = require('../middlewares/roleMiddleware');

router.use(protect);

// Smart Symptom Checker
router.post('/diagnose', roleCheck('Doctor'), diagnoseSymptoms);

// Prescription Explanation
router.post('/explain', roleCheck('Patient'), explainPrescription);

module.exports = router;
