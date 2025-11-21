import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosinterceptor'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

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
  return (
    <div>
      
    </div>
  )
}

export default PatientDetail
