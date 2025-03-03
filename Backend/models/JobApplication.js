const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
    jobTitle:{
        type: String,
        required: true
    },
    companyName:{
        type: String,
        required: true
    },
    jobLocation:{
        type: String,
        required: true
    },
    jobType:{
        type: String,
        required: true
    },
    usedResume:{
        type: String,
        required: false
    },
    usedCoverLetter:{
        type: String,
        required: false
    },
    status:{
        type: String,
        required: true
    }
}, 
{ timestamps: true });

module.exports = mongoose.model('JobApplication', JobApplicationSchema);