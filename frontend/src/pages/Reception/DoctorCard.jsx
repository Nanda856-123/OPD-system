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
    <>
      <div class="card shadow mt-5">
        <div class="card-header border-0 p-3">
          <div class="row align-items-center">
            <div class="col">
              <h6 class="mb-0">AVAILABLE DOCTORS</h6>
            </div>
            <div class="col text-end">
              <a href="#!" class="btn btn-sm prim-bg">
                See all
              </a>
            </div>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table align-items-center table-flush">
            <thead class="thead-light">
              <tr>
                <th scope="col">SL NO</th>
                <th scope="col">Doctors</th>
                <th scope="col">Departments</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor, index) => (
                <tr key={doctor._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{doctor.name}</td>
                  <td>{doctor.department_id?.department_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DoctorCard
