const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  age: {
    type: Number,
    required: [true, 'Please add an age']
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: [true, 'Please add a gender']
  },
  contact: {
    type: String,
    required: [true, 'Please add a contact number']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Link to User model for Login
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Usually the receptionist who registered them
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Patient', patientSchema);
