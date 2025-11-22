import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosinterceptor'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import Sidebar from './Sidebar'
import { IoArrowBack } from 'react-icons/io5'
import { CgProfile } from "react-icons/cg";
import { MdContactMail } from 'react-icons/md'


const PatientDetail = () => {
    const {id} =useParams()
    let[patient, setPatient]= useState(null)
 useEffect(()=>{
    axiosInstance.get(`/patient/${id}`).then((res)=>{
        setPatient(res.data)
    }).catch((error)=>{
        if (error.response && error.response.data) {
                toast.error(error.response.data.message);
              } else {
                alert(error.message);
              }
    })
 },[id])
 console.log(patient)
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts[1]?.[0] || "";
    return (first + last).toUpperCase();
  };
  return (
     <div>
      <div className="main-container">
        <Sidebar />

        <div className='main'>
         <div className="dashboard-title">
          <div className="d-flex">
            <div className="icon-shape text-white shadow">
              <Link className="text-white" to="/patients">
                <IoArrowBack className="fs-2" />
              </Link>
            </div>
          </div>
          <li className='user-avatar prim-color-light'><span> {getInitials(patient?.name)}</span></li>
        </div>
          <div className="main-content">
            <div className="container">
              <div className="row mt-5 text-center">
                <div className="user-details-card">
                    <ul className='mt-5'>
                        <li><b>{patient?.name}</b></li>
                        <li>Contact : {patient?.contact_number}</li>
                        <li>{patient?.email}</li>
                    </ul>
                </div>
                <div className="text-start user_personal-info user-details-card">
                    <div className="title d-flex align-items-center mb-5">
                        <MdContactMail />
                    <h5 style={{paddingLeft:'10PX'}} className='mb-0'>Personal Information</h5>
                    </div>
                    <ul>
                        <li>
                            <span>Email</span>
                            <a href="">{patient?.email}</a>
                        </li>
                        <hr />
                        <li>
                            <span>Gender</span>
                            <span>{patient?.gender}</span>
                        </li>
                        <hr />
                        <li>
                            <span>Address</span>
                            <span>{patient?.address}</span>
                        </li>
                        <hr />
                        <li>
                            <span>Phone number</span>
                            <span>{patient?.contact_number}</span>
                        </li>
                    </ul>

                </div>
                <div className="user_history-info user-details-card">
                    <div className="title d-flex align-items-center mb-5">
                        <MdContactMail />
                    <h5 style={{paddingLeft:'10PX'}} className='mb-0'>Patient history</h5>
                    </div>
                   <p>Needs to be filled!!</p>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDetail
