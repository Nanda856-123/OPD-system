import './App.css'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import {Login, AdminDashboard, ReceptionDashboard, DoctorDashboard,Patients,RegisterPatient,
  AppointmentForm,Appointments,PatientDetail,Departments,Doctors,Schedules
} from './pages'
import { Toaster } from 'react-hot-toast'
import PrivateRoutes from './components/PrivateRoutes'
import CombinedForm from './pages/Reception/CombinedForm'
import CombinedSummary from './pages/Reception/CombinedSummary'

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
          <Route path='/register-patient-appointment' element={<CombinedForm/>}/>
          <Route path='/combined-summary' element={<CombinedSummary/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
