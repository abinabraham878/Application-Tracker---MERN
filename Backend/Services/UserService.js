const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register a new user
const register = async (req, res, next) => {
    const { name, email, password } = req.body;

    try{
        const user = await User.create({ name, email, password });
        const token = jwt.sign({ userId: user._id, userName: user.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_Expiry });

        res.status(201).json({ success: true, message: "Registration Successful", token });
    } catch(err){
        console.error(err);
        if(err.code === 11000){
            return res.status(400).json({ success: false, message: "Email already exists" });
        }
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Login a user
const login = async (req, res, next) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({
            email
        });

        if(!user){
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const passwordMatch = await user.comparePassword(password);
        if(!passwordMatch){
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        const token = jwt.sign({ userId: user._id, userName: user.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_Expiry });
        res.status(200).json({ success: true, message: "Login Successful", token });
    } catch(err){
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Get user by id
const getUserById = async (req, res, next) => {
    const user = await User.findOne({_id: req.params.id});
    if(!user){
        return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
};

//User forgot password
const forgotPassword = async (req, res, next) => {
    
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({ success: false, message: "Please provide email and password" });
        }

        //Check if user exists
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //update password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch(err){
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
module.exports = { register, login, getUserById, forgotPassword };