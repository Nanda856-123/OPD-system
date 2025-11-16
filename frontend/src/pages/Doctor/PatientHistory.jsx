// src/pages/Doctor/PatientHistory.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { getPatientHistory } from '../../api/doctorApi';
import { Box, Typography, Card, Button, CircularProgress, Stack, Alert } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AppointmentSidebar from './AppointmentSidebar';

export default function PatientHistory() {
  const [params] = useSearchParams();
  const patientId = params.get('id');
  const [consultations, setConsultations] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadHistory = useCallback(async () => {
    if (!patientId) return;
    setError(null);
    setLoading(true);
    try {
      const res = await getPatientHistory(patientId);
      const data = res?.data?.data || {};
      setConsultations(Array.isArray(data.consultations) ? data.consultations : []);
      setAppointments(Array.isArray(data.appointments) ? data.appointments : []);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || err.message || "Failed to load history");
      setConsultations([]); setAppointments([]);
    } finally { setLoading(false); }
  }, [patientId]);

  useEffect(() => { loadHistory(); }, [loadHistory]);

  const fmt = (iso) => {
    if (!iso) return '—';
    try {
      return new Date(iso).toLocaleString('en-IN', { dateStyle:'medium', timeStyle:'short', timeZone:'Asia/Kolkata' });
    } catch { return iso; }
  };

  return (
    <Box sx={{ display:'flex', minHeight:'100vh', bgcolor:'#f6f7f8' }}>

      <Box sx={{ flex:1, p:4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" sx={{ fontWeight:700 }}>Patient History</Typography>
        </Stack>

        {!patientId ? <Typography color="text.secondary">Open a patient from the dashboard to view their history.</Typography> :
          loading ? <Box sx={{ py:6, display:'flex', justifyContent:'center' }}><CircularProgress /></Box> : (
            <>
              {error && <Alert severity="error" sx={{ mb:2 }}>{error}</Alert>}

              <Typography variant="h6" sx={{ mb:2 }}>Consultations</Typography>
              {consultations.length === 0 ? <Typography>No consultations found.</Typography> : consultations.map(c => (
                <Card key={c._id} sx={{ p:2, mb:2 }}>
                  <Typography><b>Date:</b> {fmt(c.visit_date || c.createdAt)}</Typography>
                  <Typography><b>Doctor:</b> {c.doctor_id?.name || '—'}</Typography>
                  <Typography><b>Symptoms:</b> {c.symptoms || '—'}</Typography>
                  <Typography><b>Diagnosis:</b> {c.diagnosis || '—'}</Typography>
                  <Typography sx={{ mb:1 }}>{c.prescription || ''}</Typography>
                  <Button variant="contained" size="small" onClick={()=>{
                    const apptId = c.appointment_id?._id || c.appointment_id;
                    if (apptId) navigate(`/doctor/consultation/${apptId}`);
                    else alert('No appointment ID associated.');
                  }}>CONSULT</Button>
                </Card>
              ))}

              <Typography variant="h6" sx={{ mt:3, mb:2 }}>Appointments</Typography>
              {appointments.length === 0 ? <Typography>No past appointments found.</Typography> : appointments.map(a => (
                <Card key={a._id} sx={{ p:2, mb:2 }}>
                  <Typography><b>Date:</b> {fmt(a.appointment_date)}</Typography>
                  <Typography><b>Doctor:</b> {a.doctor_id?.name || '—'}</Typography>
                  <Typography><b>Status:</b> {a.status || '—'}</Typography>
                  <Button variant="contained" size="small" onClick={() => navigate(`/doctor/consultation/${a._id}`)} sx={{ mt:1 }}>CONSULT</Button>
                </Card>
              ))}
            </>
        )}
      </Box>
    </Box>
  );
}
