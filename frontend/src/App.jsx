import './App.css'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import {Login, AdminDashboard, ReceptionDashboard, DoctorDashboard,Patients,RegisterPatient} from './pages'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
    <Toaster position="top-center"/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
        <Route path='/reception-dashboard' element={<ReceptionDashboard/>}/>
        <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
        <Route path='/patients' element={<Patients/>}/>
        <Route path='/add-patient' element={<RegisterPatient/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
