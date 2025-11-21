const express= require('express')
const app=express()
require('dotenv').config()
require('./db/connection')
const cors= require('cors')

const PORT=process.env.PORT || 3000
const authRoutes= require('./routes/authRoutes')
const patientRoutes=require('./routes/patientRoutes')
const doctorRoutes=require('./routes/doctorRoutes')
const appointmentRoutes=require('./routes/appointmentRoutes')
require('./model/Department')
// Ensure models are registered with mongoose before using routes that populate them

app.use(cors())
app.use(express.json())

app.use('/auth',authRoutes)
app.use('/patient',patientRoutes)
app.use('/doctor',doctorRoutes)
app.use('/appointments',appointmentRoutes)

// Health check
app.get('/health', (req, res) => {
	res.json({
		status: 'ok',
		uptime: process.uptime(),
		timestamp: new Date().toISOString(),
	})
})
app.listen(PORT,()=>{
console.log(`server running on port ${PORT}`)
})