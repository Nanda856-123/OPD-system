import React from 'react'
import PatientForm from '../../components/PatientForm'
import Sidebar from './Sidebar';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const RegisterPatient = () => {


  return (

    <div className="add-patient">
      <div className="container">
        <div className="row">
        <Link to='/patients'><Button><ArrowBackIcon/> Back</Button></Link>
          <PatientForm />
        </div>
      </div>
    </div>
    
  );
}

export default RegisterPatient
