const ActivityLog = require("../model/ActivityLog");

class ActivityLogService {
  /**
   * Log a job application creation event
   * @param {Object} jobApplication - The newly created job application
   * @returns {Promise<Object>} - The created log entry
   */
  static async logCreation(jobApplication) {
    try {
      const logEntry = new ActivityLog({
        jobApplicationId: jobApplication._id,
        activityType: "CREATED",
        previousState: null,
        newState: this._sanitizeJobData(jobApplication),
        changedFields: Object.keys(jobApplication).filter(
          (key) => !["_id", "__v", "createdAt", "updatedAt"].includes(key)
        ),
      });
      await logEntry.save();
      return logEntry;
    } catch (error) {
      console.error("Error logging job creation:", error);
    }
  }

  /**
   * Log a job application update event
   * @param {Object} oldJobData - The job application data before the update
   * @param {Object} newJobData - The job application data after the update
   * @returns {Promise<Object>} - The created log entry
   */
  static async logUpdate(oldJobData, newJobData) {
    try {
      // Determine which fields changed
      const oldDataObj = this._sanitizeJobData(oldJobData);
      const newDataObj = this._sanitizeJobData(newJobData);

      const changedFields = this._getChangedFields(oldDataObj, newDataObj);

      if (changedFields.length === 0) {
        // No actual changes, don't create a log entry
        return null;
      }

      const logEntry = new ActivityLog({
        jobApplicationId: newJobData._id,
        activityType: "UPDATED",
        previousState: oldDataObj,
        newState: newDataObj,
        changedFields,
      });

      await logEntry.save();
      return logEntry;
    } catch (error) {
      console.error("Error logging job update:", error);
    }
  }

  /**
   * Log a job application deletion event
   * @param {Object} jobApplication - The job application being deleted
   * @returns {Promise<Object>} - The created log entry
   */
  static async logDeletion(jobApplication) {
    try {
      const logEntry = new ActivityLog({
        jobApplicationId: jobApplication._id,
        activityType: "DELETED",
        previousState: this._sanitizeJobData(jobApplication),
        newState: { deleted: true },
        changedFields: ["deleted"],
      });

      await logEntry.save();
      return logEntry;
    } catch (error) {
      console.error("Error logging job deletion:", error);
    }
  }

  /**
   * Get an array of field names that changed between two objects
   * @param {Object} oldData - Original data object
   * @param {Object} newData - Updated data object
   * @returns {Array} - Array of field names that changed
   */
  static _getChangedFields(oldData, newData) {
    const changedFields = [];

    // Get all unique keys from both objects
    const allKeys = new Set([...Object.keys(oldData), ...Object.keys(newData)]);

    for (const key of allKeys) {
      // Skip metadata fields
      if (["_id", "__v", "createdAt", "updatedAt"].includes(key)) {
        continue;
      }

      // Check if value exists in both and is different, or exists in only one
      if (
        (oldData[key] !== undefined &&
          newData[key] !== undefined &&
          JSON.stringify(oldData[key]) !== JSON.stringify(newData[key])) ||
        (oldData[key] === undefined && newData[key] !== undefined) ||
        (oldData[key] !== undefined && newData[key] === undefined)
      ) {
        changedFields.push(key);
      }
    }

    return changedFields;
  }

  /**
   * Sanitize job data for logging by removing sensitive or unnecessary fields
   * @param {Object} jobData - Job application data
   * @returns {Object} - Sanitized job data
   */
  static _sanitizeJobData(jobData) {
    // If it's a Mongoose document, convert to plain object
    const jobObj = jobData.toObject ? jobData.toObject() : { ...jobData };

    // Create a clean version with only the fields we want to log
    const sanitized = { ...jobObj };

    // Remove any file path information for security
    if (sanitized.resumeFile && sanitized.resumeFile.path) {
      sanitized.resumeFile = {
        ...sanitized.resumeFile,
        path: "[REDACTED]",
      };
    }

    if (sanitized.coverLetterFile && sanitized.coverLetterFile.path) {
      sanitized.coverLetterFile = {
        ...sanitized.coverLetterFile,
        path: "[REDACTED]",
      };
    }

    return sanitized;
  }

  /**
   * Get activity logs for a specific job application
   * @param {String} jobApplicationId - ID of the job application
   * @returns {Promise<Array>} - Array of activity logs
   */
  static async getLogsForJob(jobApplicationId) {
    try {
      const logs = await ActivityLog.find({ jobApplicationId })
        .sort({ timestamp: -1 }) // Most recent first
        .lean(); // Convert to plain JavaScript objects

      return logs;
    } catch (error) {
      console.error("Error fetching job logs:", error);
      throw error; // This one we'll let propagate since it's a direct user request
    }
  }
}

module.exports = ActivityLogService;
