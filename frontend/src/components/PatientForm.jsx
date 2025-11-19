import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from './Button';
import toast from 'react-hot-toast';
import { useNavigate,useLocation } from 'react-router-dom';
import {TextField,MenuItem,FormControl,InputLabel,Select} from "@mui/material";

const PatientForm = () => {
  const location=useLocation();
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
  useEffect(()=>{
    if(location.state!==null){
        setPatient({
             name: location.state.currPatient.name,
            gender: location.state.currPatient.gender,
            age: location.state.currPatient.age,
            email: location.state.currPatient.email,
            address: location.state.currPatient.address,
            contact_number: location.state.currPatient.contact_number,
            registered_date: location.state.currPatient.registered_date
        })
    }else{
        setPatient({
            name: "",
            gender: "",
            age: "",
            email: "",
            address: "",
            contact_number: "",
            registered_date: ""
        })
    }
  },[])
 

  const inputHandler = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

   if(location.state!==null){
     try {
      const res = await axios.put(`http://localhost:3000/patient/edit/${location.state.currPatient._id}`,patient);
      toast.success(res.data.message);
      navigate('/patients');
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        alert(error.message);
      }
    }
   }else{
     try {
      const res = await axios.post('http://localhost:3000/patient/regPatient', patient);
      toast.success(res.data.message);
      navigate('/patients');
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        alert(error.message);
      }
    }
   }
  };

  return (
    <div className="card register-patient-card mt-5">
      <div className="card-header border-0 p-3 mb-3">
      <h6>REGISTER PATIENT</h6>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={patient.name}
          onChange={inputHandler}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={patient.email}
          onChange={inputHandler}
        />
        <select name="gender" value={patient.gender} onChange={inputHandler}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="number"
          placeholder="Age"
          name="age"
          value={patient.age}
          onChange={inputHandler}
        />
        <input
          type="number"
          placeholder="Phone"
          name="contact_number"
          value={patient.contact_number}
          onChange={inputHandler}
        />
        <textarea
          placeholder="Address"
          name="address"
          value={patient.address}
          onChange={inputHandler}
        ></textarea>
        <input
          type="date"
          name="registered_date"
          value={patient.registered_date}
          onChange={inputHandler}
        />
        <Button type="submit" disabled={!patient.name.trim()}>Register</Button>
      </form>
    </div>
  );
};

export default PatientForm;
