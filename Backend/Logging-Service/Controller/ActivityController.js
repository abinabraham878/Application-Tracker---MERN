const { getActivityLogById } = require("../Services/ActivityService.js");

const getActivityLogForJobID = (req, res, next) => {
    return getActivityLogById(req, res, next);
};

module.exports = {
    getActivityLogForJobID
}