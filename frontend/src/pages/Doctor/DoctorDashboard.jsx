import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosinterceptor";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./DoctorDashboard.css";
import { SlCalender } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { FaStethoscope } from "react-icons/fa";

export default function DoctorDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const normalizeStatus = (s) =>
    String(s || "").trim().toLowerCase();

  const isToday = (dateValue) => {
    if (!dateValue) return false;
    const d = new Date(dateValue);
    const today = new Date();

    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    );
  };

  // 🔹 Only today's appointments with status "scheduled" or "completed"
  const todayAppointments = appointments.filter((a) => {
    const status = normalizeStatus(a.status);
    return (
      isToday(a.appointment_date) &&
      (status === "scheduled" || status === "completed")
    );
  });

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/appointments/doctor")
      .then((res) => setAppointments(res.data))
      .catch((error) => {
        if (error.response && error.response.data)
          toast.error(error.response.data.message);
        else alert(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{}}>
      <div className="dashboard-title">
        <div className="text-lg-end">
          <CgProfile className="fs-1 m-2" />
          <span>{user?.name}</span>
        </div>

        <div className="d-flex align-items-center">
          <div className="icon-shape text-white shadow">
            <SlCalender />
          </div>
          <h4 style={{ fontSize: "30px", paddingLeft: "20px" }}>
            Today&apos;s Appointments
          </h4>
        </div>

        <div className="row mt-3">
          <div className="col-xl-4 col-lg-6 mt-3">
            <div className="card card-stats doctor-stats-card mb-4 mb-xl-0">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col">
                    <h5 className="card-title text-uppercase text-muted">
                      Appointments
                    </h5>
                    <span className="h2 font-weight-bold">
                      {todayAppointments.length}
                    </span>
                  </div>
                  <div className="col-auto">
                    <div className="icon-shape bg-danger text-white shadow">
                      <SlCalender />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-6 mt-3">
            <div className="card card-stats doctor-stats-card mb-4 mb-xl-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="card-title text-uppercase text-muted">
                      Scheduled
                    </h5>
                    <span className="h2 font-weight-bold">
                      {todayAppointments.filter(
                        (a) => normalizeStatus(a.status) === "scheduled"
                      ).length}
                    </span>
                  </div>
                  <div className="col-auto">
                    <div className="icon-shape bg-info text-white shadow">
                      <SlCalender />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-6 mt-3">
            <div className="card card-stats doctor-stats-card mb-4 mb-xl-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="card-title text-uppercase text-muted">
                      Completed
                    </h5>
                    <span className="h2 font-weight-bold">
                      {todayAppointments.filter(
                        (a) => normalizeStatus(a.status) === "completed"
                      ).length}
                    </span>
                  </div>
                  <div className="col-auto">
                    <div className="icon-shape bg-success text-white shadow">
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
      ></Stack>

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
              <TableHead className="prim-bg">
                <TableRow>
                  <TableCell>Patient</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todayAppointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                      No appointments for today.
                    </TableCell>
                  </TableRow>
                ) : (
                  todayAppointments.map((appointment) => {
                    const s = normalizeStatus(appointment.status);
                    const isCompleted = s === "completed";
                    const isCanceled = s === "canceled"; // still safe

                    return (
                      <TableRow key={appointment._id} hover>
                        <TableCell sx={{ fontWeight: 600 }}>
                          {appointment?.patient_id?.name ?? "—"}
                        </TableCell>
                        <TableCell>
                          {appointment?.time_slot || "—"}
                        </TableCell>
                        <TableCell>
                          {String(appointment?.status ?? "—")}
                        </TableCell>
                        <TableCell align="center">
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                          >
                            <Button
                              size="small"
                              variant="contained"
                              className="table-action-btn"
                              disabled={isCanceled}
                              sx={{
                                opacity: isCanceled ? 0.4 : 1,
                                pointerEvents: isCanceled ? "none" : "auto",
                              }}
                              onClick={() => {
                                if (isCanceled) return;
                                const pid =
                                  appointment.patient_id?._id ||
                                  appointment.patient_id;
                                if (pid)
                                  navigate(
                                    `/doctor/patient-history?id=${pid}`
                                  );
                              }}
                            >
                              HISTORY
                            </Button>

                            <Button
                              size="small"
                              variant="contained"
                              className="table-action-btn"
                              disabled={isCanceled}
                              sx={{
                                opacity: isCanceled ? 0.4 : 1,
                                pointerEvents: isCanceled ? "none" : "auto",
                              }}
                              onClick={() => {
                                if (!isCanceled)
                                  navigate(
                                    `/doctor/consultation/${appointment._id}`
                                  );
                              }}
                            >
                              {isCompleted ? "RE-CONSULT" : "CONSULT"}
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </div>
    </Box>
  );
}
