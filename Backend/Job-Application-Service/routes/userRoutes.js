const express = require('express');
const { registerNewUser, userLogin, getUser, forgotPass } = require('../controllers/UserController');
const authenticateUser = require('../utils/middlewares/authenticate');

const router = express.Router();

router.post('/register', registerNewUser);
router.post('/login', userLogin);
router.get('/getUser/:id', authenticateUser, getUser);
router.post('/forgotPassword', forgotPass);

module.exports = router;