import React from 'react'

const TokensCard = ({ tokens = [] }) => {
  return (
    <div className="card">
    <h4 className='mb-4' style={{textAlign:'center'}}>Tokens</h4>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Appointment</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((item, index) => (
              <tr key={index}>
                <td>{item.token}</td>
                <td>{item.patient}</td>
                <td>{item.doctor}</td>
                <td>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TokensCard
