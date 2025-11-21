const mongoose=require('mongoose');
const DoctorSchema=mongoose.Schema({
    name: String,
    department: {type:mongoose.Schema.Types.ObjectId, ref:'department'},
    qualification: String,
    availability_schedule: Array,
    contact: String,
    email: String,
    user_id: mongoose.Schema.Types.ObjectId
})

const DoctorData=mongoose.model('doctor',DoctorSchema);
module.exports=DoctorData;