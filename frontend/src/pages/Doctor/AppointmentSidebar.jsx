import React from 'react';
import { NavLink } from 'react-router-dom';
import './DoctorDashboard.css';

export default function AppointmentSidebar({ sidebarOpen }) {
  return (
    <div className={`sidebar ${sidebarOpen ? 'show' : ''}`}>
      <ul style={{ marginTop: '60px' }}>

        <li>
          <NavLink to="/doctor/dashboard">Today Appointments</NavLink>
        </li>

        <li>
          <NavLink to="/doctor/consultation">Consultation</NavLink>
        </li>

        <li>
          <NavLink to="/doctor/patient-history">Patient History</NavLink>
        </li>

      </ul>
    </div>
  );
}
