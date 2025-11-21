import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import {Card,  CardContent,CardHeader,Grid,TextField,MenuItem,FormControl,InputLabel,Select,Box,Typography,} from "@mui/material";
import Button from './Button';


const PatientForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [patient, setPatient] = useState({
    name: "",
    gender: "",
    age: "",
    email: "",
    address: "",
    contact_number: "",
    registered_date: ""
  });

  useEffect(() => {
    if (location.state !== null) {
      setPatient({ ...location.state.currPatient });
    } else {
      setPatient({
        name: "",
        gender: "",
        age: "",
        email: "",
        address: "",
        contact_number: "",
        registered_date: ""
      });
    }
  }, []);

  const inputHandler = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;
      if (location.state !== null) {
        res = await axios.put(
          `http://localhost:3000/patient/edit/${location.state.currPatient._id}`,
          patient
        );
      } else {
        res = await axios.post(
          'http://localhost:3000/patient/regPatient',
          patient
        );
      }

      toast.success(res.data.message);
      navigate('/patients');

    } catch (error) {
      if (error.response?.data) toast.error(error.response.data.message);
      else alert(error.message);
    }
  };

  return (
    <Box className='patient-form' mt={5}>
      <Card sx={{ borderRadius: 3, boxShadow: 4 ,padding:'20px'}}>
        <CardHeader
          title={
            <Typography variant="h6" fontWeight={700} textAlign="center">
              {location.state ? "Edit Patient" : "Register Patient"}
            </Typography>
          }
          sx={{ background: "#f5f5f5", borderBottom: "1px solid #ddd" }}
        />

        <CardContent className='hello'>
          <form onSubmit={handleSubmit}>
            {/* <Grid container spacing={3}> */}
              <div>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Full Name"
                  name="name"
                  value={patient.name}
                  onChange={inputHandler}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Email"
                  name="email"
                  type="email"
                  value={patient.email}
                  onChange={inputHandler}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth variant="standard">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={patient.gender}
                    onChange={inputHandler}
                    label="Gender"
                  >
                    <MenuItem value="">Select Gender</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Age"
                  name="age"
                  type="number"
                  value={patient.age}
                  onChange={inputHandler}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Contact Number"
                  name="contact_number"
                  type="number"
                  value={patient.contact_number}
                  onChange={inputHandler}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Address"
                  name="address"
                  multiline
                  rows={3}
                  value={patient.address}
                  onChange={inputHandler}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Registered Date"
                  name="registered_date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={patient.registered_date}
                  onChange={inputHandler}
                />
              </Grid>

              <Grid item xs={12} textAlign="center" mt={2}>
                <Button
                  type="submit"
                  disabled={!patient.name.trim()}
                >
                  {location.state ? "Update" : "Register"}
                </Button>
              </Grid>

            {/* </Grid> */}
            </div>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PatientForm;
