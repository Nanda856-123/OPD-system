const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const PatientModel=require("../model/Patient")


router.get('/', async(req, res) => {
    try {
        const patients = await PatientModel.find();
        res.status(200).send(patients);
    } catch (error) {
        res.status(404).send('Error fetching patients');
    }
})
router.post('/regPatient',async(req,res)=>{
    try {
        var patient=req.body;
        await PatientModel.create(patient)
        res.status(200).send({message:'patient registered successfully'});
    } catch (error) {
         res.status(404).send('Error in data addition');
    }
})
router.put('/edit/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        await PatientModel.findByIdAndUpdate(id,req.body)
        res.status(200).send({message:'Patient Updated successfully'});
    }
     catch (error) {
        res.status(404).send('Error in data updating');
    }
})
router.delete('/delete/:id', async (req, res)=>{
    try{
        const id=req.params.id;
        await PatientModel.findByIdAndDelete(id);
        res.status(200).send({message:'Patient deleted successfully'});
    }
    catch (error) {
        res.status(404).send('Error fetching patients');
    }
})

module.exports=router