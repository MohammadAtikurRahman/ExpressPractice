const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to create a user
router.post('/create', userController.createUser);

module.exports = router;
