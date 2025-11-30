const express= require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const BillingModel=require("../model/Billing");
const AppointmentModel=require("../model/Appointment");
const mongoose=require('mongoose');
const verifyToken = require('../middleware/verifyToken')


router.post('/create', verifyToken, async (req, res) => {
  try {
    const {
      appointmentId,
      consultation_fee,
      additional_charges = [],
      discount = 0,
      payment_method = null,
      payment_status = "unpaid"
    } = req.body;

    if (!appointmentId) {
      return res.status(400).json({ message: "appointmentId is required" });
    }

    // Fetch the appointment
    const appointment = await AppointmentModel.findById(appointmentId)
    .populate("patient_id", "opd_id")
      .populate("doctor_id", "_id");
    console.log(appointment)
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    if (appointment.billGenerated) {
      return res.status(400).json({ message: "Bill already generated for this appointment" });
    }
    // total amount
    const additionalTotal = additional_charges.reduce((sum, item) => sum + (item.amount || 0), 0);
    const total_amount = (consultation_fee || 0) + parseFloat(additionalTotal) - (discount || 0);
    // Creating bill document
    const newBill = await BillingModel.create({
      opdId: appointment.patient_id.opd_id,
      patientId: appointment.patient_id._id,
      doctorId: appointment.doctor_id._id,
      consultation_fee,
      additional_charges,
      discount,
      total_amount,
      payment_status,
      payment_method,
    //   created_by: req.user?.id || req.user?._id
    });

    // Update appointment to mark bill as generated
    appointment.billGenerated = true;
    appointment.billId = newBill._id;
    await appointment.save();

    return res.status(201).json({ message: "Bill generated successfully", bill: newBill });

  } catch (error) {
    console.error("Error generating bill:", error);
    res.status(500).json({ message: "Server error generating bill" });
  }
});

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const id = req.params.id;

    const bill = await BillingModel.findById(id)
      .populate('patientId', 'name opd_id contact_number')
      .populate('doctorId', 'name');

    res.status(200).json(bill);

  } catch (error) {
    console.error("Error fetching bill:", error);
    res.status(500).json({ message: "Server error fetching bill" });
  }
});



module.exports = router;