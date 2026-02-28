const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Receptionist = require('../models/Receptionist');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  console.log('Registration attempt:', req.body.email, req.body.role);
  let user;
  try {
    const { name, email, password, role, profileData } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    user = await User.create({
      name,
      email,
      password,
      role
    });

    if (user) {
      try {
        // Create role-specific profile
        if (role === 'Patient') {
          await Patient.create({
            userId: user._id,
            name: name,
            age: Number(profileData?.age) || 0,
            gender: profileData?.gender || 'Other',
            contact: profileData?.contact || 'N/A',
            address: profileData?.address || 'N/A',
            insuranceStatus: profileData?.insuranceStatus || 'None',
            bloodGroup: profileData?.bloodGroup || '',
            emergencyContact: profileData?.emergencyContact || ''
          });
        } else if (role === 'Doctor') {
          await Doctor.create({
            userId: user._id,
            name: name,
            specialization: profileData?.specialization || 'General',
            experience: Number(profileData?.experience) || 0,
            consultationFee: Number(profileData?.consultationFee) || 0,
            contact: profileData?.contact || 'N/A',
            about: profileData?.about || '',
            gender: profileData?.gender || 'Other',
            age: Number(profileData?.age) || 0
          });
        } else if (role === 'Receptionist') {
          await Receptionist.create({
            userId: user._id,
            name: name,
            contact: profileData?.contact || 'N/A',
            employeeId: profileData?.employeeId || `EMP-${Date.now()}`
          });
        }

        console.log('User and Profile created successfully');
        res.status(201).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        });
      } catch (profileError) {
        // Compensation: If profile creation fails, delete the user so they can try again
        console.error('Profile creation failed, deleting user:', profileError);
        await User.findByIdAndDelete(user._id);
        return res.status(500).json({ message: `Profile creation failed: ${profileError.message}` });
      }
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('General registration error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  console.log('Login attempt:', req.body.email);
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email }).select('+password');

    if (user) {
      console.log(`Login debug: User found, Password in DB length: ${user.password?.length}`);
      const isMatch = await user.matchPassword(password);
      console.log(`Login debug: Password match result: ${isMatch}`);
      
      if (isMatch) {
        return res.json({
          _id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          subscriptionPlan: user.subscriptionPlan,
          token: generateToken(user._id),
        });
      }
    }

    console.log('Login failed: Invalid credentials');
    res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
