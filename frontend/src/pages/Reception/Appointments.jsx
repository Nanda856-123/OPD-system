import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import Button from '../../components/Button'
import AddIcon from '@mui/icons-material/Add';
import { FaUsers } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";


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

        <div className="main inner-page">
          <div className="dashboard-title">
            <div className="d-flex">
              <div className="icon-shape text-white shadow">
                <FaUsers />
              </div>
              <h4 style={{ fontSize: "30px", paddingLeft: "20PX" }}>
                All Appointments
              </h4>
            </div>
            <div className='col-xl-3 col-lg-6'>
                <div className="card  mt-3 card-stats mb-4 mb-xl-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="card-title text-uppercase text-muted">
                      Appointments
                    </h5>
                    <span className="h2 font-weight-bold">49</span>
                  </div>
                  <div className="col-auto">
                    <div className="icon-shape bg-danger text-white shadow">
                      <SlCalender />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="w-100">
                <div className="home_employee-lists m-4">
                  <div className="mb-3 mt-5">
                    <Link to="/appointment-form">
                      <Button>
                        <AddIcon />
                      </Button>
                    </Link>
                  </div>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="appointment table">
                      <TableHead className='prim-bg'>
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
                            <TableRow key={appointment._id}>
                              <TableCell component="th" scope="row">
                                {index + 1}
                              </TableCell>
                              <TableCell>
                                {appointment.patient_id?.name}
                              </TableCell>
                              <TableCell>
                                {appointment.doctor_id?.name}
                              </TableCell>
                              <TableCell>
                                {appointment.appointment_date}
                              </TableCell>
                              <TableCell>{appointment.time_slot}</TableCell>
                              <TableCell>{appointment.token_number}</TableCell>
                              <TableCell>{appointment.createdAt}</TableCell>
                              <TableCell>{appointment.status}</TableCell>
                              <TableCell>
                                <button
                                  onClick={() =>
                                    editAppointmentHandler(appointment)
                                  }
                                  className="btn-edit action-btn mb-2"
                                  variant="text"
                                >
                                  <Link to=""><FaEdit/></Link>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointments
