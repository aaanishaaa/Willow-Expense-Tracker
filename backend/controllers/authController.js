const User = require('../models/User');
const jwt = require('jsonwebtoken');

// 3 Generate JWT tokens
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// 4 Register User
exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;
    //checking for missing fields
    if (!fullName || !email || !password) {
        return res.status(400).json({message: 'Please enter all fields' });
    }
    try {
        //checking for exisiting user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({message: 'User already exists' });
        }
        //check for user
        const user = await User.create({ fullName, email, password, profileImageUrl, });
        // user.password = undefined;
        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({message: 'Server Error', error: err.message });
    }
};

// 4 Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please enter all fields' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
        user.password = undefined;
        res.json({
            success: true,
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

// 4 getUserInfo
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};
