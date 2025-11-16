const express = require('express');
const router = express.Router();

const Department = require('../model/Department');
const Doctor = require('../model/Doctor');
const { authenticate, authorizeAdmin } = require('../middleware/authMiddleware');

// Apply authentication + admin check to all admin routes
router.use(authenticate);
router.use(authorizeAdmin);

/* Departments */
// Create
router.post('/departments', async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await Department.findOne({ name });
    if (existing) return res.status(400).json({ message: 'Department exists' });
    const dept = await Department.create({ name });
    res.status(201).json(dept);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Read all
router.get('/departments', async (req, res) => {
  try {
    const depts = await Department.find().sort({ createdAt: -1 });
    res.json(depts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update
router.put('/departments/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const updated = await Department.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete
router.delete('/departments/:id', async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/* Doctors */
// Create
router.post('/doctors', async (req, res) => {
  try {
    const { name, email, department } = req.body;
    const exists = await Doctor.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Doctor email exists' });
    const doc = await Doctor.create({ name, email, department });
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Read all (populate department)
router.get('/doctors', async (req, res) => {
  try {
    const docs = await Doctor.find().populate('department').sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update
router.put('/doctors/:id', async (req, res) => {
  try {
    const updated = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('department');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete
router.delete('/doctors/:id', async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
