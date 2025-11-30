import React, { useEffect, useState } from 'react'
import Button from '../../components/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { IoArrowBack } from "react-icons/io5";
import { Box, Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import axiosInstance from '../../axiosinterceptor'

const AppointmentForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [doctors, setDoctors] = useState([])
    const [patients, setPatients] = useState([])

    const receptionist = localStorage.getItem('user');
    const initialAppointment = location.state && location.state.appointment
      ? {
          patient_id: location.state.appointment.patient_id?._id || "",
          doctor_id: location.state.appointment.doctor_id?._id || "",
          appointment_date: location.state.appointment.appointment_date || "",
          time_slot: location.state.appointment.time_slot || "",
         // token_number: location.state.appointment.token_number || "",
          status: location.state.appointment.status || "scheduled",
          registered_date: location.state.appointment.registered_date || "",
          created_by: JSON.parse(receptionist)._id,
          createdAt: new Date()
        }
      : {
          patient_id: "",
          doctor_id: "",
          appointment_date: "",
          time_slot: "",
        //  token_number: "",
          status: "scheduled",
          registered_date: "",
          created_by: JSON.parse(receptionist)._id,
          createdAt: new Date()
        };
    const [appointment, setAppointment] = useState(initialAppointment);
    useEffect(() => {
      Promise.all([ axiosInstance.get('/doctor'),axiosInstance.get('/patient')])
        .then(([docsRes, patsRes]) => {
          setDoctors(docsRes.data || []);
          setPatients(patsRes.data || []);
        })
        .catch(error => {
          toast.error(error.response?.data?.message || error.message);
        });
    }, []);
    const handleSubmit = (e) => {
      e.preventDefault();
      if (location.state && location.state.appointment) {
        //edit
        axiosInstance.put(`/appointments/edit/${location.state.appointment._id}`, appointment).then(res => {
            toast.success(res.data.message);
            navigate('/appointments');
        })
        .catch(error => {
            toast.error(error.response?.data?.message || error.message);
          });
      }else{
        //add
        axiosInstance.post('/appointments/addAppointment', appointment)
          .then(res => {
           // toast.success(res.data.message);
           toast.success(`Appointment booked! Token: ${res.data.token_number}`);
            navigate('/reception-dashboard');
          })
          .catch(error => {
            toast.error(error.response?.data?.message || error.message);
          });
      }
      
    }
     const inputHandler = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };
  return (
    <div className="main-container">
      <Sidebar />
      <div className="main">
        <div className="dashboard-title">
          <div className="d-flex">
            <div className="icon-shape text-white shadow">
              <Link className="text-white" to="/appointments">
                <IoArrowBack className="fs-2" />
              </Link>
            </div>
          </div>
        </div>
        <div className="container">
          <Box className="appointment-form">
            <Card sx={{ borderRadius: 3, boxShadow: 4, padding: "20px" }}>
              <CardHeader
                title={
                  <Typography variant="h6" fontWeight={700} textAlign="center">
                    Schedule Appointment
                  </Typography>
                }
                sx={{ background: "#f5f5f5", borderBottom: "1px solid #ddd" }}
              />

              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div>
                    {/* Patient Select */}
                    <Grid item xs={12}>
                      <FormControl fullWidth variant="standard">
                        <InputLabel>Select Patient</InputLabel>
                        <Select
                          name="patient_id"
                          value={appointment.patient_id}
                          onChange={inputHandler}
                          label="Select Patient"
                          disabled
                        >
                          <MenuItem value="">Select Patient</MenuItem>
                          {patients.length === 0 ? (
                            <MenuItem value="" disabled>
                              Loading patients...
                            </MenuItem>
                          ) : (
                            patients.map((p) => (
                              <MenuItem key={p._id} value={p._id}>
                                {p.name}
                              </MenuItem>
                            ))
                          )}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Doctor Select */}
                    <Grid item xs={12} mt={2}>
                      <FormControl fullWidth variant="standard">
                        <InputLabel>Select doctor</InputLabel>
                        <Select
                          name="doctor_id"
                          value={appointment.doctor_id}
                          onChange={inputHandler}
                          label="Select Doctor"
                        >
                          <MenuItem value="">Select Doctor</MenuItem>
                          {doctors.length === 0 ? (
                            <MenuItem value="" disabled>
                              Loading doctors...
                            </MenuItem>
                          ) : (
                            doctors.map((doc) => (
                              <MenuItem key={doc._id} value={doc._id}>
                                {doc.name}
                              </MenuItem>
                            ))
                          )}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Appointment Date */}
                    <Grid item xs={12} mt={2}>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="date"
                        label="Appointment Date"
                        name="appointment_date"
                        InputLabelProps={{ shrink: true }}
                        value={appointment.appointment_date}
                        onChange={inputHandler}
                      />
                    </Grid>

                    {/* Time Slot */}
                    <Grid item xs={12} mt={2}>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="time"
                        label="Time Slot"
                        name="time_slot"
                        InputLabelProps={{ shrink: true }}
                        value={appointment.time_slot}
                        onChange={inputHandler}
                      />
                    </Grid>

                    {/* Token Number */}
                   {/* <Grid item xs={12} mt={2}>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        label="Token Number"
                        name="token_number"
                        value={appointment.token_number}
                        onChange={inputHandler}
                      />
                    </Grid> */}

                    {/* Registered Date */}
                    <Grid item xs={12} mt={2}>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="date"
                        label="Registered Date"
                        name="registered_date"
                        InputLabelProps={{ shrink: true }}
                        value={appointment.registered_date}
                        onChange={inputHandler}
                      />
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12} textAlign="center" mt={3}>
                      <Button type="submit">Schedule</Button>
                    </Grid>
                  </div>
                </form>
              </CardContent>
            </Card>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm
