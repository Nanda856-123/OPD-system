// backend/seedAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./model/User');

async function run() {
  try {
    await mongoose.connect(process.env.mongodb_url);
    console.log('Mongo connected');

    const email = 'admin@example.com';
    const exists = await User.findOne({ email });
    if (exists) {
      console.log('Admin already exists:', exists.email);
      process.exit(0);
    }

    const hashed = await bcrypt.hash('Admin@123', 10);
    const admin = new User({
      name: 'Admin User',
      email,
      password: hashed,
      role: 'Admin',   // IMPORTANT: role must match middleware check (capital 'A')
      status: true,
      createdAt: new Date()
    });

    await admin.save();
    console.log('Admin created:', email, 'password: Admin@123');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
