const express= require('express')
const app=express()
require('dotenv').config()
require('./db/connection')
const cors= require('cors')
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');

const PORT=process.env.PORT || 3000


app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())

app.use('/auth',authRoutes);
app.use('/admin', adminRoutes);

// Health check
app.get('/health', (req, res) => {
	res.json({
		status: 'ok',
		uptime: process.uptime(),
		timestamp: new Date().toISOString(),
	})
})
app.get('/', (req, res) => {
  res.send('OPD Backend Running Successfully');
});

app.listen(PORT,()=>{
console.log(`server running on port ${PORT}`)
})