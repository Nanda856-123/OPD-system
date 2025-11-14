import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = ({ sidebarOpen }) => {
  return (
    <div className={`sidebar ${sidebarOpen ? 'show' : ''}`}>
      <ul style={{ marginTop: '60px' }}>
        <li>
          <NavLink to="/reception-dashboard"  className={({ isActive }) => (isActive ? 'active' : '')}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/appointments" className={({ isActive }) => (isActive ? 'active' : '')}>
            Appointment
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-patient" className={({ isActive }) => (isActive ? 'active' : '')}>
            Register
          </NavLink>
        </li>
        <li>
          <NavLink to="/patients" className={({ isActive }) => (isActive ? 'active' : '')}>
            Patients
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
