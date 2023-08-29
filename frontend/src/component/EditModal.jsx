import React from "react";

const EditModal = ({
  isOpen,
  closeModal,
  editDepartment,
  setEditDepartment,
}) => {
  const handleInputChange = (e) => {
    setEditDepartment({
      ...editDepartment,
      department: e.target.value,
    });
  };

  return (
    <div className={`edit-modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Edit Department</h2>
        <input
          type="text"
          value={editDepartment.department}
          onChange={handleInputChange}
        />
        <div className="modal-buttons">
          <button className="cancel-button" onClick={closeModal}>
            Cancel
          </button>
          <button className="update-button" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
