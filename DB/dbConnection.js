const mongoose = require("mongoose");

// Enable Mongoose debug mode
mongoose.set("debug", true);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);

    // Log stack trace for debugging purposes
    console.error(err.stack);

    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
