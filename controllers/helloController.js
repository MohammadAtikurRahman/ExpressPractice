const Hello = require("../models/helloModel");

// Controller for Hello World
exports.sayHello = async (req, res) => {
  try {
    // Create a new message document
    const newMessage = new Hello({ message: "Hello, World!" });
    await newMessage.save(); // Save to the database

    res.status(200).send("Hello, World! message saved to the database.");
  } catch (error) {
    res.status(500).send("Error saving message: " + error.message);
  }
};
