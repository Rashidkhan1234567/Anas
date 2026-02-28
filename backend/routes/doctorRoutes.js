const express = require('express');
const router = express.Router();
const { 
  getAssignedAppointments, 
  getPatientHistoryTimeline, 
  addDiagnosis, 
  createPrescription,
  getDoctorProfile
} = require('../controllers/doctorController');
const { protect } = require('../middlewares/authMiddleware');
const { roleCheck } = require('../middlewares/roleMiddleware');

router.use(protect);
router.use(roleCheck('Doctor'));

// View profile
router.get('/profile', getDoctorProfile);

// View assigned appointments
router.get('/appointments', getAssignedAppointments);

// Patient specific routes
router.get('/patients/:id/history', getPatientHistoryTimeline);
router.post('/patients/:id/diagnosis', addDiagnosis);
router.post('/patients/:id/prescription', createPrescription);

module.exports = router;
