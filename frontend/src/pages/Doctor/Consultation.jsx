import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosinterceptor";
import toast from "react-hot-toast";
import { FaStethoscope } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";


import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";

import { useParams } from "react-router-dom";
import { SlCalender } from "react-icons/sl";

export default function Consultation() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { id } = useParams(); // appointment id from route /doctor/consultation/:id

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/appointments/doctor");
      setAppointments(res.data);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);
  // --- end load part ---

  const [savingMap, setSavingMap] = useState({});
  const [editingNotes, setEditingNotes] = useState({});

  // initialize editingNotes from loaded data
  useEffect(() => {
    const map = {};
    appointments.forEach((appointment) => {
      map[appointment._id] = appointment?.notes ?? "";
    });
    setEditingNotes(map);
  }, [appointments]);

  const formatTime = (iso) => {
    if (!iso) return "—";
    try {
      return new Date(iso).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      });
    } catch {
      return iso;
    }
  };

  const handleNotesChange = (appointmentId, value) => {
    setEditingNotes((prev) => ({
      ...prev,
      [appointmentId]: value,
    }));
  };

  const handleSave = async (appointmentId) => {
    const note = String(editingNotes[appointmentId] ?? "").trim();
    setSavingMap((s) => ({ ...s, [appointmentId]: true }));

    try {
      const payload = { notes: note };
      const res = await axiosInstance.put(
        `/appointments/complete/${appointmentId}`,
        payload
      );

      // update state
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, ...(res.data || {}), notes: note }
            : appointment
        )
      );

      toast.success("Note saved");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save note");
    } finally {
      setSavingMap((s) => ({ ...s, [appointmentId]: false }));
    }
  };

  const handleRefresh = async () => {
    await fetchAppointments();
    toast.success("Refreshed");
  };

  // 🔹 show only the appointment that was clicked "CONSULT" (if id exists)
  const visibleAppointments = id
    ? appointments.filter((a) => a._id === id)
    : appointments;

     const normalizeStatus = (s) => String(s || "").trim().toLowerCase();

  const scheduledCount = appointments.filter((a) => {
    const st = normalizeStatus(a.status);
    return st === "pending" || st === "scheduled" || st === "approved";
  }).length;

  const completedCount = appointments.filter((a) => {
    const st = normalizeStatus(a.status);
    return st === "completed" || st === "consulted";
  }).length;



  return (
    <Box sx={{ }}>
      {/* ==== TITLE SECTION (3 cards) ==== */}
<div className="dashboard-title">
  <div className="text-lg-end">
    <CgProfile className="fs-1 m-2" />
    <span>{user?.name}</span>
  </div>

  <div className="d-flex align-items-center">
    <div className="icon-shape text-white shadow">
      <FaStethoscope />
    </div>
    <h4 style={{ fontSize: "30px", paddingLeft: "20px" }}>
      Consultation
    </h4>
  </div>

  <div className="row mt-3">

    {/* 1️⃣ Total consultations */}
    <div className="col-xl-4 col-lg-6">
      <div className="card card-stats mb-4 mb-xl-0">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <h5 className="card-title text-uppercase text-muted">
                Consultations
              </h5><br></br>
              <span className="h2 font-weight-bold">
                {appointments.length}
              </span>
            </div>
            <div className="col-auto">
              <div className="icon-shape bg-warning text-white shadow">
                <FaStethoscope />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</div>


      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
      </Stack>

      <div className="today-appointments-wrapper">
        <TableContainer
          component={Paper}
          className="table-container today-appointments-table"
          sx={{ maxHeight: "60vh", width: "100%" }}
        >
          {loading ? (
            <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Table stickyHeader size="small">
              {/* purple header, same as Today's Appointments */}
              <TableHead className="prim-bg">
                <TableRow>
                  <TableCell>Patient</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Notes</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {visibleAppointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      No appointment found for consultation.
                    </TableCell>
                  </TableRow>
                ) : (
                  visibleAppointments.map((appointment) => (
                    <TableRow key={appointment._id} hover>
                      <TableCell sx={{ fontWeight: 600 }}>
                        {appointment?.patient_id?.name ?? "—"}
                      </TableCell>

                      <TableCell>{appointment?.time_slot || "—"}</TableCell>

                      <TableCell>
                        {String(appointment?.status ?? "—")}
                      </TableCell>

                      <TableCell>
                        <textarea
                          className="consult-notes"
                          placeholder="Add consultation notes here..."
                          value={editingNotes[appointment._id] ?? ""}
                          onChange={(e) =>
                            handleNotesChange(appointment._id, e.target.value)
                          }
                        />
                      </TableCell>

                      <TableCell align="center">
                        <Button
                          size="small"
                          variant="contained"
                          className="table-action-btn"
                          onClick={() => handleSave(appointment._id)}
                          disabled={!!savingMap[appointment._id]}
                        >
                          {savingMap[appointment._id] ? "SAVING..." : "SAVE"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </div>
    </Box>
  );
}
