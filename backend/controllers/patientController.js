const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Prescription = require('../models/Prescription');
const User = require('../models/User');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// @desc    Get patient profile
// @route   GET /api/patient/profile
// @access  Private/Patient
const getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.user.id });
    if (!patient) {
        return res.status(404).json({ message: 'Patient profile not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update limited profile fields
// @route   PUT /api/patient/profile
// @access  Private/Patient
const updatePatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.user.id });
    if (!patient) {
        return res.status(404).json({ message: 'Patient profile not found' });
    }

    const { contact } = req.body; // Can limit what they can update, e.g., only contact info

    if (contact) patient.contact = contact;

    await patient.save();
    
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get appointment history
// @route   GET /api/patient/appointments
// @access  Private/Patient
const getAppointmentHistory = async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.user.id });
    if (!patient) {
        return res.status(404).json({ message: 'Patient profile not found' });
    }

    const appointments = await Appointment.find({ patientId: patient._id })
        .populate('doctorId', 'name')
        .sort({ date: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get prescriptions
// @route   GET /api/patient/prescriptions
// @access  Private/Patient
const getPrescriptions = async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.user.id });
    if (!patient) {
        return res.status(404).json({ message: 'Patient profile not found' });
    }

    const prescriptions = await Prescription.find({ patientId: patient._id })
        .populate('doctorId', 'name')
        .sort({ createdAt: -1 });

    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Download prescription PDF
// @route   GET /api/patient/prescriptions/:id/download
// @access  Private/Patient
const downloadPrescriptionPDF = async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.user.id });
    if (!patient) {
        return res.status(404).json({ message: 'Patient profile not found' });
    }

    const prescription = await Prescription.findOne({
        _id: req.params.id,
        patientId: patient._id
    }).populate('doctorId', 'name');

    if (!prescription) {
        return res.status(404).json({ message: 'Prescription not found or unauthorized' });
    }

    // Generate PDF
    const doc = new PDFDocument();
    const filename = `prescription-${prescription._id}.pdf`;
    
    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res);

    // Title
    doc.fontSize(20).text('Medical Prescription', { align: 'center' });
    doc.moveDown();

    // Doctor & Patient Info
    doc.fontSize(12).text(`Doctor: ${prescription.doctorId.name}`);
    doc.text(`Date: ${new Date(prescription.createdAt).toLocaleDateString()}`);
    doc.moveDown();
    doc.text(`Patient: ${patient.name}`);
    doc.text(`Age: ${patient.age} | Gender: ${patient.gender}`);
    doc.moveDown();

    // Medicines
    doc.fontSize(14).text('Medicines:', { underline: true });
    doc.moveDown(0.5);
    
    prescription.medicines.forEach((med, index) => {
        doc.fontSize(12).text(`${index + 1}. ${med.name} - Dosage: ${med.dosage} ${med.duration ? `(${med.duration})` : ''}`);
    });

    doc.moveDown();
    
    // Instructions
    doc.fontSize(14).text('Instructions:', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(prescription.instructions);

    doc.end();

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPatientProfile,
  updatePatientProfile,
  getAppointmentHistory,
  getPrescriptions,
  downloadPrescriptionPDF
};
