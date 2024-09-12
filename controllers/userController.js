// userController.js
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Signup user controller
const signupUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body; // Accept isAdmin from the request

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const newUser = new User({
      name,
      email,
      password,
      isAdmin: isAdmin || false, // Default to false if not provided
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};


// Login user controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Simple password check (you should hash passwords in production)
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate token and include isAdmin in the payload
    const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1h' });

    // Return the token and isAdmin status
    res.status(200).json({ message: 'Login successful!', token, isAdmin: user.isAdmin });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Error logging in user' });
  }
};


module.exports = { signupUser, loginUser };
