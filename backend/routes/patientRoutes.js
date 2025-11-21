const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const PatientModel=require("../model/Patient")
const AppointmentModel=require("../model/Appointment")
const verifyToken = require('../middleware/verifyToken')


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

module.exports=router