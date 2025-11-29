import React from 'react'
import { NavLink } from 'react-router-dom'
import { BsDropletFill } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { FaUsers } from "react-icons/fa";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import HowToRegIcon from '@mui/icons-material/HowToReg';


const Sidebar = ({ sidebarOpen }) => {
  const onLogoutHandler=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')

  }
  return (
    <div className={`sidebar bg-white ${sidebarOpen ? 'show' : ''}`}>
      <ul className='d-flex flex-column h-100' style={{ marginTop: '7px' }}>
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
          <NavLink to="/register-patient-appointment" className={({ isActive }) => (isActive ? 'active prim-bg' : '')}>
            <HowToRegIcon/><span className='m-3'>Registration</span>
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
        <li className='flex-grow-1 d-flex align-items-end w-100'>
          <NavLink onClick={onLogoutHandler} to="/" className={`w-100 ${({ isActive }) => (isActive ? 'active prim-bg' : '')}`}>
            <IoLogOutOutline/><span className='m-3'>Logout</span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
