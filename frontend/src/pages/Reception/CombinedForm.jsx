import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardHeader, Grid, TextField, MenuItem, FormControl, InputLabel, Select, Typography } from '@mui/material';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosInstance from '../../axiosinterceptor';
import Sidebar from './Sidebar';
import { IoArrowBack } from 'react-icons/io5';
import './CombinedForm.css'

const CombinedForm = () => {

  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  // Patient State
  const [patient, setPatient] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
    contact_number: "",
    address: "",
  });

  // Appointment State
  const [appointment, setAppointment] = useState({
    doctor_id: "",
    appointment_date: "",
    time_slot: "",
    status: "scheduled",
  });

  // Get logged in receptionist ID
  const user = localStorage.getItem("user");
  const created_by = user ? JSON.parse(user)._id : null;

  // Load Doctors
  useEffect(() => {
    axiosInstance.get("/doctor")
      .then((res) => {
        setDoctors(res.data || []);
        setLoadingDoctors(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message);
        setLoadingDoctors(false);
      });
  }, []);

  const handlePatientChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleAppointmentChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patient.name.trim()) return toast.error("Patient name is required");
    if (!appointment.doctor_id) return toast.error("Select a doctor");
    if (!appointment.appointment_date) return toast.error("Select appointment date");
    if (!appointment.time_slot) return toast.error("Select time slot");

    const payload = {
      patientData: { ...patient },
      appointmentData: { ...appointment, created_by },
    };

    try {
      const res = await axiosInstance.post(
        "/patient/registerPatientWithAppointment",
        payload
      );

      toast.success(res.data.message || "Registered successfully"); 
      console.log("OPD ID:", res.data.patient.opd_id); 
      navigate("/combined-summary", { state: res.data });

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="main-container">
      <Sidebar />

      <div className="main">

        {/* Back Button Bar */}
        <div className="dashboard-title">
          <div className="d-flex">
            <div className="icon-shape text-white shadow">
              <Link className="text-white" to="/appointments">
                <IoArrowBack className="fs-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Container */}
        <div className="container" >

          <Box className="combined-form">

            <Card sx={{ borderRadius: 3, boxShadow: 4, padding: "20px" }}>

              <CardHeader
                title={
                  <Typography variant="h6" fontWeight={700} textAlign="center">
                    Register Patient & Schedule Appointment
                  </Typography>
                }
                sx={{ background: "#f5f5f5", borderBottom: "1px solid #ddd" }}
              />

              <CardContent>

                <form onSubmit={handleSubmit}>
                <div>
                  

                    {/*  PATIENT DETAILS  */}

                    <Grid item xs={12} >
                      <Typography variant="subtitle1" fontWeight={700}>
                        Patient Details
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        variant="standard"
                        label="Full Name"
                        name="name"
                        value={patient.name}
                        onChange={handlePatientChange}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        variant="standard"
                        label="Email"
                        type="email"
                        name="email"
                        value={patient.email}
                        onChange={handlePatientChange}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth variant="standard">
                        <InputLabel>Gender</InputLabel>
                        <Select
                          name="gender"
                          value={patient.gender}
                          onChange={handlePatientChange}
                        >
                          <MenuItem value="">Select Gender</MenuItem>
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        label="Age"
                        name="age"
                        value={patient.age}
                        onChange={handlePatientChange}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        label="Contact Number"
                        name="contact_number"
                        value={patient.contact_number}
                        onChange={handlePatientChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        variant="standard"
                        label="Address"
                        name="address"
                        multiline
                        rows={2}
                        value={patient.address}
                        onChange={handlePatientChange}
                      />
                    </Grid>

                    {/* APPOINTMENT DETAILS */}

                    <Grid item xs={12} mt={3}>
                      <Typography variant="subtitle1" fontWeight={700}>
                        Appointment Details
                      </Typography>
                    </Grid>

                    {/* Doctor */}
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth variant="standard">
                        <InputLabel>Select Doctor</InputLabel>
                        <Select
                          name="doctor_id"
                          value={appointment.doctor_id}
                          onChange={handleAppointmentChange}
                        >
                          <MenuItem value="">Select Doctor</MenuItem>

                          {loadingDoctors ? (
                            <MenuItem value="" disabled>
                              Loading doctors…
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
                    </Grid><br />

                    {/* Appointment Date */}
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        type="date"
                        variant="standard"
                        label="Appointment Date"
                        name="appointment_date"
                        InputLabelProps={{ shrink: true }}
                        value={appointment.appointment_date}
                        onChange={handleAppointmentChange}
                      />
                    </Grid><br />

                    {/* Time Slot */}
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        type="time"
                        variant="standard"
                        label="Time Slot"
                        name="time_slot"
                        InputLabelProps={{ shrink: true }}
                        value={appointment.time_slot}
                        onChange={handleAppointmentChange}
                      />
                    </Grid>

                    {/* Submit */}
                    <Grid item xs={12} textAlign="center" mt={3}>
                      <Button type="submit">Submit</Button>
                    </Grid>

                   {/*  </Grid> */} 
                </div>
                </form>

              </CardContent>

            </Card>

          </Box>

        </div>
      </div>
    </div>
  );
};

export default CombinedForm;
