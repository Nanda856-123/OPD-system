import React from 'react'
import PatientForm from '../../components/PatientForm'
import Sidebar from './Sidebar';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";

const RegisterPatient = () => {


  return (
    <div className="main-container register-page">
      <Sidebar />
      <div className="main">
        <div className="dashboard-title">
          <div className="d-flex">
            <div className="icon-shape text-white shadow">
              <Link className='text-white' to='/patients'><IoArrowBack className='fs-2' /></Link>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {/* <Link to='/patients'><Button><ArrowBackIcon/> Back</Button></Link> */}
            <PatientForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPatient
