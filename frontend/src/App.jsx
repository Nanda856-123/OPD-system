import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import {Login, AdminDashboard, ReceptionDashboard, DoctorDashboard,Patients,RegisterPatient,
  AppointmentForm,Appointments,PatientDetail,Departments,Doctors,Schedules, Consultation, PatientHistory
} from './pages'
import DoctorLayout from './pages/Doctor/DoctorLayout'   // new layout
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
          <Route path='/patients' element={<Patients/>}/>
          <Route path='/add-patient' element={<RegisterPatient/>}/>
          <Route path='/appointments' element={<Appointments/>}/>
          <Route path='/appointment-form' element={<AppointmentForm/>}/>
          <Route path='/patients/:id' element={<PatientDetail/>}/>
          <Route path='/register-patient-appointment' element={<CombinedForm/>}/>
          <Route path='/combined-summary' element={<CombinedSummary/>}/>

           {/* Backwards-compatible route that redirects to the new doctor layout */}
            <Route path='/doctor-dashboard' element={<Navigate to="/doctor/dashboard" replace />} />

            {/* Doctor layout — Sidebar shown for all nested doctor pages */}
            <Route path="/doctor" element={<DoctorLayout />}>
              <Route index element={<DoctorDashboard />} />                 {/* /doctor */}
              <Route path="dashboard" element={<DoctorDashboard/>} />     {/* /doctor/dashboard */}
              <Route path="consultation" element={<Consultation/>} />     {/* /doctor/consultation */}
              <Route path="patient-history" element={<PatientHistory/>} />{/* /doctor/patient-history */}
              <Route path="consultation/:id" element={<Consultation/>} /> {/* optional param for consult by id */}
            </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
