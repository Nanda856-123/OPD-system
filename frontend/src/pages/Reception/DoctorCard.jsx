import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import axios from 'axios'
import toast from 'react-hot-toast'

const DoctorCard = () => {
      const [doctors, setDoctors] = useState([])
      useEffect(() => {
        axios.get('http://localhost:3000/doctor').then((res)=>{
            setDoctors(res.data)
        })
        .catch((error)=>{
        if (error.response && error.response.data) {
                toast.error(error.response.data.message);
              } else {
                alert(error.message);
              }
    })
      },[])
  return (
    <div className="card">
      <h4 className='mb-4' style={{textAlign:'center'}}>Doctors available</h4>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Doctors</th>
              <th>Departments</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id}>
                <td>{doctor.name}</td>
                <td>{doctor.department_id?.department_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card mt-4 w-25">
        <h2>{doctors.length}</h2>
        <div>Doctors</div>
      </div>
    </div>
  )
}

export default DoctorCard
