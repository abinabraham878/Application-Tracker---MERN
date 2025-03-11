const express = require("express");
const authenticate = require("../../Job-Application-Service/utils/middlewares/authenticate");
const { getActivityLogForJobID } = require("../Controller/ActivityController");

const router = express.Router();

router.get('/:id', getActivityLogForJobID);

module.exports = router;