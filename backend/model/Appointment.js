    const mongoose = require('mongoose');

    const appointmentSchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    appointment_date: Date,
    time_slot: String,
    token_number: Number,
    status: { type: String, enum: ['Scheduled','InConsultation','Completed','Cancelled'], default: 'Scheduled' },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    createdAt: Date,
    notes: String
    }, { timestamps: true });

    module.exports = mongoose.model('Appointment', appointmentSchema);
