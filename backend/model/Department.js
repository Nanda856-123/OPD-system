const mongoose=require('mongoose');
const DepartmentSchema =mongoose.Schema({
        name: String,
        createdAt: Date        
})

const DepartmentData=mongoose.model('department',DepartmentSchema );
module.exports=DepartmentData;
