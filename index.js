require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const helloRoutes = require('./routes/helloRoutes');

const PORT = process.env.PORT || 2000;
const MONGO_URI = process.env.MONGO_URI; // Add this line to get the MongoDB URI from .env

// Connect to MongoDB using Mongoose
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Use the API route prefix
app.use('/api', helloRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
