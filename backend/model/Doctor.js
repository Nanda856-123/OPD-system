const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  day: String,
  slots: [String]
});

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'departments' },
  qualification: String,
  availability_schedule: [availabilitySchema],
  contact: String,
  email: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
