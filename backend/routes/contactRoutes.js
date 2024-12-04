const express = require("express");
const router = express.Router();
const { sendContactForm } = require("../controllers/contactController");

router.post("/contact", sendContactForm); // Route for sending contact form

module.exports = router;
