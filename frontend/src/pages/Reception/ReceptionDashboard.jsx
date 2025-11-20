import React from 'react'
import './ReceptionDashboard.css'

import Sidebar from './Sidebar'
import RegisterPatient from './RegisterPatient'
import DoctorCard from './DoctorCard'
import TokensCard from './TokensCard'
import PatientForm from '../../components/PatientForm'
import Button from '../../components/Button'
import ReceptionPageTitle from '../../components/ReceptionPageTitle'

const ReceptionDashboard = () => {

  const tokens = [
    { token: '001', patient: 'John Doe', doctor: 'Dr. Jane Doe', time: '9:00 AM' },
    { token: '002', patient: 'Mary Smith', doctor: 'Dr. John Smith', time: '10:00 AM' },
    { token: '003', patient: 'James Brown', doctor: 'Dr. Alice Johnson', time: '11:00 AM' },
  ]


  return (
    <div>
      <div className="main-container">
        <Sidebar />

        <div className='main'>
         <ReceptionPageTitle/>
          <div className="main-content">
            <div className="grid">
            <PatientForm/>
            <DoctorCard />
            <TokensCard tokens={tokens} />
            
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReceptionDashboard
