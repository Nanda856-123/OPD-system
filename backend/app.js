const express= require('express')
const app=express()
require('dotenv').config()
require('./db/connection')
const cors= require('cors')

const PORT=process.env.PORT || 3000
const authRoutes= require('./routes/authRoutes')

app.use(cors())
app.use(express.json())

app.use('/auth',authRoutes)

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