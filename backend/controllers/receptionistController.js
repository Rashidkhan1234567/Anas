const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

// @desc    Register a new patient
// @route   POST /api/receptionist/patients
// @access  Private/Receptionist
const registerPatient = async (req, res) => {
  try {
    const { name, age, gender, contact, email, password } = req.body;

    // First create a User account for the patient
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User with this email already exists' });
    }

    const user = await User.create({
        name,
        email,
        password,
        role: 'Patient'
    });

    // Then create the Patient profile
    const patient = await Patient.create({
        name,
        age,
        gender,
        contact,
        userId: user._id,
        createdBy: req.user.id
    });

    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update patient information
// @route   PUT /api/receptionist/patients/:id
// @access  Private/Receptionist
const updatePatientInfo = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
    }

    const { name, age, gender, contact } = req.body;

    if (name) patient.name = name;
    if (age) patient.age = age;
    if (gender) patient.gender = gender;
    if (contact) patient.contact = contact;

    await patient.save();

    // Optionally update the associated User name as well
    if (name) {
       await User.findByIdAndUpdate(patient.userId, { name });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Book an appointment
// @route   POST /api/receptionist/appointments
// @access  Private/Receptionist
const bookAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date } = req.body;

    // Basic validation
    if (!patientId || !doctorId || !date) {
        return res.status(400).json({ message: 'Please provide patientId, doctorId, and date' });
    }

    // Prevent duplicate bookings (same doctor, same time)
    // Simplify duplicate check: exact same time for the same doctor
    const existingAppointment = await Appointment.findOne({
        doctorId,
        date: new Date(date)
    });

    if (existingAppointment) {
        return res.status(400).json({ message: 'Doctor already has an appointment at this time' });
    }

    const appointment = await Appointment.create({
        patientId,
        doctorId,
        date,
        status: 'pending'
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update appointment status
// @route   PUT /api/receptionist/appointments/:id/status
// @access  Private/Receptionist
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    // Validate status
    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
         return res.status(400).json({ message: 'Invalid status' });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = status;
    await appointment.save();

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel an appointment
// @route   DELETE /api/receptionist/appointments/:id
// @access  Private/Receptionist
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.json({ message: 'Appointment cancelled successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    View daily schedule (appointments for a specific date)
// @route   GET /api/receptionist/schedule?date=YYYY-MM-DD
// @access  Private/Receptionist
const getDailySchedule = async (req, res) => {
  try {
    const dateQuery = req.query.date ? new Date(req.query.date) : new Date();
    
    // Set start and end of the day
    const startOfDay = new Date(dateQuery);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(dateQuery);
    endOfDay.setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
        date: { $gte: startOfDay, $lte: endOfDay }
    })
    .populate('patientId', 'name contact')
    .populate('doctorId', 'name')
    .sort({ date: 1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerPatient,
  updatePatientInfo,
  bookAppointment,
  updateAppointmentStatus,
  cancelAppointment,
  getDailySchedule
};
