// src/pages/Doctor/DoctorDashboard.jsx
import React, { useCallback, useEffect, useState } from "react";
import {
  Box, Button, CircularProgress, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Typography, Stack, Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getTodayAppointments } from "../../api/doctorApi";

/**
 * Doctor Dashboard
 * - Set doctorId in localStorage (dev)
 * - Fetch today appointments, show list
 * - Buttons to view History (navigates with ?id=...) or open Consultation
 */

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctorIdInput, setDoctorIdInput] = useState(localStorage.getItem("doctorId") || "");

  const loadAppointments = useCallback(async (useMock = false) => {
    setError(null);
    setLoading(true);
    try {
      const doctorId = localStorage.getItem("doctorId");
      if (!doctorId && !useMock) {
        setAppointments([]);
        setError("No doctorId found. Set doctorId (dev) to load appointments.");
        setLoading(false);
        return;
      }

      if (useMock) {
        const now = new Date();
        const mock = [
          { _id: "m1", patient_id: { name: "Test A", _id: "p1" }, appointment_date: new Date(now.getTime()).toISOString(), status: "Scheduled" },
          { _id: "m2", patient_id: { name: "Test B", _id: "p2" }, appointment_date: new Date(now.getTime() + 30*60000).toISOString(), status: "Completed" }
        ];
        setAppointments(mock);
        setLoading(false);
        return;
      }

      const res = await getTodayAppointments(doctorId);
      const list = Array.isArray(res?.data?.data) ? res.data.data : [];
      list.sort((a, b) => new Date(a.appointment_date || 0) - new Date(b.appointment_date || 0));
      setAppointments(list);
    } catch (err) {
      console.error("Failed to load appointments:", err);
      setError(err?.response?.data?.message || err.message || "Failed to fetch appointments");
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadAppointments(); }, [loadAppointments]);

  const formatTime = (iso) => {
    if (!iso) return "—";
    try {
      return new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" });
    } catch { return iso; }
  };

  const handleSetDoctorId = () => {
    if (!doctorIdInput) return;
    localStorage.setItem("doctorId", doctorIdInput);
    loadAppointments();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Today's Appointments</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={() => loadAppointments(false)} disabled={loading}>Refresh</Button>
          <Button variant="outlined" onClick={() => loadAppointments(true)} disabled={loading}>Load Mock</Button>
        </Stack>
      </Stack>

      <Paper sx={{ p:2, mb:2 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
          <TextField size="small" label="doctorId (dev)" value={doctorIdInput}
            onChange={e => setDoctorIdInput(e.target.value)} sx={{ minWidth: 300 }} />
          <Button variant="contained" onClick={handleSetDoctorId}>Set doctorId</Button>
          <Button variant="text" onClick={() => { localStorage.removeItem("doctorId"); setDoctorIdInput(""); setAppointments([]); }}>Clear</Button>
        </Stack>
      </Paper>

      {error && <Alert severity="error" sx={{ mb:2 }}>{error}</Alert>}

      <Paper>
        <TableContainer sx={{ maxHeight: '60vh' }}>
          {loading ? (
            <Box sx={{ py:6, display:'flex', justifyContent:'center' }}><CircularProgress /></Box>
          ) : (
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Patient</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.length === 0 ? (
                  <TableRow><TableCell colSpan={4} align="center" sx={{ py:4 }}>No appointments for today.</TableCell></TableRow>
                ) : appointments.map(a => (
                  <TableRow key={a._id} hover>
                    <TableCell sx={{ fontWeight:600 }}>{a?.patient_id?.name ?? "—"}</TableCell>
                    <TableCell>{formatTime(a?.appointment_date)}</TableCell>
                    <TableCell>{String(a?.status ?? '—')}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Button size="small" variant="contained" onClick={() => {
                          const pid = a.patient_id?._id || a.patient_id;
                          if (pid) navigate(`/doctor/patient-history?id=${pid}`);
                        }}>History</Button>
                        <Button size="small" variant="contained" onClick={() => navigate(`/doctor/consultation/${a._id}`)}>Consult</Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Paper>
    </Box>
  );
}
