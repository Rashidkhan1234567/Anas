const express = require('express');
const router = express.Router();
const {
  getPatientProfile,
  updatePatientProfile,
  getAppointmentHistory,
  getPrescriptions,
  downloadPrescriptionPDF,
  bookAppointment,
  getAvailableDoctors
} = require('../controllers/patientController');
const { protect } = require('../middlewares/authMiddleware');
const { roleCheck } = require('../middlewares/roleMiddleware');

router.use(protect);
router.use(roleCheck('Patient'));

router.route('/profile')
  .get(getPatientProfile)
  .put(updatePatientProfile);

router.route('/appointments')
  .get(getAppointmentHistory)
  .post(bookAppointment);

router.get('/doctors', getAvailableDoctors);
router.get('/prescriptions', getPrescriptions);
router.get('/prescriptions/:id/download', downloadPrescriptionPDF);

module.exports = router;
