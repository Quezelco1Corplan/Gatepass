import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/UserManagement.css';
import Sidebar from "../component/sidebar";
import { FaTrash } from "react-icons/fa";


const UserManagement = () => {
  
  const [users, setUsers] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const navigate = useNavigate();

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
      setUsers(users.filter(user => user.id !== id));
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
    
      <div className={`um-edit-modal ${deleteModalOpen ? "open" : ""}`}>
        <div className="um-modal-content">
          <h2>Are you sure you want to delete this? </h2>
          <div className="um-modal-buttons">
            <button className="um-cancel-button" onClick={closeModal}>
              No
            </button>
            <button className="um-update-button" onClick={handleDelete}>
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
      <form>
        {users.map((user) => (
          <div key={user.id}>
            <div className="um-form-wrapper" key={user.id}>
              
              <div className="um-info">
                <h1>User Management</h1>
              </div>

              <div className="um-info">
                
                <div className="um-firstname">
                  <label htmlFor={`firstname-${user.id}`}>First Name:</label>
                  <input
                    type="text"
                    id={`firstname-${user.id}`}
                    name={`firstname-${user.id}`}
                    value={user.firstname}
                    readOnly
                  />
                </div>

                <div className="um-lastname">
                  <label htmlFor={`lastname-${user.id}`}>Last Name:</label>
                  <input
                   type="text"
                    id={`lastname-${user.id}`}
                    name={`lastname-${user.id}`}
                    value={user.lastname}
                    readOnly
                  />
                </div>
                
              </div>
              
              <label htmlFor={`contact-${user.id}`}>Contact:</label>
              
              <input
                type="text"
                id={`contact-${user.id}`}
                name={`contact-${user.id}`}
                value={user.contact}
                readOnly
              />

              <label htmlFor={`email-${user.id}`}>Email:</label>
              <input
              type="text"
              id={`email-${user.id}`}
              name={`email-${user.id}`}
              value={user.email}
              readOnly
              />

              <div className="um-info">
                <div className="update"> 
                <button
                className="button update"
                onClick={() => {
                  navigate(`/Update/${user.id}`);
                }}
              >
                Update
              </button>
                </div>
                <div className="delete"> 
                <button
                  className="button-delete"
                  onClick={(event) => {
                  event.preventDefault();
                  openDeleteModal(user.id);
                  }}>
                  <FaTrash />
                </button>
                </div>
              </div>

            </div>  
            </div> 
          ))}    
        <DeleteModal /> 
      </form>
    );
  };

  return (
    <Sidebar>
     
    <div className="um-wrapper">
      
      {renderUserTable()}

    </div>
    
    </Sidebar>
  );
};

export default UserManagement;
