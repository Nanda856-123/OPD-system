const mongoose=require('mongoose');
const DepartmentSchema =mongoose.Schema({
        department_name: String,
        description: String       
})

const DepartmentData=mongoose.model('department',DepartmentSchema );
module.exports=DepartmentData;