import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosinterceptor";
import toast from "react-hot-toast";
import "./Doctors.css";
import Sidebar from "./Sidebar";
import { FaUsers } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Card,
  CardHeader,
  Typography,
  CardContent,
  Grid,
  TextField,
} from "@mui/material";
import Button from "../../components/Button";
import AddIcon from "@mui/icons-material/Add";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadDoctors();
    loadDepartments();
  }, []);

  const loadDoctors = async () => {
    try {
      const res = await axiosInstance.get("/admin/doctors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(res.data);
    } catch {
      toast.error("Failed to load doctors");
    }
  };

  const loadDepartments = async () => {
    try {
      const res = await axiosInstance.get("/admin/departments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDepartments(res.data);
    } catch {
      toast.error("Failed to load departments");
    }
  };

  const handleOpen = (doc = null) => {
    if (doc) {
      setEditId(doc._id);
      setForm({
        name: doc.name,
        email: doc.email,
        department: doc.department?._id || "",
      });
    } else {
      setEditId(null);
      setForm({ name: "", email: "", department: "" });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const saveDoctor = async () => {
    try {
      if (editId) {
        await axiosInstance.put(
          `/admin/doctors/${editId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Doctor updated");
      } else {
        await axiosInstance.post("/admin/doctors", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Doctor added");
      }
      handleClose();
      loadDoctors();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving doctor");
    }
  };

  const deleteDoctor = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axiosInstance.delete(`/admin/doctors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Doctor deleted");
      loadDoctors();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="main-container">
      <Sidebar />

      <div className="main inner-page">
        {/* ---- TITLE ---- */}
        <div className="dashboard-title">
          <div className="d-flex">
            <div className="icon-shape text-white shadow">
              <FaUsers />
            </div>
            <h4 style={{ fontSize: "30px", paddingLeft: "20px" }}>
              Doctors
            </h4>
          </div>

          {/* ---- COUNTER CARD ---- */}
          <div className="col-xl-3 col-lg-6">
            <div className="card mt-3 card-stats mb-4 mb-xl-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="card-title text-uppercase text-muted">
                      Doctors
                    </h5>
                    <span className="h2 font-weight-bold">{doctors.length}</span>
                  </div>
                  <div className="col-auto">
                    <div className="icon-shape bg-success text-white shadow">
                      <FaUsers />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---- ADD BUTTON ---- */}
        <div className="m-4">
          <Button btnHandler={() => handleOpen()}>
            <AddIcon />
          </Button>
        </div>

        {/* ---- TABLE ---- */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="prim-bg">
              <TableRow>
                <TableCell>SL No</TableCell>
                <TableCell>Doctor Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {doctors.length > 0 ? (
                doctors.map((doc, index) => (
                  <TableRow key={doc._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{doc.name}</TableCell>
                    <TableCell>{doc.email}</TableCell>
                    <TableCell>{doc.department?.name}</TableCell>

                    <TableCell>
                      <button
                        className="btn-edit action-btn m-2"
                        onClick={() => handleOpen(doc)}
                      >
                        <Link to="">
                          <FaEdit />
                        </Link>
                      </button>

                      <button
                        className="btn-dlt action-btn m-2"
                        onClick={() => deleteDoctor(doc._id)}
                      >
                        <Link to="">
                          <MdDeleteOutline />
                        </Link>
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <strong>No doctors found</strong>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* ---- POPUP ---- */}
      {open && (
        <div className="modal-overlay">
          <div className="modal-box">
            <Box>
              <Card elevation={0} sx={{ borderRadius: 3, padding: "20px" }}>
                <CardHeader
                  title={
                    <Typography variant="h6" fontWeight={700} textAlign="center">
                      {editId ? "Edit Doctor" : "Add Doctor"}
                    </Typography>
                  }
                  sx={{ background: "#f5f5f5", borderBottom: "1px solid #ddd" }}
                />

                <CardContent>
                  <form>
                    <Grid item xs={12} mb={2}>
                      <TextField
                        fullWidth
                        variant="standard"
                        label="Doctor Name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </Grid>

                    <Grid item xs={12} mb={2}>
                      <TextField
                        fullWidth
                        variant="standard"
                        label="Email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </Grid>

                    <Grid item xs={12} mb={2}>
                      <TextField
                        fullWidth
                        select
                        variant="standard"
                        label="Department"
                        SelectProps={{ native: true }}
                        value={form.department}
                        onChange={(e) =>
                          setForm({ ...form, department: e.target.value })
                        }
                      >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                          <option key={dept._id} value={dept._id}>
                            {dept.name}
                          </option>
                        ))}
                      </TextField>
                    </Grid>

                    {/* ---- Buttons ---- */}
                    <Grid
                      className="d-flex justify-content-end"
                      item
                      xs={12}
                      mt={2}
                    >
                      <Button btnHandler={handleClose}>Cancel</Button>
                      <Button
                        btnHandler={saveDoctor}
                        disabled={
                          !form.name.trim() ||
                          !form.email.trim() ||
                          !form.department.trim()
                        }
                      >
                        {editId ? "Update" : "Save"}
                      </Button>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
}
