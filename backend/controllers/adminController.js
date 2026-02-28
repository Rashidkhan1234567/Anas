const User = require('../models/User');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Prescription = require('../models/Prescription');
const bcrypt = require('bcryptjs');

// Helper to hash password if updating
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// @desc    Get all users by role
// @route   GET /api/admin/users?role=Doctor
// @access  Private/Admin
const getUsersByRole = async (req, res) => {
  try {
    const role = req.query.role;
    const query = role ? { role } : { role: { $in: ['Doctor', 'Receptionist'] } };
    const users = await User.find(query).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a user (Doctor/Receptionist)
// @route   POST /api/admin/users
// @access  Private/Admin
const createUser = async (req, res) => {
  try {
    const { name, email, password, role, profileData } = req.body;
    
    // Only allow creating Doctors or Receptionists through this endpoint
    if (!['Doctor', 'Receptionist'].includes(role)) {
       return res.status(400).json({ message: 'Can only create Doctor or Receptionist' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password, role });
    
    // Create role-specific profile
    if (role === 'Doctor') {
      const Doctor = require('../models/Doctor');
      await Doctor.create({
        userId: user._id,
        name: name,
        specialization: profileData?.specialization || 'General',
        experience: profileData?.experience || 0,
        consultationFee: profileData?.consultationFee || 0,
        contact: profileData?.contact || 'N/A',
        gender: profileData?.gender || 'Other'
      });
    } else if (role === 'Receptionist') {
      const Receptionist = require('../models/Receptionist');
      await Receptionist.create({
        userId: user._id,
        name: name,
        contact: profileData?.contact || 'N/A',
        employeeId: profileData?.employeeId || `EMP-${Date.now()}`
      });
    }

    res.status(201).json({ _id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Don't allow admins to change their own role here or downgrade other admins easily
    if (user.role === 'Admin' && req.user.id !== user.id.toString()) {
       return res.status(403).json({ message: 'Cannot modify other admins' });
    }

    const { name, email, password, role, subscriptionPlan } = req.body;
    
    if (name) user.name = name;
    if (email) user.email = email;
    if (role && ['Doctor', 'Receptionist'].includes(role)) user.role = role;
    if (subscriptionPlan) user.subscriptionPlan = subscriptionPlan;
    if (password) {
       const salt = await bcrypt.genSalt(10);
       user.password = await bcrypt.hash(password, salt);
    } // Important: Because we use pre-save hook, might need to handle this carefully if not using findByIdAndUpdate

    await user.save(); // pre-save hook handles hashing if password was modified
    
    res.json({ _id: user.id, name: user.name, email: user.email, role: user.role, subscriptionPlan: user.subscriptionPlan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
       return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.role === 'Admin') {
       return res.status(403).json({ message: 'Cannot delete admin users' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ id: req.params.id, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get system analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getAnalytics = async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await User.countDocuments({ role: 'Doctor' });
    
    // Monthly appointments
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const monthlyAppointments = await Appointment.countDocuments({
      date: { $gte: startOfMonth }
    });

    // Simulate revenue (e.g., $50 per completed appointment)
    const completedAppointments = await Appointment.countDocuments({
      date: { $gte: startOfMonth },
      status: 'completed'
    });
    const simulatedRevenue = completedAppointments * 50;
    
    // System usage
    const totalPrescriptions = await Prescription.countDocuments();
    
    // Could aggregate DiagnosisLogs for most common diagnosis, here we just return usage count
    const aiUsageLogs = await require('../models/DiagnosisLog').countDocuments({ aiResponse: { $exists: true, $ne: null } });

    res.json({
      totalPatients,
      totalDoctors,
      monthlyAppointments,
      simulatedRevenue,
      systemUsage: {
         totalPrescriptions,
         aiUsageLogs
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsersByRole,
  createUser,
  updateUser,
  deleteUser,
  getAnalytics
};
