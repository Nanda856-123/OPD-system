import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../Reception/ReceptionDashboard.css'
import { Link,useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Sidebar from './Sidebar'
import AddIcon from '@mui/icons-material/Add';
import toast from 'react-hot-toast'
import DeletePopup from '../../components/DeletePopup'
import { FaUsers } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Patients = () => {
  const navigate=useNavigate();

  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const [currPatient, setCurrPatient] = useState(null)


  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:3000/patient')
      setPatients(response.data)
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Failed to fetch patients')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="card"><p>Loading patients...</p></div>
  }

  if (error) {
    return <div className="card"><p style={{ color: 'red' }}>{error}</p></div>
  }
const deletePatientHandler=(currPatient)=>{
    setIsDeletePopupOpen(true);
    setCurrPatient(currPatient);
}
const confirmDeleteHandler=()=>{
    axios.delete(`http://localhost:3000/patient/delete/${currPatient._id}`,).then((res)=>{
        toast.success(res.data.message);
        setPatients(patients.filter((patient)=>patient._id!==currPatient._id))
        setIsDeletePopupOpen(false);

    }).catch((error)=>{
        if (error.response && error.response.data) {
                toast.error(error.response.data.message);
              } else {
                alert(error.message);
              }
    })

}
const cancelDeleteHandler=()=>{
    setIsDeletePopupOpen(false);
    setCurrPatient(null);
}
const editPatientHandler=(currPatient)=>{
    navigate('/add-patient',{state:{currPatient}})
}
  return (
    <div>
      <div className="main-container">
        <Sidebar />

        <div className="main inner-page">
          <div className="dashboard-title">
            <div className="d-flex">
              <div className="icon-shape text-white shadow">
                <FaUsers />
              </div>
              <h4 style={{ fontSize: "30px", paddingLeft: "20PX" }}>
                Patients List
              </h4>
            </div>
            <div className='col-xl-3 col-lg-6'>
                <div className="card mt-3 card-stats mb-4 mb-xl-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="card-title text-uppercase text-muted">
                      Patients
                    </h5>
                    <span className="h2 font-weight-bold">49</span>
                  </div>
                  <div className="col-auto">
                    <div className="icon-shape bg-success text-white shadow">
                      <FaUsers />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            
          </div>
          <div className="container">
            <div className="row">
              <div className="w-100">
                <div className="home_employee-lists m-4">
                  <div className="mb-3 mt-5">
                    <Link to="/add-patient">
                      <Button>
                        <AddIcon />
                      </Button>
                    </Link>
                  </div>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="employees table">
                      <TableHead className='prim-bg'>
                        <TableRow>
                          <TableCell>SL No</TableCell>
                          <TableCell>NAME</TableCell>
                          <TableCell>AGE</TableCell>
                          <TableCell>GENDER</TableCell>
                          <TableCell>PHONE</TableCell>
                          <TableCell>ADDRESS</TableCell>
                          <TableCell>REGISTERED DATE</TableCell>
                          <TableCell>EMAIL</TableCell>
                          <TableCell>ACTIONS</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {patients.length > 0 ? (
                          patients.map((patient, index) => (
                            <TableRow key={index}>
                              <TableCell component="th" scope="row">
                                {index + 1}
                              </TableCell>
                              <TableCell>{patient.name}</TableCell>
                              <TableCell>{patient.age}</TableCell>
                              <TableCell>{patient.gender}</TableCell>
                              <TableCell>{patient.contact_number}</TableCell>
                              <TableCell>{patient.address}</TableCell>
                              <TableCell>{patient.registered_date}</TableCell>
                              <TableCell>{patient.email}</TableCell>
                              <TableCell>
                                {/* <button className="btn-view action-btn mb-2" variant="text">
                          <Link to=''>View</Link>
                        </button> */}
                                <button
                                  onClick={() => editPatientHandler(patient)}
                                  className="btn-edit action-btn mb-2"
                                  variant="text"
                                >
                                  <Link to="">
                                    <FaEdit />
                                  </Link>
                                </button>
                                <button
                                  onClick={() => deletePatientHandler(patient)}
                                  className="btn-dlt action-btn mb-2"
                                  variant="text"
                                >
                                  <Link to="">
                                    <MdDeleteOutline />
                                  </Link>
                                </button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} align="center">
                              <strong>Oops..! No Parients found</strong>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isDeletePopupOpen && (
        <DeletePopup
          item={currPatient}
          confirmDeleteHandler={confirmDeleteHandler}
          cancelDeleteHandler={cancelDeleteHandler}
        />
      )}
    </div>
  );
}

export default Patients
