const express= require('express');
const router=express.Router();
router.use(express.json())
router.use(express.urlencoded({ extended: true }));
const DoctorModel=require("../model/Doctor")

router.get('/',async(req,res)=>{
    try{
        const doctors=await DoctorModel.find()
        .populate('department_id', 'department_name');
        res.status(200).send(doctors);
    }
    catch(error){
        console.error(error);
        res.status(404).send('Error fetching doctors');
    }
})
module.exports=router