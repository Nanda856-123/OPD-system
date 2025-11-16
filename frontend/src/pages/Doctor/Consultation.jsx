// src/pages/Doctor/Consultation.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getConsultation, saveConsultation, completeAppointment } from '../../api/doctorApi';
import { Box, Typography, Card, Button, TextField, Stack, CircularProgress, Alert } from '@mui/material';

export default function Consultation() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [consultation, setConsultation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ symptoms: '', diagnosis: '', prescription: '', notes: '' });

  useEffect(() => {
    const load = async () => {
      if (!appointmentId) return;
      setLoading(true);
      try {
        const res = await getConsultation(appointmentId);
        const data = res?.data?.data || null;
        setConsultation(data);
        if (data) setForm({ symptoms: data.symptoms || '', diagnosis: data.diagnosis || '', prescription: data.prescription || '', notes: data.notes || '' });
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.message || err.message || 'Failed to load consultation');
      } finally { setLoading(false); }
    };
    load();
  }, [appointmentId]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...form, status: 'Completed', visit_date: new Date().toISOString() };
      const res = await saveConsultation(appointmentId, payload);
      setConsultation(res?.data?.data || null);
      alert('Saved');
    } catch (err) {
      console.error(err);
      alert('Failed to save');
    } finally { setSaving(false); }
  };

  const handleComplete = async () => {
    try {
      await completeAppointment(appointmentId);
      alert('Appointment marked completed');
      navigate('/doctor/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to complete');
    }
  };

  if (!appointmentId) return <Typography>Please open an appointment.</Typography>;

  return (
    <Box sx={{ p:3 }}>
      <Typography variant="h5" sx={{ mb:2 }}>Consultation</Typography>
      {loading ? <CircularProgress /> : (
        <Card sx={{ p:2 }}>
          {error && <Alert severity="error" sx={{ mb:2 }}>{error}</Alert>}
          <Stack spacing={2}>
            <TextField label="Symptoms" value={form.symptoms} onChange={e => setForm(s => ({...s, symptoms: e.target.value}))} multiline />
            <TextField label="Diagnosis" value={form.diagnosis} onChange={e => setForm(s => ({...s, diagnosis: e.target.value}))} />
            <TextField label="Prescription" value={form.prescription} onChange={e => setForm(s => ({...s, prescription: e.target.value}))} multiline />
            <TextField label="Notes" value={form.notes} onChange={e => setForm(s => ({...s, notes: e.target.value}))} multiline />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleSave} disabled={saving}>Save</Button>
              <Button variant="outlined" onClick={handleComplete}>Complete</Button>
            </Stack>
          </Stack>
        </Card>
      )}
    </Box>
  );
}
