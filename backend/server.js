const app = require("./app"); // Import the app instance
const PORT = process.env.PORT || 5000; // Use environment port or default to 5000

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});