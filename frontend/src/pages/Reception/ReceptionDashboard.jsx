import React, { useState } from 'react'
import './ReceptionDashboard.css'
import axios from "axios"
import {  useNavigate } from 'react-router-dom';

const ReceptionDashboard = () => {

  const navigate=useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

  const appointments = [
    { name: "John Doe", doctor: "Dr. Jane Doe" },
    { name: "Mary Smith", doctor: "Dr. John Smith" },
    { name: "James Brown", doctor: "Dr. Alice Johnson" },
  ];

  const tokens = [
    { token: "001", patient: "John Doe", doctor: "Dr. Jane Doe", time: "9:00 AM" },
    { token: "002", patient: "Mary Smith", doctor: "Dr. John Smith", time: "10:00 AM" },
    { token: "003", patient: "James Brown", doctor: "Dr. Alice Johnson", time: "11:00 AM" },
  ]; 

    const [form, setForm] = useState({ name:"", age:"", gender:"", contact_number:"", address:"" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/pat/patients", form);
    alert("Patient Registered");
  };

  const addData=()=>{
    navigate('/reg');
  }

  return (
    <div>
       
            <div className="main-container">
            {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "show" : ""}`}>
        <h3>Menu</h3>
        <ul>
          <li>Dashboard</li>
          <li>Appointments</li>
          <li onClick={addData}>Register</li>
        </ul>
      </div>

      {/* Content */}
      <div className="content">

        <h2>Receptionist Dashboard</h2>

        <div className="grid">

          {/* Register Patient Card */}
          <div className="card">
            <h3>Register Patient</h3>
            <form className="form" >
              <input type="text" placeholder="Full Name" name='name' onChange={(e)=>setForm({...form, name:e.target.value})} />
              <input type="email" placeholder="Email" name='email' onChange={(e)=>setForm({...form, name:e.target.value})}/>
              <select name='gender' onChange={(e)=>setForm({...form, name:e.target.value})}>
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
             { /*<input type="date" /> */}
               <input type="number" placeholder="Age"  name='age' onChange={(e)=>setForm({...form, name:e.target.value})}/>
              <input type="number" placeholder="Phone" name='contact_number' onChange={(e)=>setForm({...form, name:e.target.value})}/>
              <textarea placeholder="Address" name='address' onChange={(e)=>setForm({...form, name:e.target.value})}></textarea>
              <input type="date" placeholder='Registered date' name='registered_date' onChange={(e)=>setForm({...form, name:e.target.value})}/>
              <button type="submit" onSubmit={handleSubmit}>Register</button>
            </form>
          </div>
          
          {/* Appointments Card */}
          <div className="card">
            <h3>Appointments</h3>
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
                      <td><button className="schedule-btn">Schedule</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tokens Card */}
          <div className="card">
            <h3>Tokens</h3>
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

          {/* Reports */}
          <div className="card reports">
            <h3>Reports</h3>
            <button>Generate Daily Report</button>
            <button>Generate Monthly Report</button>
          </div>

        </div>
      </div>
    </div>
      
    </div>
  )
}

export default ReceptionDashboard
