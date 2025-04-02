const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET not set');
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.registerUser = async (req, res) => {
    const { fullName, email, password, profilePic } = req.body;
    if (!fullName || !email || !password) {
        return res.status(400).json({ success: false, message: 'Please enter all fields' });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        const user = await User.create({ fullName, email, password, profilePic });
        user.password = undefined;
        res.status(201).json({
            success: true,
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

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
