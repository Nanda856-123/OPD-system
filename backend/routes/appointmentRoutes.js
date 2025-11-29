const express= require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const AppointmentModel=require("../model/Appointment");
const DoctorModel=require("../model/Doctor")
const verifyToken = require('../middleware/verifyToken')

// Debug: confirm this router file is loaded when server starts
console.log('Loaded appointmentRoutes.js');

router.get('/',verifyToken,async(req,res)=>{
    try{
        const appointments=await AppointmentModel.find()
        .populate('doctor_id','name')
        .populate('patient_id','name')
        res.status(200).send(appointments);
    }
    catch(error){
        console.error('Error fetching appointments:', error);
        res.status(404).send('Error fetching appointments');
    }
})

router.post('/addAppointment',verifyToken,async(req,res)=>{
    try{
        const appointment=req.body;
        await AppointmentModel.create(appointment);
        res.status(200).send({message:'Appointment booked successfully'});
    }
    catch(error){
        console.error('Error booking appointment:', error);
        res.status(404).send('Error in booking appointment');
    }
})

router.put('/edit/:id', verifyToken, async (req, res) => {
  try {
    const id = req.params.id;

    // force status to "completed"
    const updateData = {
      ...req.body,
      status: "completed"
    };

    const updated = await AppointmentModel.findByIdAndUpdate(id, updateData, {
      new: true
    });

    if (!updated) {
      return res.status(404).send({ message: 'Appointment not found' });
    }

    res.status(200).send(updated);   // return updated appointment
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in updating appointment');
  }
});

router.get("/doctor", verifyToken, async (req, res) => {
  try {
    const doctor = await DoctorModel.findOne({ email: req.user.email }); //req.user is available via verifyToken
    if (!doctor) {
      return res.status(404).send({ message: "doctor not found" });
    }
    const appointment = await AppointmentModel.find({ doctor_id: doctor._id })
      .populate("doctor_id", "name")
      .populate("patient_id", "name");
    res.status(200).send(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching doctor's appointments" });
  }
});

/* ================= UPDATED HISTORY ROUTES (fixed — no `?` in path) ===================
   Accepts:
     - GET /appointments/history/:patientId
     - GET /appointments/history?id=<patientId>
   Always returns 200 with an array (empty if none). Protected by verifyToken.
*/

// 1) Path style
router.get('/history/:patientId', verifyToken, async (req, res) => {
  const patientId = req.params.patientId;
  if (!patientId) {
    return res.status(400).json({ message: "patient id is required in path" });
  }

  try {
    console.log('history (path) route called, patientId=', patientId);

    let history = await AppointmentModel.find({ "patient_id._id": patientId })
      .populate("patient_id", "name")
      .populate("doctor_id", "name")
      .lean();

    if (!history || history.length === 0) {
      history = await AppointmentModel.find({ patient_id: patientId })
        .populate("patient_id", "name")
        .populate("doctor_id", "name")
        .lean();
    }

    if (!history || history.length === 0) {
      history = await AppointmentModel.find({
        $or: [
          { "patient_id": patientId },
          { "patient_id._id": patientId },
          { "patient_id.id": patientId }
        ]
      })
        .populate("patient_id", "name")
        .populate("doctor_id", "name")
        .lean();
    }

    return res.status(200).json(history || []);
  } catch (err) {
    console.error("Error fetching patient history (path):", err);
    return res.status(500).json({ message: "Server error fetching history" });
  }
});

// 2) Query style
router.get('/history', verifyToken, async (req, res) => {
  const patientId = req.query.id;
  if (!patientId) {
    return res.status(400).json({ message: "patient id is required in query param ?id=..." });
  }

  try {
    console.log('history (query) route called, patientId=', patientId);

    let history = await AppointmentModel.find({ "patient_id._id": patientId })
      .populate("patient_id", "name")
      .populate("doctor_id", "name")
      .lean();

    if (!history || history.length === 0) {
      history = await AppointmentModel.find({ patient_id: patientId })
        .populate("patient_id", "name")
        .populate("doctor_id", "name")
        .lean();
    }

    if (!history || history.length === 0) {
      history = await AppointmentModel.find({
        $or: [
          { "patient_id": patientId },
          { "patient_id._id": patientId },
          { "patient_id.id": patientId }
        ]
      })
        .populate("patient_id", "name")
        .populate("doctor_id", "name")
        .lean();
    }

    return res.status(200).json(history || []);
  } catch (err) {
    console.error("Error fetching patient history (query):", err);
    return res.status(500).json({ message: "Server error fetching history" });
  }
});
/* =============================================================================== */

module.exports=router;
