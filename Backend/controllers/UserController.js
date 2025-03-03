const { register, login } = require('../Services/UserService');

// Register a new user
const registerNewUser = (req, res, next) => {
    return register(req, res, next);
};

// Login a user
const userLogin = (req, res, next ) => {
    return login(req, res, next);
}

module.exports = { registerNewUser, userLogin };