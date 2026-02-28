const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const DiagnosisLog = require('../models/DiagnosisLog');
const Prescription = require('../models/Prescription');

// @desc    Get all assigned appointments for the doctor
// @route   GET /api/doctor/appointments
// @access  Private/Doctor
const getAssignedAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.user.id })
      .populate('patientId', 'name age gender contact')
      .sort({ date: 1 });
      
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get detailed patient medical history timeline
// @route   GET /api/doctor/patients/:id/history
// @access  Private/Doctor
const getPatientHistoryTimeline = async (req, res) => {
  try {
    const patientId = req.params.id;
    
    // Check if patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
    }

    // Fetch all records related to this patient
    const appointments = await Appointment.find({ patientId }).sort({ date: -1 });
    const diagnosisLogs = await DiagnosisLog.find({ patientId }).sort({ createdAt: -1 });
    const prescriptions = await Prescription.find({ patientId }).sort({ createdAt: -1 });

    res.json({
        patient,
        timeline: {
            appointments,
            diagnosisLogs,
            prescriptions
        }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a diagnosis for a patient
// @route   POST /api/doctor/patients/:id/diagnosis
// @access  Private/Doctor
const addDiagnosis = async (req, res) => {
  try {
    const { symptoms, riskLevel, notes, aiResponse } = req.body;
    const patientId = req.params.id;

    const diagnosisLog = await DiagnosisLog.create({
        patientId,
        doctorId: req.user.id,
        symptoms,
        riskLevel,
        aiResponse,
        notes // Added notes field per requirements
    });

    res.status(201).json(diagnosisLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a prescription for a patient
// @route   POST /api/doctor/patients/:id/prescription
// @access  Private/Doctor
const createPrescription = async (req, res) => {
  try {
    const { medicines, instructions } = req.body;
    const patientId = req.params.id;

    if (!medicines || medicines.length === 0) {
        return res.status(400).json({ message: 'Medicines cannot be empty' });
    }

    const prescription = await Prescription.create({
        patientId,
        doctorId: req.user.id,
        medicines,
        instructions
    });

    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAssignedAppointments,
  getPatientHistoryTimeline,
  addDiagnosis,
  createPrescription
};
