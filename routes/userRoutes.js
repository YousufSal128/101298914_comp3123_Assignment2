const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).send('User created');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send('Invalid credentials');
  }
  res.status(200).send('Login successful');
});

module.exports = router;
