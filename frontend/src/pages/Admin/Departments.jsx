import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./Departments.css";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

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

  /* -------------------------------
        Delete Department
  --------------------------------*/
  const deleteDepartment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?"))
      return;

    try {
      await axios.delete(
        `http://localhost:3000/admin/departments/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Department deleted");
      loadDepartments();
    } catch (err) {
      toast.error("Error deleting department");
    }
  };

  return (
    <div className="dept-container">
      <h1 className="dept-title">Department Management</h1>

      <button className="add-btn" onClick={() => handleOpen()}>
        + Add Department
      </button>

      {/* TABLE */}
      <div className="dept-table-container">
        <table className="dept-table">
          <thead>
            <tr>
              <th>Department Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((d) => (
              <tr key={d._id}>
                <td>{d.name}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleOpen(d)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteDepartment(d._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* POPUP MODAL */}
      {open && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>{editId ? "Edit Department" : "Add Department"}</h2>

            <input
              type="text"
              placeholder="Department Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="modal-input"
            />

            <div className="modal-actions">
              <button className="cancel-btn" onClick={handleClose}>
                Cancel
              </button>

              <button className="save-btn" onClick={saveDepartment}>
                {editId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


