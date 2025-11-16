import React from "react";
import "./DeleteModal.css";

const DeleteModal = ({ department, onCancel, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Delete Department</h3>
        <p>Are you sure you want to delete "{department}"?</p>

        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>

          <button className="delete-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
