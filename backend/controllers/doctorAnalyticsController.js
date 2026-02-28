// @desc    Get doctor specific analytics
// @route   GET /api/doctor-analytics
// @access  Private/Doctor
const getDoctorAnalytics = async (req, res) => {
  try {
    // In a real app, these would be calculated from Appointments and Patients
    const stats = {
      avgConsultationTime: "14 min",
      patientsThisWeek: 61,
      diagnosesMade: 142,
      satisfactionScore: "4.9/5",
      consultationData: [
        { name: 'Mon', time: 15 },
        { name: 'Tue', time: 12 },
        { name: 'Wed', time: 18 },
        { name: 'Thu', time: 14 },
        { name: 'Fri', time: 20 },
        { name: 'Sat', time: 8 },
      ],
      patientVolumeData: [
        { name: 'Week 1', patients: 45 },
        { name: 'Week 2', patients: 52 },
        { name: 'Week 3', patients: 48 },
        { name: 'Week 4', patients: 61 },
      ]
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDoctorAnalytics,
};
