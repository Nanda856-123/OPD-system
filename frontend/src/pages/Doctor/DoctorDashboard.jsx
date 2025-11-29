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
          <div className="row">
            <div className="col">
              <h5 className="card-title text-uppercase text-muted">
                Appointments
              </h5>
              <span className="h2 font-weight-bold">
                {appointments.length}
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
                Scheduled / Pending
              </h5>
              <span className="h2 font-weight-bold">
                {appointments.filter(a =>
                  ["pending", "scheduled", "approved"].includes(a.status?.toLowerCase())
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
                {appointments.filter(a =>
                  ["completed", "consulted"].includes(a.status?.toLowerCase())
                ).length}
              </span>
            </div>
            <div className="col-auto">
              <div className="icon-shape bg-success text-white shadow">
                <FaStethoscope/>
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
          sx={{ maxHeight: "60vh", width: "100%" }} // ✅ full width
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
                {appointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                      No appointments for today.
                    </TableCell>
                  </TableRow>
                ) : (
                  appointments.map((appointment) => (
                    <TableRow key={appointment._id} hover>
                      <TableCell sx={{ fontWeight: 600 }}>
                        {appointment?.patient_id?.name ?? "—"}
                      </TableCell>
                      <TableCell>{appointment?.time_slot || "—"}</TableCell>
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
                            onClick={() => {
                              const pid =
                                appointment.patient_id?._id ||
                                appointment.patient_id;
                              if (pid)
                                navigate(`/doctor/patient-history?id=${pid}`);
                            }}
                          >
                            HISTORY
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            className="table-action-btn"
                            onClick={() =>
                              navigate(
                                `/doctor/consultation/${appointment._id}`
                              )
                            }
                          >
                            CONSULT
                          </Button>
                        </Stack>
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
