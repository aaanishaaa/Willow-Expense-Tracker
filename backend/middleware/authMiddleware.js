const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]; // Extract token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password"); // Attach user to request

            if (!req.user) {
                return res.status(401).json({ success: false, message: "User not found" });
            }
            
            next();
        } catch (error) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }
};

module.exports = { protect };
