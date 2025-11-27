const mongoose=require('mongoose');
const PatientSchema=mongoose.Schema({
    name:String,
    email:String,
    age:String,
    gender:String ,
    contact_number:String ,
    address:String ,
    opd_id: {
        type: String,
        unique: true
    },
    // registered_date:Date, default: Date.now 
    registered_date:{ type: Date, default: Date.now }

})

const PatientData=mongoose.model('patient',PatientSchema);
module.exports=PatientData;