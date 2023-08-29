import React, { useState, useEffect, useRef } from "react";
import "../css/DepartmentStyle.css";

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

  useEffect(() => {
    fetchDepartments();
  }, []);

  const openAddModal = () => {
    setAddModalOpen(true);
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
    };

    const handleAdd = async () => {
      addDepartment();
      closeModal();
    };

    useEffect(() => {
      if (prevAddModalOpen !== addModalOpen && addModalOpen) {
        inputRef.current.focus();
      }
    }, [addModalOpen, prevAddModalOpen]);

    return (
      <div className={`edit-modal ${addModalOpen ? "open" : ""}`}>
        <div className="modal-content">
          <h2>Add Department</h2>
          <input
            type="text"
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
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

  return (
    <div>
      <h1>Department List</h1>
      <div className="AddButton">
        <button className="Add" onClick={openAddModal}>
          Add Department
        </button>
      </div>
      <AddModal />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Department ID</th>
              <th>Department Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department.department_id}>
                <td>{department.department_id}</td>
                <td>
                  {department.department_id === editDepartment.department_id ? (
                    <label>{editDepartment.department}</label>
                  ) : (
                    department.department
                  )}
                </td>
                <td>
                  {department.department_id === editDepartment.department_id ? (
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
                    // onClick={() => deleteDepartment(department.department_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditModal />
    </div>
  );
};

export default Department;
