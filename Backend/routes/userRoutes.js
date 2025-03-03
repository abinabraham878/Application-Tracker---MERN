const express = require('express');
const { registerNewUser, userLogin } = require('../controllers/UserController');

const router = express.Router();

router.post('/register', registerNewUser);
router.post('/login', userLogin);

module.exports = router;