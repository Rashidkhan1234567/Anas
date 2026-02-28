const ActivityLog = require('../models/ActivityLog');

// @desc    Get all system activity logs
// @route   GET /api/activity
// @access  Private/Admin
const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find({}).sort({ createdAt: -1 }).limit(50);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getActivityLogs,
};
