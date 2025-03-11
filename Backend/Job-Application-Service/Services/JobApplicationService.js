const jobApplicationSchema = require("../models/JobApplication");
const queryBuilder = require("../utils/middlewares/queryBuilder");
const sendLogEvent = require("../Publisher/rabbitmqPublisher");

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

    // Send log event asynchronously (non-blocking)
    sendLogEvent({ type: "CREATED", jobApplication: jobApplication.toObject() }).catch(console.error);

    return res.status(201).json({ success: true, data: jobApplication });

  } catch (error) {
    next(error);
  }
};

// Get all job applications for a user
const getAllJobApplications = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "User ID is required" });

    const jobApplications = await jobApplicationSchema.find({ userId: id }).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: jobApplications });

  } catch (error) {
    next(error);
  }
};

// Get a single job application by ID
const getJobApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "Job application ID is required" });

    const jobApplication = await jobApplicationSchema.findById(id);
    if (!jobApplication) return res.status(404).json({ success: false, message: "Job application not found" });

    return res.status(200).json({ success: true, data: jobApplication });

  } catch (error) {
    next(error);
  }
};

// Update a job application
const updateJobApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "Job application ID is required" });

    const oldJobData = await jobApplicationSchema.findById(id);

    const jobApplication = await jobApplicationSchema.findByIdAndUpdate(id, req.body, { new: true });
    if (!jobApplication) return res.status(404).json({ success: false, message: "Job application not found" });

    // Send log event asynchronously
    sendLogEvent({ type: "UPDATED", jobApplication: { oldJobData: oldJobData, newJobData: jobApplication.toObject() } }).catch(console.error);

    return res.status(200).json({ success: true, data: jobApplication });

  } catch (error) {
    next(error);
  }
};

// Get job application status count for a user
const jobApplicationStatusCount = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "User ID is required" });

    const jobStatusCount = await jobApplicationSchema.aggregate([
      { $match: { userId: id } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const result = {};
    jobStatusCount.forEach((item) => {
      result[item._id] = item.count;
    });

    return res.status(200).json({ success: true, data: result });

  } catch (error) {
    next(error);
  }
};

// Get job applications by filter criteria
const getJobApplicationsByCriteria = async (req, res, next) => {
  try {
    const { filters } = req.body;

    if (!Array.isArray(filters)) {
      return res.status(400).json({ success: false, message: "Filters must be an array" });
    }

    const query = queryBuilder(filters);
    const result = await jobApplicationSchema.find(query).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: result });

  } catch (error) {
    next(error);
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
