import React from 'react';
import { NavLink } from 'react-router-dom';
import './DoctorDashboard.css';
import { BsDropletFill } from "react-icons/bs";
import { IoLogOutOutline } from 'react-icons/io5';
import { SlCalender } from "react-icons/sl";
import { FaUserDoctor } from 'react-icons/fa6';
import { MdHistory } from 'react-icons/md';

export default function Sidebar({ sidebarOpen }) {

  const onLogoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <div className={`sidebar ${sidebarOpen ? 'show' : ''}`}>
      <ul
        className="d-flex flex-column h-100"
        style={{ marginTop: '7px' }}
      >
        <li className='prim-colour'>
                  <BsDropletFill/>
                  <h4 className='mb-3'>OPD System</h4>
                  <hr />
                </li>
        <li>
          <NavLink to="/doctor/dashboard">
           <SlCalender/><span> Today's Appointments</span></NavLink>
        </li>

        <li>
          <NavLink to="/doctor/consultation">
          <FaUserDoctor/><span> Consultation</span></NavLink>
        </li>

        <li>
          <NavLink to="/doctor/patient-history">
          <MdHistory/><span> Patient History</span></NavLink>
        </li>

       <li className='flex-grow-1 d-flex align-items-end w-100'>
                 <NavLink onClick={onLogoutHandler} to="/" className={`w-100 ${({ isActive }) => (isActive ? 'active prim-bg' : '')}`}>
                   <IoLogOutOutline/><span className='m-3'>Logout</span>
                 </NavLink>
</li>





      </ul>
    </div>
  );
}
