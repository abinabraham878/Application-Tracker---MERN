const express = require("express");
const { getActivityLogForJobID } = require("../Controller/ActivityController");

const router = express.Router();

router.get('/:id', getActivityLogForJobID);

module.exports = router;