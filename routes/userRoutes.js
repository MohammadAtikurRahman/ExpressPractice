const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// User registration route
router.post('/create', userController.createUser);

// User login route
router.post('/login', userController.loginUser);

// Protected route (for testing JWT middleware)
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: `Hello, ${req.user.userType}!`, user: req.user });
});

module.exports = router;
