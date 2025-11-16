import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import "./Doctors.css";

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

  // -------------------------------
  // Fetch doctors list
  // -------------------------------
  const loadDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/doctors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(res.data);
    } catch (error) {
      toast.error("Unable to load doctors");
    }
  };

  // -------------------------------
  // Fetch department list
  // -------------------------------
  const loadDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/departments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDepartments(res.data);
    } catch (error) {
      toast.error("Unable to load departments");
    }
  };

  // Load doctors + departments on page open
  useEffect(() => {
    loadDoctors();
    loadDepartments();
  }, []);

  // -------------------------------
  // Open popup for Add or Edit
  // -------------------------------
  const handleOpen = (doctor = null) => {
    if (doctor) {
      setEditId(doctor._id);
      setForm({
        name: doctor.name,
        email: doctor.email,
        department: doctor.department?._id || "",
      });
    } else {
      setEditId(null);
      setForm({
        name: "",
        email: "",
        department: "",
      });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // -------------------------------
  // Save (Add or Update) doctor
  // -------------------------------
  const saveDoctor = async () => {
    try {
      if (editId) {
        // Update doctor
        await axios.put(
          `http://localhost:3000/admin/doctors/${editId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Doctor updated successfully");
      } else {
        // Create doctor
        await axios.post(
          "http://localhost:3000/admin/doctors",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Doctor added successfully");
      }

      handleClose();
      loadDoctors();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save doctor");
    }
  };

  // -------------------------------
  // Delete doctor
  // -------------------------------
  const deleteDoctor = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this doctor?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/admin/doctors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Doctor deleted");
      loadDoctors();
    } catch (error) {
      toast.error("Failed to delete doctor");
    }
  };

  return (
    <Box className="doctor-page-container">
      <Typography variant="h4" fontWeight={700} className="doctor-title">
        Doctors Management
      </Typography>

      <Button
        variant="contained"
        className="add-btn"
        onClick={() => handleOpen()}
      >
        + Add Doctor
      </Button>

      {/* Doctors Data Table */}
      <Table className="doctor-table">
        <TableHead>
          <TableRow className="table-header">
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Department</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {doctors.map((doc) => (
            <TableRow key={doc._id}>
              <TableCell>{doc.name}</TableCell>
              <TableCell>{doc.email}</TableCell>
              <TableCell>{doc.department?.name}</TableCell>

              <TableCell>
                <Button
                  variant="outlined"
                  className="edit-btn"
                  onClick={() => handleOpen(doc)}
                >
                  Edit
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  className="delete-btn"
                  onClick={() => deleteDoctor(doc._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Popup Form */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          {editId ? "Edit Doctor" : "Add Doctor"}
        </DialogTitle>

        <DialogContent className="popup-content">
          <TextField
            label="Doctor Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <TextField
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <TextField
            select
            label="Department"
            value={form.department}
            SelectProps={{ native: true }}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={saveDoctor}>
            {editId ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}


