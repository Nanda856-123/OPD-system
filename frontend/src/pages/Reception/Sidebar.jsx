import React from 'react'
import { NavLink } from 'react-router-dom'
import { BsDropletFill } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { FaUsers } from "react-icons/fa";
import { MdOutlineGeneratingTokens } from "react-icons/md";


const Sidebar = ({ sidebarOpen }) => {
  return (
    <div className={`sidebar bg-white ${sidebarOpen ? 'show' : ''}`}>
      <ul style={{ marginTop: '7px' }}>
        <li className='prim-colour'>
          <BsDropletFill/>
          <h4 className='mb-3'>OPD System</h4>
          <hr />
        </li>
        <li>
          <NavLink to="/reception-dashboard"  className={({ isActive }) => (isActive ? 'active prim-bg' : '')}>
            <LuLayoutDashboard/> <span className='m-3'>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/appointments" className={({ isActive }) => (isActive ? 'active prim-bg' : '')}>
            <SlCalender/><span className='m-3'>Appointment</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/patients" className={({ isActive }) => (isActive ? 'active prim-bg' : '')}>
            <FaUsers/><span className='m-3'>Patients</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active prim-bg' : '')}>
            <MdOutlineGeneratingTokens/><span className='m-3'>Tokens</span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
