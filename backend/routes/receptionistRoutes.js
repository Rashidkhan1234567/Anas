const express = require('express');
const router = express.Router();
const {
  registerPatient,
  updatePatientInfo,
  bookAppointment,
  updateAppointmentStatus,
  cancelAppointment,
  getDailySchedule
} = require('../controllers/receptionistController');
const { protect } = require('../middlewares/authMiddleware');
const { roleCheck } = require('../middlewares/roleMiddleware');

router.use(protect);
router.use(roleCheck('Receptionist'));

// Patient management
router.post('/patients', registerPatient);
router.put('/patients/:id', updatePatientInfo);

// Appointment management
router.post('/appointments', bookAppointment);
router.put('/appointments/:id/status', updateAppointmentStatus);
router.delete('/appointments/:id', cancelAppointment);

// Schedule viewing
router.get('/schedule', getDailySchedule);

module.exports = router;
