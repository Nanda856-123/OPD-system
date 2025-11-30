const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const PatientModel=require("../model/Patient")
const AppointmentModel=require("../model/Appointment")
const verifyToken = require('../middleware/verifyToken')


// Generate Unique OPD ID: DDMMYYYY + counter
async function generateOPDId() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  const datePrefix = `${day}${month}${year}`;  // 25112025

  // Count how many patients registered today (for counter)
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  const countToday = await PatientModel.countDocuments({
    registered_date: { $gte: start, $lte: end }
  });

  const opdId = `OPD${datePrefix}${countToday + 1}`;

  return opdId;
}



router.get('/',verifyToken, async(req, res) => {
    try {
        const patients = await PatientModel.find();
        res.status(200).send(patients);
    } catch (error) {
        res.status(404).send('Error fetching patients');
    }
})
router.post('/regPatient',verifyToken,async(req,res)=>{
    try {
        var patient=req.body;
        await PatientModel.create(patient)
        res.status(200).send({message:'patient registered successfully'});
    } catch (error) {
         res.status(404).send('Error in data addition');
    }
})
router.put('/edit/:id',verifyToken,async(req,res)=>{
    try{
        const id=req.params.id;
        await PatientModel.findByIdAndUpdate(id,req.body)
        res.status(200).send({message:'Patient Updated successfully'});
    }
     catch (error) {
        res.status(404).send('Error in data updating');
    }
})
router.delete('/delete/:id',verifyToken, async (req, res)=>{
    try{
        const id=req.params.id;
        await PatientModel.findByIdAndDelete(id);
        // Also delete associated appointments
        await AppointmentModel.deleteMany({patient_id:id})
        res.status(200).send({message:'Patient & related appointments deleted successfully'});
    }
    catch (error) {
        res.status(404).send('Error fetching patients');
    }
})
router.get('/:id',verifyToken, async(req, res)=>{
    try{
        const patient = await PatientModel.findById(req.params.id);
    if (!patient) {
      return res.status(404).send('Patient not found');
    }
   res.status(200).send(patient)
   }catch(error){
        res.status(500).send('Server error')
    }
})
// route for combined form
router.post('/registerPatientWithAppointment', verifyToken, async (req, res) => {
  try {
    const { patientData, appointmentData } = req.body;

    if (!patientData || !appointmentData) {
      return res.status(400).send({ message: "patientData and appointmentData required" });
    }

    //Generate OPD ID and attach to patient data
    const opd_id = await generateOPDId();
    patientData.opd_id = opd_id;

    // Create Patient
    const newPatient = await PatientModel.create(patientData);

    //Prepare Appointment
    appointmentData.patient_id = newPatient._id;
    // initially it contains
    //   {
    // "doctor_id": "doc123",
    // "appointment_date": "2025-02-11",
    // "time_slot": "10:00",
    // "status": "scheduled",
    // "created_by": "receptionist123"
    // }
    //now backend add patient id to appointmentData

    const doctor_id = appointmentData.doctor_id;
    const appointment_date_raw = appointmentData.appointment_date;

    if (!doctor_id || !appointment_date_raw) {
      return res.status(400).send({ message: "doctor_id and appointment_date required" });
    }

    const dateStart = new Date(appointment_date_raw);
    dateStart.setHours(0, 0, 0, 0);

    const dateEnd = new Date(appointment_date_raw);
    dateEnd.setHours(23, 59, 59, 999);

    const count = await AppointmentModel.countDocuments({
      doctor_id,
      appointment_date: { $gte: dateStart, $lte: dateEnd } //how many patients registered today
    });

    appointmentData.token_number = count + 1;
    appointmentData.appointment_date = dateStart;

    //Save Appointment
    const newAppointment = await AppointmentModel.create(appointmentData);

    res.status(200).send({
      message: "Patient & Appointment created successfully",
      patient: newPatient,
      appointment: newAppointment
    });

  } catch (error) {
    console.error("Error registerPatientWithAppointment:", error);
    res.status(500).send({ message: 'Error creating patient + appointment' });
  }
}); 

module.exports=router