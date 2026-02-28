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
    required: true
  },
  address: {
    type: String
  },
  insuranceStatus: {
    type: String,
    enum: ['Active', 'None', 'Pending'],
    default: 'None'
  },
  bloodGroup: {
    type: String
  },
  emergencyContact: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional if self-registered
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Patient', patientSchema);
