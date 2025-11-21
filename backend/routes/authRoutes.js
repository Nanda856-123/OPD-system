const express= require('express')
const router=express.Router()
const userModel=require('../model/User')
const jwt=require('jsonwebtoken')

router.post("/login", async(req,res)=>{
    try{
        console.log("Login Request Body:", req.body);
    const user= await userModel.findOne({email:req.body.email})
    if(!user){
      return  res.status(404).send({message:"user not found"})
    }else{
        if(user.password===req.body.password){
            let payload={email:user.email,password:user.password}
            const token=jwt.sign(payload,'opd_secret_key')
              res.status(200).send({message:"login successful",token:token,user:user})
        }else{
              res.status(401).send({message:"invalid credential"})
        }
    }

    }catch(error){
        res.status(500).send("server error")
    }
})

module.exports=router