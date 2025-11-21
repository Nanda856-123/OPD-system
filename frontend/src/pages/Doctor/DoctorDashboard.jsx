import React from 'react'
import { useEffect } from 'react'
import axiosInstance from '../../axiosinterceptor'
import toast from 'react-hot-toast'
import { useState } from 'react'

const DoctorDashboard = () => {
  let[appointments, setAppointments]= useState([])
    useEffect(()=>{
    axiosInstance.get('/appointments/doctor').then((res)=>{
        setAppointments(res.data)
    })
    .catch((error)=>{
        if (error.response && error.response.data) {
                toast.error(error.response.data.message);
              } else {
                alert(error.message);
              }
    })
  },[])
  console.log(appointments)
  return (
    <div>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            {appointment.patient_id?.name} — <strong>date:</strong>{appointment.appointment_date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorDashboard
