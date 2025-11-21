const express= require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const AppointmentModel=require("../model/Appointment");
const DoctorModel=require("../model/Doctor")
const verifyToken = require('../middleware/verifyToken')

router.get('/',verifyToken,async(req,res)=>{
    try{
        const appointments=await AppointmentModel.find()
        .populate('doctor_id','name')
        .populate('patient_id','name')
        res.status(200).send(appointments);
    }
    catch(error){
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
        res.status(404).send('Error in booking appointment');
    }
})
router.put('/edit/:id',verifyToken,async(req,res)=>{
    try{
        const id=req.params.id;
        await AppointmentModel.findByIdAndUpdate(id,req.body);
        res.status(200).send({message:'Appointment updated successfully'});
    }
    catch(error){
        res.status(404).send('Error in updating appointment');
    }
})
router.get("/doctor", verifyToken, async (req, res) => {
  try {
    const doctor = await DoctorModel.findOne({ email: req.user.email }); //req.user is why bcz,The user already logged in,
    //Token stored in frontend,Token decoded via verifyToken and Email available in req.user.email
    //structure will be
    //{ "email": "dr.neha@hospital.com", "password": "Sharma@156", "iat": 1732178392 }
    //because in authRoutes, our payload is same ie,let payload={email:user.email,password:user.password}
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
module.exports=router