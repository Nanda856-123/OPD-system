import React, { useEffect, useState } from 'react'
import Button from '../../components/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';


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
          token_number: location.state.appointment.token_number || "",
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
          token_number: "",
          status: "scheduled",
          registered_date: "",
          created_by: JSON.parse(receptionist)._id,
          createdAt: new Date()
        };
    const [appointment, setAppointment] = useState(initialAppointment);
    useEffect(() => {
      axios.all([ axios.get('http://localhost:3000/doctor'),axios.get('http://localhost:3000/patient')])
        .then(([docsRes, patsRes]) => {
          setDoctors(docsRes.data || []);
          setPatients(patsRes.data || []);
        })
        .catch(error => {
          toast.error(error.response?.data?.message || error.message);
        });
    }, []);
    const handleSubmit = () => {
      if (location.state && location.state.appointment) {
        //edit
        axios.put(`http://localhost:3000/appointments/edit/${location.state.appointment._id}`, appointment).then(res => {
            toast.success(res.data.message);
            navigate('/appointments');
        })
        .catch(error => {
            toast.error(error.response?.data?.message || error.message);
          });
      }else{
        //add
        axios.post('http://localhost:3000/appointments/addAppointment', appointment)
          .then(res => {
            toast.success(res.data.message);
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
    <div className="appointment-form d-flex justify-content-center align-items-center vh-100 w-50 mx-auto">
        <div className='container'>
        <Link to='/appointments'><Button><ArrowBackIcon/> Back</Button></Link>
            <div className="card mt-3">
            <h4 className='mb-4' style={{textAlign:'center'}}>Schedule an appoinment</h4>
            <form className="form">
                <select name="patient_id" value={appointment.patient_id} onChange={inputHandler}>
                  <option value="">Select Patient</option>
                  {patients.length === 0 ? (
                    <option value="" disabled>Loading patients...</option>
                  ) : (
                    patients.map((p) => (
                      <option key={p._id} value={p._id}>{p.name}</option>
                    ))
                  )}
                </select>
                <select name="doctor_id" value={appointment.doctor_id} onChange={inputHandler}>
                  <option value="">Select Doctor</option>
                  {doctors.length === 0 ? (
                    <option value="" disabled>Loading doctors...</option>
                  ) : (
                    doctors.map((doc) => (
                      <option key={doc._id} value={doc._id}>{doc.name}</option>
                    ))
                  )}
                </select>
                <input
                type="date"
                name="appointment_date"
                value={appointment.appointment_date}
                onChange={inputHandler}
                />
                <input
                type="time"
                name="time_slot"
                value={appointment.time_slot}
                onChange={inputHandler}
                />
                <input
                type="number"
                placeholder="Token Number"
                name="token_number"
                value={appointment.token_number}
                onChange={inputHandler}
                />
                <input
                type="date"
                name="registered_date"
                value={appointment.registered_date}
                onChange={inputHandler}
                />
                <Button btnHandler={handleSubmit}>Schedule</Button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default AppointmentForm
