import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./Departments.css";
import Sidebar from "./Sidebar";
import { FaUsers } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import {TableContainer,Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Card, CardHeader, Typography, CardContent, Grid, TextField } from "@mui/material";
import Button from "../../components/Button";
import AddIcon from '@mui/icons-material/Add';
import DeletePopup from "../../components/DeletePopup";


export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const [currDepartment, setCurrDepartment] = useState(null)

  const [form, setForm] = useState({
    name: "",
  });

  const token = localStorage.getItem("token");

  /* -------------------------------
        Fetch Departments
  --------------------------------*/
  const loadDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/departments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDepartments(res.data);
    } catch (err) {
      toast.error("Failed to load departments");
      console.log(err)
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  /* -------------------------------
        Open Popup
  --------------------------------*/
  const handleOpen = (dept = null) => {
    if (dept) {
      setEditId(dept._id);
      setForm({ name: dept.name });
    } else {
      setEditId(null);
      setForm({ name: "" });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  /* -------------------------------
        Save or Update
  --------------------------------*/
  const saveDepartment = async () => {
    try {
      if (editId) {
        await axios.put(
          `http://localhost:3000/admin/departments/${editId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Department updated");
      } else {
        await axios.post(
          "http://localhost:3000/admin/departments",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Department added");
      }

      handleClose();
      loadDepartments();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving department");
    }
  };

const deleteDepartmentHandler=(currDepartment)=>{
    setIsDeletePopupOpen(true);
    setCurrDepartment(currDepartment);
}
const confirmDeleteHandler=()=>{
    axios.delete(`http://localhost:3000/admin/departments/${currDepartment._id}`,).then((res)=>{
        toast.success(res.data.message);
        setDepartments(departments.filter((department)=>department._id!==currDepartment._id))
        setIsDeletePopupOpen(false);

    }).catch((error)=>{
        if (error.response && error.response.data) {
                toast.error(error.response.data.message);
              } else {
                alert(error.message);
              }
    })

}
const cancelDeleteHandler=()=>{
    setIsDeletePopupOpen(false);
    setCurrDepartment(null);
}
  return (
    <div>
    <div className="main-container">
      <Sidebar />

      <div className="main inner-page">
        <div className="dashboard-title">
          <div className="d-flex">
            <div className="icon-shape text-white shadow">
              <FaUsers />
            </div>
            <h4 style={{ fontSize: "30px", paddingLeft: "20PX" }}>
              Departments
            </h4>
          </div>
          <div className="col-xl-3 col-lg-6">
            <div className="card mt-3 card-stats mb-4 mb-xl-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="card-title text-uppercase text-muted">
                      Departments
                    </h5>
                    <span className="h2 font-weight-bold">
                      {departments.length}
                    </span>
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
        <div className="container">
          <div className="row">
            <div className="w-100">
              <div className="home_employee-lists m-4">
                <div className="mb-3 mt-5">
                  <Button btnHandler={() => handleOpen()}>
                    <AddIcon />
                  </Button>
                </div>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="employees table">
                    <TableHead className="prim-bg">
                      <TableRow>
                        <TableCell>SL No</TableCell>
                        <TableCell>Department Name</TableCell>
                        <TableCell>ACTIONS</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {departments.length > 0 ? (
                        departments.map((department, index) => (
                          <TableRow key={department._id}>
                            <TableCell component="th" scope="row">
                              {index + 1}
                            </TableCell>
                            <TableCell>{department.name}</TableCell>
                            <TableCell>
                              <button
                                onClick={() => handleOpen(department)}
                                className="btn-edit action-btn m-2"
                                variant="text"
                              >
                                <Link to="">
                                  <FaEdit />
                                </Link>
                              </button>
                              <button
                                onClick={() => deleteDepartmentHandler(department)}
                                className="btn-dlt action-btn m-2"
                                variant="text"
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
                            <strong>Oops..! No Departments found</strong>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* POPUP MODAL */}
      {open && (
        <div className="modal-overlay">
          <div className="modal-box">
            <Box>
              <Card elevation={0} sx={{ borderRadius: 3, padding: "20px" }}>
                <CardHeader
                  title={
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      textAlign="center"
                    >
                      {editId ? "Edit Department" : "Add Department"}
                    </Typography>
                  }
                  sx={{ background: "#f5f5f5", borderBottom: "1px solid #ddd" }}
                />

                <CardContent>
                  <form>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        variant="standard"
                        label="Department Name"
                        name="department name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid className='d-flex justify-content-end' item xs={12} textAlign="center" mt={2}>
                      <Button btnHandler={handleClose}>
                        cancel
                      </Button>
                       <Button btnHandler={saveDepartment} disabled={!form.name.trim()}>
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
     {isDeletePopupOpen && (
        <DeletePopup
          item={currDepartment}
          confirmDeleteHandler={confirmDeleteHandler}
          cancelDeleteHandler={cancelDeleteHandler}
        />
      )}
    </div>
  );
}


