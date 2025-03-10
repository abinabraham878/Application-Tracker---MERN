const express = require("express");
const {
  createNewJobApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  jobStatusCount,
  getJobsByCriteria,
} = require("../controllers/JobApplicationController");
const authenticateUser = require("../utils/middlewares/authenticate");

const router = express.Router();

router.post("/create", authenticateUser, createNewJobApplication);
router.get("/all/:id", authenticateUser, getAllApplications);
router.get("/:id", authenticateUser, getApplicationById);
router.put("/update/:id", authenticateUser, updateApplication);
router.get("/status-count/:id", authenticateUser, jobStatusCount);
router.post("/get-job-application-by-criteria", authenticateUser, getJobsByCriteria);

module.exports = router;
