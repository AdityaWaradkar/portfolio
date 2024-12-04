const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Make sure you set EMAIL_USER in your .env
    pass: process.env.EMAIL_PASS, // Make sure you set EMAIL_PASS in your .env
  },
});

module.exports = transporter;
