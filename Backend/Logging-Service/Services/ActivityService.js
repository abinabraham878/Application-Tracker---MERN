const ActivityLog = require("../model/ActivityLog");


const getActivityLogById = async (req, res, next) =>{
    try {
        const activityLogs = await ActivityLog.find({ jobApplicationId: req.params.id });
        res.status(200).json({ success: true, data: activityLogs });
    } catch(error) {
        next(error);
    }
};

module.exports = {
    getActivityLogById
}