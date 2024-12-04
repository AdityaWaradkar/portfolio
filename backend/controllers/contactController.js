const transporter = require("../config/mailConfig");

const sendContactForm = (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation for required fields
  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Please provide all required fields: name, email, and message.",
    });
  }

  // Set up email content
  const mailOptions = {
    from: email,
    to: "adityawaradkar1801@gmail.com",
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `
      <h3>Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({
        error: "Error sending email. Please try again later.",
      });
    }
    res.status(200).json({ message: "Message sent successfully." });
  });
};

module.exports = { sendContactForm };
