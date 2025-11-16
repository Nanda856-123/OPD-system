// src/App.jsx
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Public pages
import Login from './pages/Auth/Login';

// Admin / Reception (placeholders)
import AdminDashboard from './pages/Admin/AdminDashboard';
import ReceptionDashboard from './pages/Reception/ReceptionDashboard';

// Doctor pages & sidebar
import AppointmentSidebar from './pages/Doctor/AppointmentSidebar';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import Consultation from './pages/Doctor/Consultation';
import PatientHistory from './pages/Doctor/PatientHistory';

// Layout that places the sidebar on the left and renders child routes on the right.
function DoctorLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f6f7f8' }}>
      <aside style={{ width: 220, borderRight: '1px solid #e6e6e6', background: '#fff' }}>
        <AppointmentSidebar />
      </aside>

      <main style={{ flex: 1, padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          {/* Public / Auth */}
          <Route path="/" element={<Login />} />

          {/* Other roles */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/reception-dashboard" element={<ReceptionDashboard />} />
          

          {/* Doctor section uses a layout with sidebar + Outlet */}
          <Route path="/doctor" element={<DoctorLayout />}>
            {/* redirect /doctor -> dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />

            {/* Doctor pages */}
            <Route path="dashboard" element={<DoctorDashboard />} />
            <Route path="consultation" element={<Consultation />} />
            <Route path="consultation/:appointmentId" element={<Consultation />} />
            <Route path="patient-history" element={<PatientHistory />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
