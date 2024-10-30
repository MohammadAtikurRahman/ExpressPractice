const jwt = require('jsonwebtoken');

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    // Check if Authorization header is provided
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    // Extract token by removing the "Bearer " prefix
    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token); // Log the extracted token

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded Token:', decoded); // Log decoded token
        req.user = decoded;
        next(); // Proceed to the next middleware
    } catch (error) {
        console.error('JWT Error:', error.message); // Log the error message
        return res.status(401).json({ message: 'Invalid token, authorization denied' });
    }
};

module.exports = authMiddleware;
