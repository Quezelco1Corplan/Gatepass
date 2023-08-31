import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../css/UserManagement.css';
import Sidebar from "../component/sidebar";
// Sidebar

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  // Fetch users from the server
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }, []);

  const openDeleteModal = (id) => {
    setUserIdToDelete(id);
    setDeleteModalOpen(true);
  };

  const Delete = async (id) => {
    try {
      await axios.delete("http://localhost:3001/users/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const DeleteModal = () => {
    const closeModal = () => {
      setDeleteModalOpen(false);
    };

    const handleDelete = async () => {
      Delete(userIdToDelete);
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

  // Render the user table
  const renderUserTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th className="th-td">First Name</th>
            <th className="th-td">Last Name</th>
            <th className="th-td">Contact</th>
            <th className="th-td">Email</th>
            <th className="th-td">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="th-td">{user.firstname}</td>
              <td className="th-td">{user.lastname}</td>
              <td className="th-td">{user.contact}</td>
              <td className="th-td">{user.email}</td>
              <td className="th-td">
                <button className="button update">
                  <Link to={`/update/${user.id}`}>Update</Link>
                </button>
                <button
                  className="button delete"
                  onClick={() => {
                    openDeleteModal(user.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <DeleteModal />
      </table>
    );
  };

  return (
    <Sidebar>
    <div>
      <h2>User Management</h2>
      {renderUserTable()}
    </div>
    </Sidebar>
  );
};

export default UserManagement;
