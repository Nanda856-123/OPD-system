import React, { useState } from "react";
import "./EditModal.css";

const EditModal = ({ department, onCancel, onSave }) => {
  const [value, setValue] = useState(department.name || "");

  return (
    <div className="modal-overlay">
      <div className="edit-modal-box">
        <h3>Edit Department</h3>

        <input
          className="edit-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Department name"
          onKeyDown={(e) => e.key === "Enter" && onSave(value.trim())}
        />

        <div className="modal-buttons">
          <button
            className="cancel-btn"
            onClick={() => {
              onCancel();
            }}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={() => {
              const newName = value.trim();
              if (!newName) return;
              onSave(newName);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
