const jobApplicationSchema = require("../models/JobApplication");
const queryBuilder = require("../utils/middlewares/queryBuilder");

// Create a new job application
const createJobApplication = async (req, res, next) => {
  try {
    const {
      jobTitle,
      companyName,
      jobLocation,
      jobType,
      usedResume,
      usedCoverLetter,
      status,
      userId,
    } = req.body;
    const jobApplication = await jobApplicationSchema.create({
      jobTitle,
      companyName,
      jobLocation,
      jobType,
      usedResume,
      usedCoverLetter,
      status,
      userId,
    });
    res.status(201).json({ success: true, data: jobApplication });
  } catch (error) {
    next(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all job applications
const getAllJobApplications = async (req, res, next) => {
  try {
    const jobApplications = await jobApplicationSchema
      .find({ userId: req.params.id })
      .sort({ createdAt: -1 });
    res.status(200).json(jobApplications);
  } catch (error) {
    console.log(error);
    next(error);
    res.status(500).json({ message: error.message });
  }
};

// Get a single job application
const getJobApplicationById = async (req, res, next) => {
  try {
    const jobApplication = await jobApplicationSchema.findById(req.params.id);
    res.status(200).json(jobApplication);
  } catch (error) {
    next(error);
    res.status(500).json({ message: error.message });
  }
};

// Update a job application
const updateJobApplication = async (req, res, next) => {
  try {
    const jobApplication = await jobApplicationSchema.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({ success: true, data: jobApplication });
  } catch (error) {
    next(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get job applicaton status count
const jobApplicationStatusCount = async (req, res, next) => {
  try {
    const jobStatusCount = await jobApplicationSchema.aggregate([
      { $match: { userId: req.params.id } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    const result = {};
    jobStatusCount.forEach((item) => {
      result[item._id] = item.count;
    });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getJobApplicationsByCriteria = async (req, res, next) => {
  try {
    const filters = req.body;

    // Validate input
    if (!Array.isArray(filters)) {
      return res
        .status(400)
        .json({ error: "Filters must be an array of filter objects" });
    }
    // Build MongoDB query from filters
    const query = queryBuilder(filters);
    const result = await jobApplicationSchema
      .find(query)
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createJobApplication,
  getAllJobApplications,
  getJobApplicationById,
  updateJobApplication,
  jobApplicationStatusCount,
  getJobApplicationsByCriteria
};
