const express = require("express");
const router = express.Router();
const helloController = require("../controllers/helloController");

// Define the route for /api/v1/hello-world
router.get("/v1/hello-world", helloController.sayHello);

module.exports = router;
