const mongoose=require('mongoose')
const schema=mongoose.Schema({
name: String,
  email: String,
  password: String,
  role: String,
  status: Boolean,
  last_login: Date,
  createdAt: Date,
  updatedAt: Date
})
const userModel=mongoose.model('user',schema)
module.exports=userModel