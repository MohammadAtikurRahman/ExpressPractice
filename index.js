require("dotenv").config(); // Load environment variables

const express = require("express");
const connectDB = require("./DB/dbConnection"); // Import the DB connection
const helloRoutes = require("./routes/helloRoutes");

const app = express();
const PORT = process.env.PORT || 2000;

// Connect to MongoDB
connectDB();

// Use the API route prefix
app.use("/api", helloRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
