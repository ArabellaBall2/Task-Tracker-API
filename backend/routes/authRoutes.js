const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name ||!email || !password) {
    return res.status(400).json({
      message: 'name, email, and password are required'
    });
  }

  try {
  
    const newUser = new User({ name, email, password });
    await newUser.save();
    const token = jwt.sign(
    { _id: newUser._id, email: newUser.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



router.post('/login', async (req, res) => {  const { email, password } = req.body;

const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: 'Invalid email or password'
    });
  }

   const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({
      message: 'Invalid email or password'
    });
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  res.status(200).json({
    message: 'Login successful',
    token
  });
});


module.exports = router;
