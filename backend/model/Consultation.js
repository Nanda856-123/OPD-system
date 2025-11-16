const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  appointment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  symptoms: String,
  diagnosis: String,
  prescription: String,
  visit_date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending','Completed'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Consultation', consultationSchema);
