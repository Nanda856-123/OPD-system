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

        <div className="content">
          <div className="container">
        <div className="row">
            <div className="w-100">
        <div className="home_employee-lists m-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mt-5 mb-5" style={{ fontSize: "30px" }}>
              Patients List
            </h4>
           
              <Link to="/add-patient">
              <Button>
                <AddIcon/>
              </Button>
            </Link>
        
          </div>
          <TableContainer className="display-lg" component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="employees table">
              <TableHead>
                <TableRow>
                    <TableCell>SL No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Registered Date</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.length > 0 ? (
                  patients.map((patient, index) => (
                    <TableRow
                      key={index}
                    >
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
                        <button onClick={()=>editPatientHandler(patient)} className="btn-edit action-btn mb-2" variant="text">
                          <Link to=''>Edit</Link>
                        </button>
                        <button onClick={()=>deletePatientHandler(patient)} className="btn-dlt action-btn mb-2" variant="text">
                          <Link to=''>Delete</Link>
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

          <div className="display-mob">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  {patients.map((emp, index) => (
                    <div
                      key={index}
                      className="card p-3 d-flex align-items-center mb-3"
                    >
                      <div className="card-body text-center ">
                        <h5 className="card-title">id:{emp.id}</h5>
                        <p className="card-text">{emp.name}</p>
                        <a href="#" className="">
                          {emp.email}
                        </a>
                        <p className="card-text">ph:{emp.contact_number}</p>
                        {/* <button className="btn-view mb-2" variant="text">
                          <Link to=''>View</Link>
                        </button> */}
                        <button className="btn-edit mb-2" variant="text">
                          <Link to=''>Edit</Link>
                        </button>
                        <button className="btn-dlt mb-2" variant="text">
                          <Link to=''>Delete</Link>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
        </div>
    </div>
        </div>
      </div>
      {isDeletePopupOpen &&(
        <DeletePopup item={currPatient} confirmDeleteHandler={confirmDeleteHandler} cancelDeleteHandler={cancelDeleteHandler}/>
      )}
</div>
 
  )
}

export default Patients
