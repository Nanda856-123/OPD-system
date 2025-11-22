import './App.css'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import {Login, AdminDashboard, ReceptionDashboard, DoctorDashboard,Patients,RegisterPatient,
  AppointmentForm,Appointments,PatientDetail,Departments,Doctors,Schedules
} from './pages'
import { Toaster } from 'react-hot-toast'
import PrivateRoutes from './components/PrivateRoutes'

function App() {

  return (
    <>
    <Toaster position="top-center"/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route element={<PrivateRoutes/>}>
          <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
          <Route path='/admin/departments' element={<Departments />} />
          <Route path='/admin/doctors' element={<Doctors />} />
          <Route path='/admin/schedules' element={<Schedules />} />
          <Route path='/reception-dashboard' element={<ReceptionDashboard/>}/>
          <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
          <Route path='/patients' element={<Patients/>}/>
          <Route path='/add-patient' element={<RegisterPatient/>}/>
          <Route path='/appointments' element={<Appointments/>}/>
          <Route path='/appointment-form' element={<AppointmentForm/>}/>
          <Route path='/patients/:id' element={<PatientDetail/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
