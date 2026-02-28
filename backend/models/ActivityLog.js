const mongoose = require('mongoose');

const activityLogSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    module: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['CREATE', 'UPDATE', 'DELETE', 'ALERT', 'INFO'],
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = ActivityLog;
