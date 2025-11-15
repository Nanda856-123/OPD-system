import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import Button from '../../components/Button'
import AddIcon from '@mui/icons-material/Add';

const Appointments = () => {
  const navigate=useNavigate();
  const [appointments, setAppointments] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:3000/appointments').then((res)=>{
        setAppointments(res.data)
        // {
        // "_id": "...",
        // "doctor_id": { "_id": "...", "name": "Dr. Neha Sharma"}, not only id but also name
        // "patient_id": { "_id": "...", "name": "John Doe"},
        // "appointment_date": "2025-11-15"
        // ---------
        // }
    })
    .catch((error)=>{
        if (error.response && error.response.data) {
                toast.error(error.response.data.message);
              } else {
                alert(error.message);
              }
    })
  },[])
  const editAppointmentHandler=(appointment)=>{
    navigate('/appointment-form',{state:{appointment}})
  }
  return (
    <div>
        <div className="main-container">
        <Sidebar />

        <div className="content">
          <div className="container">
        <div className="row">
            <div className="w-100">
        <div className="home_employee-lists m-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mt-5 mb-5" style={{ fontSize: "30px" }}>
              Appointments
            </h4>
           
              <Link to="/appointment-form">
              <Button>
                <AddIcon/>
              </Button>
            </Link>
        
          </div>
          <TableContainer className="display-lg" component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="employees table">
              <TableHead>
                <TableRow>
                    <TableCell>SL No</TableCell>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Doctor Name</TableCell>
                  <TableCell>Appointment Data</TableCell>
                  <TableCell>Time slot</TableCell>
                  <TableCell>Token Number</TableCell>
                  <TableCell>Schedule at</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.length > 0 ? (
                  appointments.map((appointment, index) => (
                    <TableRow
                      key={appointment._id}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{appointment.patient_id?.name}</TableCell>
                      <TableCell>{appointment.doctor_id?.name}</TableCell>
                      <TableCell>{appointment.appointment_date}</TableCell>
                      <TableCell>{appointment.time_slot}</TableCell>
                      <TableCell>{appointment.token_number}</TableCell>
                      <TableCell>{appointment.createdAt}</TableCell>
                      <TableCell>{appointment.status}</TableCell>
                      <TableCell>
                        <button onClick={()=>editAppointmentHandler(appointment)} className="btn-edit action-btn mb-2" variant="text">
                          <Link to=''>Edit</Link>
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <strong>Oops..! No Appointments found</strong>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* <div className="display-mob">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  {patients.map((emp, index) => (
                    <div
                      key={index}
                      className="card p-3 d-flex align-items-center mb-3"
                    >
                      <div className="card-body text-center ">
                        <h5 className="card-title">id:{emp.id}</h5>
                        <p className="card-text">{emp.name}</p>
                        <a href="#" className="">
                          {emp.email}
                        </a>
                        <p className="card-text">ph:{emp.contact_number}</p>
                        <button className="btn-edit mb-2" variant="text">
                          <Link to=''>Edit</Link>
                        </button>
                        <button className="btn-dlt mb-2" variant="text">
                          <Link to=''>Delete</Link>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div> */}
        </div>
    </div>
        </div>
    </div>
        </div>
      </div>
    </div>
  )
}

export default Appointments
