const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Appointment = require("../model/Appointment");
const Consultation = require("../model/Consultation");


const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// ------------------------
// GET TODAY'S APPOINTMENTS
// ------------------------
router.get("/today-appointments", async (req, res) => {
  try {
    const doctorId = req.query.doctorId;
    if (!doctorId || !isValidId(doctorId)) {
      return res.status(400).json({ success: false, message: "doctorId missing or invalid" });
    }

    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    const appointments = await Appointment.find({
      doctor_id: doctorId,
      appointment_date: { $gte: start, $lte: end }
    })
      .populate("patient_id", "name age gender contact_number")
      .sort({ appointment_date: 1 })
      .lean();

    return res.json({ success: true, data: appointments });

  } catch (err) {
    console.error("today-appointments error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ------------------------
// GET PATIENT HISTORY
// ------------------------
router.get("/patient-history/:patientId", async (req, res) => {
  try {
    const patientId = req.params.patientId;
    if (!patientId || !isValidId(patientId)) {
      return res.status(400).json({ success: false, message: "patientId missing or invalid" });
    }

    const consultations = await Consultation.find({ patient_id: patientId })
      .populate("doctor_id", "name")
      .sort({ visit_date: -1 })
      .lean();

    const appointments = await Appointment.find({ patient_id: patientId })
      .populate("doctor_id", "name")
      .sort({ appointment_date: -1 })
      .lean();

    return res.json({ success: true, data: { consultations, appointments } });

  } catch (err) {
    console.error("patient-history error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ------------------------
// GET CONSULTATION DETAIL
// ------------------------
router.get("/consultation/:appointmentId", async (req, res) => {
  try {
    const appointmentId = req.params.appointmentId;

    const consultation = await Consultation.findOne({ appointment_id: appointmentId })
      .populate("doctor_id", "name")
      .populate("patient_id", "name age gender")
      .lean();

    return res.json({ success: true, data: consultation || null });

  } catch (err) {
    console.error("get consultation error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ------------------------
// SAVE / UPDATE CONSULTATION
// ------------------------
router.put("/consultation/:appointmentId", async (req, res) => {
  try {
    const appointmentId = req.params.appointmentId;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).json({ success: false, message: "Appointment not found" });

    const payload = {
      appointment_id: appointment._id,
      doctor_id: appointment.doctor_id,
      patient_id: appointment.patient_id,
      symptoms: req.body.symptoms || "",
      diagnosis: req.body.diagnosis || "",
      prescription: req.body.prescription || "",
      notes: req.body.notes || "",
      visit_date: req.body.visit_date ? new Date(req.body.visit_date) : new Date(),
      status: req.body.status || "Pending"
    };

    let consultation = await Consultation.findOne({ appointment_id: appointmentId });

    if (consultation) {
      consultation = await Consultation.findByIdAndUpdate(consultation._id, payload, { new: true });
    } else {
      consultation = await Consultation.create(payload);
    }

    if (payload.status === "Completed") {
      appointment.status = "Completed";
      await appointment.save();
    }

    return res.json({ success: true, data: consultation });

  } catch (err) {
    console.error("save consultation error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ------------------------
// COMPLETE APPOINTMENT
// ------------------------
router.put("/complete/:appointmentId", async (req, res) => {
  try {
    const appointmentId = req.params.appointmentId;

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: "Completed" },
      { new: true }
    );

    const consultation = await Consultation.findOneAndUpdate(
      { appointment_id: appointmentId },
      { status: "Completed" },
      { new: true }
    );

    return res.json({ success: true, data: { appointment, consultation } });

  } catch (err) {
    console.error("complete appointment error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
