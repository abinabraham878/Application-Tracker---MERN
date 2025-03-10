const {
  createJobApplication,
  getAllJobApplications,
  getJobApplicationById,
  updateJobApplication,
  jobApplicationStatusCount,
  getJobApplicationsByCriteria
} = require("../Services/JobApplicationService");

// Create a new job application
const createNewJobApplication = (req, res, next) => {
  return createJobApplication(req, res, next);
};

// Get all job applications
const getAllApplications = (req, res, next) => {
  return getAllJobApplications(req, res, next);
};

// Get a single job application
const getApplicationById = (req, res, next) => {
  return getJobApplicationById(req, res, next);
};

// Update a job application
const updateApplication = (req, res, next) => {
  return updateJobApplication(req, res, next);
};

// Get job status count
const jobStatusCount = (req, res, next) => {
    return jobApplicationStatusCount(req, res, next);
};

//Get job applications by criteria
const getJobsByCriteria = (req, res, next) => {
  return getJobApplicationsByCriteria(req, res, next);
};

module.exports = {
  createNewJobApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  jobStatusCount,
  getJobsByCriteria
};
