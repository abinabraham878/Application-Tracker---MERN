const jobApplicationSchema = require('../models/JobApplication');


// Create a new job application
const createJobApplication = async (req, res, next) => {

    try{
        const { jobTitle, companyName, jobLocation, jobType, usedResume, usedCoverLetter, status, userId} = req.body;
        const jobApplication = await jobApplicationSchema.create({ jobTitle, companyName, jobLocation, jobType, usedResume, usedCoverLetter, status, userId });
        res.status(201).json({ success: true, data: jobApplication});
    } catch (error) {
        next(error);
        res.status(500).json({ success: false ,message: error.message});
    }
};

// Get all job applications
const getAllJobApplications = async (req, res, next) => {
    try {
        const jobApplications = await jobApplicationSchema.find({ userId: req.params.id }).sort({createdAt: -1});
        res.status(200).json(jobApplications);
    } catch (error) {
        console.log(error)
        next(error);
        res.status(500).json({message: error.message});
    }
};

// Get a single job application
const getJobApplicationById = async (req, res, next) => {
    try {
        const jobApplication = await jobApplicationSchema.findById(req.params.id);
        res.status(200).json(jobApplication);
    } catch (error) {
        next(error);
        res.status(500).json({message: error.message});
    }
};

// Update a job application
const updateJobApplication = async (req, res, next) => {
    try {
        const jobApplication = await jobApplicationSchema.findByIdAndUpdate(req
            .params.id, req.body, {new: true});
        res.status(200).json(jobApplication);
    }
    catch (error) {
        next(error);
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    createJobApplication,
    getAllJobApplications,
    getJobApplicationById,
    updateJobApplication
};