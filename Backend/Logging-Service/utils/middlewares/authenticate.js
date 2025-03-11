const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.userId);
        if(!user){
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch(err){
        // Handle different types of JWT errors
        if(err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Unauthorized - Token expired" });
        } else if(err.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid token" });
        } else {
            console.error(err);
            return res.status(500).json({ success: false, message: "Server Error" });
        }
    }
};

module.exports = authenticate;