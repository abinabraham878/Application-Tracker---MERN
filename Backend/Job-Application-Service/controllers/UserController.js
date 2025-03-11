const { register, login, getUserById, forgotPassword } = require('../Services/UserService');

// Register a new user
const registerNewUser = (req, res, next) => {
    return register(req, res, next);
};

// Login a user
const userLogin = (req, res, next ) => {
    return login(req, res, next);
};

//get a user
const getUser = (req, res, next) => {
    return getUserById(req, res, next);
};

//forgot password
const forgotPass = (req, res, next) => {
    return forgotPassword(req, res, next);
};

module.exports = { registerNewUser, userLogin, getUser, forgotPass };