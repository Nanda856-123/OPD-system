const mongoose=require('mongoose');
const AppointmentSchema=mongoose.Schema({
        patient_id: {type:mongoose.Schema.Types.ObjectId, ref:'patient'},
        doctor_id: {type:mongoose.Schema.Types.ObjectId, ref:'doctor'},
        appointment_date:{
                  type: Date,
                  set: (v) => {
                  const d = new Date(v);
                  d.setHours(0,0,0,0);
                 return d;
                 }
                },   
        time_slot: String,
        token_number: Number,       
        status: String,
        created_by: mongoose.Schema.Types.ObjectId, 
       // createdAt: Date        
}, { timestamps: true })

const AppointmentData=mongoose.model('appointment',AppointmentSchema);
module.exports=AppointmentData;