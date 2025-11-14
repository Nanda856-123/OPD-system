import React from 'react'
import Button from '../../components/Button'

const AppointmentsCard = ({ appointments }) => {
  return (
    <div className="card">
      <h4 className='mb-4' style={{textAlign:'center'}}>Appointments</h4>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.doctor}</td>
                <td>
                  <Button>Schedule</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AppointmentsCard
