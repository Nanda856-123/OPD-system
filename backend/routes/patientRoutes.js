const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const Patient=require("../model/PatientReg")




router.post('/patients',async(req,res)=>{
    try {
        var item=req.body;
        const saveData=new Patient(item);
        await saveData.save();
        res.status(200).send('Emp data added');
    } catch (error) {
         res.status(404).send('Error in data addition');
    }
})


module.exports=router