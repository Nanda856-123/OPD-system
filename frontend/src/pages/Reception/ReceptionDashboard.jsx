import React from 'react'
import './ReceptionDashboard.css'

import Sidebar from './Sidebar'
import RegisterPatient from './RegisterPatient'
import DoctorCard from './DoctorCard'
import TokensCard from './TokensCard'
import PatientForm from '../../components/PatientForm'
import Button from '../../components/Button'

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

        <div style={{marginTop:'60px'}} className="content">
          <div className="grid">
            <PatientForm/>
            <DoctorCard />
            <TokensCard tokens={tokens} />

            {/* <div className="card reports">
              <h4 className='mb-4' style={{textAlign:'center'}}>Reports</h4>
              <div className='d-flex justify-content-around'>
                <Button>Generate Daily Report</Button>
              <Button>Generate Monthly Report</Button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReceptionDashboard
