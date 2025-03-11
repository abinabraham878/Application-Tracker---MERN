const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
    jobApplicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobApplication',
      required: true
    },
    activityType: {
      type: String,
      enum: ['CREATED', 'UPDATED', 'DELETED'],
      required: true
    },
    previousState: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    newState: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    changedFields: [String],
    timestamp: {
      type: Date,
      default: Date.now
    }
  });

  module.exports = mongoose.model('ActivityLog', ActivityLogSchema);