import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../css/PositionStyle.css";
import Sidebar from "../component/sidebar";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Position = () => {
  const [newPosition, setNewPosition] = useState([]);
  const [addModalOpen, setAddModalopen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editPosition, setEditPosition] = useState({});
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    fetchPosition(true);
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:3001/departments");
        setDepartments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDepartments();
  }, []);

  const fetchPosition = async () => {
    try {
      const response = await axios.get("http://localhost:3001/position");
      setPositions(response.data);
    } catch (error) {
      console.error("Error fetching position:", error);
    }
  };

  const openAddModal = () => {
    setAddModalopen(true);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const addPosition = async () => {
    try {
      const response = await fetch("http://localhost:3001/position", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          position_name: newPosition,
          department_name: selectedOption,
        }),
      });
      const data = await response.json();
      console.log(data);
      setNewPosition("");
      fetchPosition();
    } catch (err) {
      console.error(err);
    }
  };

  const updatePosition = async (
    positionId,
    updatedPosition,
    updatedDepartment
  ) => {
    return fetch(`http://localhost:3001/position/${positionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        position_name: updatedPosition,
        department_name: updatedDepartment,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // handle the response as needed
        fetchPosition();
      })
      .catch((error) => {
        console.error("Error updating position:", error);
      });
  };

  const deletePosition = async (id) => {
    try {
      console.log(`Deleting position with id: ${id}`);
      await axios.delete("http://localhost:3001/position/" + id);
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

    const handleUpdate = async () => {
      await updatePosition(
        editPosition.position_id,
        editPosition.position_name,
        selectedOption
      );
      window.location.reload();
      closeModal();
    };

    useEffect(() => {
      inputRef.current.focus();
    }, []);

    return (
     
      <div className={`edit-modal ${editModalOpen ? "open" : ""}`}>
        <div className="modal-content">
          <h2>Edit Position</h2>
          <input
            type="text"
            value={editPosition.position_name}
            onChange={(e) =>
              setEditPosition({
                ...editPosition,
                position_name: e.target.value,
              })
            }
            ref={inputRef}
          />
          <select
            className="department-select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="" disabled>
              Select a department
            </option>
            {departments.map((department) => (
              <option
                key={department.department_id}
                value={department.department}
              >
                {department.department}
              </option>
            ))}
          </select>

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
      // </Sidebar>
    );
  };

  const AddModal = () => {
    const inputRef = useRef(null);
    const prevAddModalOpen = usePrevious(addModalOpen);

    const closeModal = () => {
      setAddModalopen(false);
      //   window.location.reload();
    };

    const handleAdd = async () => {
      addPosition();
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
          <h2>Add Position</h2>

          <input
            type="text"
            value={newPosition}
            onChange={(e) => {
              setNewPosition(e.target.value);
            }}
            ref={inputRef}
          />

          <select
            className="department-select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="" disabled>
              Select a department
            </option>
            {departments.map((department) => (
              <option
                key={department.department_id}
                value={department.department}
              >
                {department.department}
              </option>
            ))}
          </select>

          <div className="modal-buttons">
            <button className="cancel-button" onClick={closeModal}>
              Cancel
            </button>
            <button className="add-button" onClick={handleAdd}>
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
      console.log(
        `handleDelete called with position_id: ${editPosition.position_id}`
      );
      deletePosition(editPosition.position_id);
      closeModal();
    };

    return (
      <div className={`edit-modal ${deleteModalOpen ? "open" : ""}`}>
        <div className="modal-content">
          <h2>Are you sure you want to delete this position?</h2>
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
    <div>
      <h1>Position List</h1>
      <div className="AddButton">
        <button className="Add" onClick={openAddModal}>
          Add Position
        </button>
      </div>
      <AddModal />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Position ID</th>
              <th>Position</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position) => (
              <tr key={position.position_id}>
                <td>{position.position_id}</td>
                <td>{position.position_name}</td>
                <td>
                  {position.position_id === editPosition.position_id ? (
                    <>{/* Remove the Update and Cancel buttons */}</>
                  ) : (
                    position.department_name
                  )}
                </td>
                <td>
                  {position.position_id === editPosition.position_id ? (
                    <>{/* Remove the Update and Cancel buttons */}</>
                  ) : (
                    <>
                      <button
                        className="edit-button"
                        onClick={() => {
                          setEditPosition(position);
                          setSelectedOption(position.department_name);
                          openEditModal();
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => {
                          setEditPosition(position);
                          openDeleteModal();
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}
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
export default Position;
