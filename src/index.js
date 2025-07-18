// Load environment variables from .env file
require('dotenv').config();

// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Used to hash passwords

const app = express();
app.use(express.json()); // Allows Express to read JSON in request bodies

// Load values from .env file
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

// Check if Mongo URI is set in the .env file
if (!MONGO_URI) {
  console.error(' MONGO_URI not set in .env');
  process.exit(1); // Exit the app if MONGO_URI is missing
}

// Connect to MongoDB database
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(' MongoDB connected'))
  .catch((err) => console.error(' MongoDB connection error:', err));

// Define user schema (structure of data in MongoDB)
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }, // Each user must have a unique email
  password: String, // Password will be stored in a hashed format
});

// Before saving the user, hash the password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // If password hasn't changed, skip
  this.password = await bcrypt.hash(this.password, 10); // Hash password
  next();
});

// Create User model from the schema
const User = mongoose.model('User', UserSchema);

// Default route to check if server is running
app.get('/', (req, res) => {
  res.send('Web App Running!');
});

// Route to create a new user (POST request)
app.post('/users', async (req, res) => {
  const user = new User(req.body); // Create new user from request data
  await user.save(); // Save to MongoDB
  res.json(user); // Send back saved user info
});

// Route to get all users (GET request)
app.get('/users', async (req, res) => {
  const users = await User.find(); // Fetch all users from database
  res.json(users); // Return users as JSON
});

// Login route that uses JWT secret from .env to generate a token
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Compare entered password with hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Create JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ message: 'Login successful', token });
});


// Start the Express server
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});

const jwt = require('jsonwebtoken');
// Middleware to authenticate users using JWT