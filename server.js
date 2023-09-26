const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Create an Express app
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a user schema and model
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user with the provided email
    const user = await User.findOne({ email });

    // If user not found or password doesn't match
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Successful login
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Signup route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Successful signup
    return res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
