const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET;

// Controller to create/register a new user
exports.createUser = async (req, res) => {
    try {
        const {
            userId,
            userType,
            userProfileId,
            userName,
            userEmail,
            userPhone,
            userPassword
        } = req.body;

        // Validate userEmail
        if (!userEmail || typeof userEmail !== 'string' || !userEmail.includes('@')) {
            return res.status(400).json({ message: 'Invalid or missing email' });
        }

        // Check if user already exists by email or userId
        const existingUser = await User.findOne({ $or: [{ userEmail }, { userId }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userPassword, 10);

        // Create a new user
        const newUser = new User({
            userId,
            userType,
            userProfileId,
            userName,
            userEmail,
            userPhone,
            userPassword: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error:', error); // Log error for debugging
        res.status(500).json({ error: error.message });
    }
};

// Controller to login a user and generate JWT token
exports.loginUser = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        // Check if user exists
        const user = await User.findOne({ userEmail });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(userPassword, user.userPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.userId, userType: user.userType },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
