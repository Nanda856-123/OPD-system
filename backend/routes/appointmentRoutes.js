const express= require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const AppointmentModel=require("../model/Appointment");

router.get('/',async(req,res)=>{
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
router.post('/addAppointment',async(req,res)=>{
    try{
        const appointment=req.body;
        await AppointmentModel.create(appointment);
        res.status(200).send({message:'Appointment booked successfully'});
    }
    catch(error){
        res.status(404).send('Error in booking appointment');
    }
})
router.put('/edit/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        await AppointmentModel.findByIdAndUpdate(id,req.body);
        res.status(200).send({message:'Appointment updated successfully'});
    }
    catch(error){
        res.status(404).send('Error in updating appointment');
    }
})

module.exports=router