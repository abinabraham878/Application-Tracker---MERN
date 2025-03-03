const express = require('express');
const { createNewJobApplication, getAllApplications, getApplicationById, updateApplication } = require('../controllers/JobApplicationController');
const authenticateUser = require('../utils/middlewares/authenticate');

const router = express.Router();

router.post('/create', authenticateUser, createNewJobApplication);
router.get('/all', authenticateUser, getAllApplications);
router.get('/:id', authenticateUser, getApplicationById);
router.put('/:id', authenticateUser, updateApplication);

module.exports = router;