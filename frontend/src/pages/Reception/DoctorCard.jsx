import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import toast from 'react-hot-toast'
import axiosInstance from '../../axiosinterceptor' 

const DoctorCard = () => {
      const [doctors, setDoctors] = useState([])
      useEffect(() => {
        axiosInstance.get('/doctor').then((res)=>{
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
      <div className="card shadow mt-5">
        <div className="card-header border-0 p-3">
          <div className="row align-items-center">
            <div className="col">
              <h6 className="mb-0">AVAILABLE DOCTORS</h6>
            </div>
            <div className="col text-end">
              <a href="#!" className="btn btn-sm prim-bg">
                See all
              </a>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table align-items-center table-flush">
            <thead className="thead-light">
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
                  <td>{doctor.department?.name}</td>
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
