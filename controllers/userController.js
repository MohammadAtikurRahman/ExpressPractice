const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Controller to create a new user
exports.createUser = async (req, res) => {
    try {
        const { userName, userEmail, userPhone, userPassword, userType ,userId,userProfileId } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ userEmail });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the userPassword
        const hashedPassword = await bcrypt.hash(userPassword, 10);

        // Create a new user
        const newUser = new User({
            userId,
            userType,
            userProfileId,
            userName,
            userEmail,
            userPhone,
            userPassword: hashedPassword,
          
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
