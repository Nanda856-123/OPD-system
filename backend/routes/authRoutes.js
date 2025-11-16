const express = require('express');
const router = express.Router();
const userModel = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// REGISTER ROUTE
// ---------------------------
router.post('/register', async (req, res) => {
  try {
    console.log("Register Request:", req.body);

    const { name, email, password, role } = req.body;

    // check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role: role || "admin" // default role = admin
    });

    await newUser.save();

    return res.status(201).send({
      message: "User registered successfully",
      user: newUser
    });

  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).send({ message: "Server error" });
  }
});


// LOGIN ROUTE
// ---------------------------
router.post('/login', async (req, res) => {
  try {
    console.log("Login Request:", req.body);

    const { email, password } = req.body;

    // check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // validate password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // create jwt token
    const payload = {
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'opd_secret_key',
      { expiresIn: '1d' }
    );

    return res.status(200).send({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).send({ message: "Server error" });
  }
});

module.exports = router;
