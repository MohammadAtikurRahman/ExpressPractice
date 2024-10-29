require('dotenv').config(); // Load environment variables

const express = require('express');
const app = express();
const helloRoutes = require('./routes/helloRoutes');

const PORT = process.env.PORT || 2000;

// Use the API route prefix
app.use('/api', helloRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
