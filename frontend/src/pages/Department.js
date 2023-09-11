import React, { useState, useEffect, useRef } from "react";
import "../css/DepartmentStyle.css";
import axios from "axios";
import Sidebar from "../component/sidebar";
// Sidebar

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editDepartment, setEditDepartment] = useState({});
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addWarning, setAddWarning] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch("http://localhost:3001/departments");
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  

  const addDepartment = async () => {
    if (newDepartment.trim() === "") {
      setAddWarning("Please add a warning");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ department: newDepartment }),
      });
      const data = await response.json();
      console.log(data); // handle the response as needed
      setNewDepartment("");
      fetchDepartments();
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };

  const updateDepartment = async (departmentId, updatedDepartment) => {
    try {
      const response = await fetch(
        `http://localhost:3001/departments/${departmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ department: updatedDepartment }),
        }
      );
      const data = await response.json();
      console.log(data); // handle the response as needed
      fetchDepartments();
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  const deleteDepartment = async (id) => {
    try {
      console.log(`Deleting department with id: ${id}`);
      await axios.delete(`http://localhost:3001/departments/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const EditModal = () => {
    const inputRef = useRef(null);
    const closeModal = () => {
      setEditModalOpen(false);
      window.location.reload();
    };

    const handleUpdate = () => {
      updateDepartment(editDepartment.department_id, editDepartment.department);
      closeModal();
    };

    useEffect(() => {
      inputRef.current.focus();
    }, []);

    return (
      <div className={`edit-modal ${editModalOpen ? "open" : ""}`}>
        <div className="modal-content">
          <h2>Edit Department</h2>
          <input
            type="text"
            value={editDepartment.department}
            onChange={(e) =>
              setEditDepartment({
                ...editDepartment,
                department: e.target.value,
              })
            }
            ref={inputRef}
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

  const AddModal = () => {
    const inputRef = useRef(null);
    const prevAddModalOpen = usePrevious(addModalOpen);

    const closeModal = () => {
      setAddModalOpen(false);
      window.location.reload();
    };

    const handleAdd = async () => {
      if (newDepartment.trim() === "") {
        setAddWarning("Please add a department");
        return;
      }
      addDepartment();
      closeModal();
    };

    useEffect(() => {
      if (prevAddModalOpen !== addModalOpen && addModalOpen) {
        inputRef.current.focus();
      }
    }, [prevAddModalOpen]);

    return (
      <div className={`edit-modal ${addModalOpen ? "open" : ""}`}>
        <div className="modal-content">
          <h2>Add Department</h2>
          {addWarning && <p className="redWarning">{addWarning}</p>}
          <input
            type="text"
            value={newDepartment}
            onChange={(e) => {
              setNewDepartment(e.target.value);
              setAddWarning("");
            }}
            ref={inputRef}
          />
          <div className="modal-buttons">
            <button className="cancel-button" onClick={closeModal}>
              Cancel
            </button>
            <button className="update-button" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DeleteModal = () => {
    const closeModal = () => {
      setDeleteModalOpen(false);
      window.location.reload();
    };

    const handleDelete = async () => {
      console.log(`handleDelete called with department_id: ${editDepartment.department_id}`);
      deleteDepartment(editDepartment.department_id);
      closeModal();
    };

    return (
      <div className={`edit-modal ${deleteModalOpen ? "open" : ""}`}>
        <div className="modal-content">
          <h2>Are you sure you want to delete this department?</h2>
          <div className="modal-buttons">
            <button className="cancel-button" onClick={closeModal}>
              No
            </button>
            <button className="update-button" onClick={handleDelete}>
              Yes
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Sidebar>
      <div className="d-container">
        <div className="d-header">
          <h1>Department List</h1>
        </div>

        <div className="d-button">
          <button className="d-Add" onClick={openAddModal}>
            Add Department
          </button>
        </div>

        <AddModal />

        <div className="d-table-container">
          <table className="d-table">
            <thead>
              <tr>
                <th className="d-th-td">Department ID</th>
                <th className="d-th-td">Department Name</th>
                <th className="d-th-td">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr key={department.department_id}>
                  <td>{department.department_id}</td>
                  <td>
                    {department.department_id ===
                    editDepartment.department_id ? (
                      <label>{editDepartment.department}</label>
                    ) : (
                      department.department
                    )}
                  </td>
                  <td>
                    <div className="d-button-div">
                      {department.department_id ===
                      editDepartment.department_id ? (
                        <>{/* Remove the Update and Cancel buttons */}</>
                      ) : (
                        <button
                          className="edit-button"
                          onClick={() => {
                            setEditDepartment(department);
                            openEditModal();
                          }}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        className="delete-button"
                        onClick={() => {
                          setEditDepartment(department);
                          openDeleteModal();
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <EditModal />
        <DeleteModal />
      </div>
    </Sidebar>
  );
};

export default Department;