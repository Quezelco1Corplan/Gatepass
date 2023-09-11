import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/UserManagement.css';
import Sidebar from "../component/sidebar";

const UserManagement = () => {
  
  const [users, setUsers] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const navigate = useNavigate();

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
          <div className="um-text-container">
            <div className="um-text-h2">
              <h2>Are you sure you want to delete this account? </h2>
            </div>
            <div className="um-text-p">
              <p>Note: this will not be recovered if yes!</p>
            </div>
          </div>
         
          <div className="um-modal-buttons">
            <div className="um-button">
              <button className="um-update-button" onClick={handleDelete}>
                YES
              </button>
            </div>
            <div className="um-button">
              <button className="um-cancel-button" onClick={closeModal}>
                CANCEL
              </button>
            </div>
          </div>

    
        </div>
      </div>
    );
  };

  // Render the user table
  const renderUserTable = () => {
    return (
  
        <table className="um-table">
          <thead>
            <tr>
              <th className="um-th-td">No.</th>
              <th className="um-th-td">First Name</th>
              <th className="um-th-td">Last Name</th>
              <th className="um-th-td">Contact</th >
              <th className="um-th-td">Email</th>
              <th className="um-th-td">Action</th>
            </tr>
          </thead>

        <div className="um-table-body">
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td className="um-th-td">{index + 1}</td>
                <td className="um-th-td">{user.firstname}</td>
                <td className="um-th-td">{user.lastname}</td>
                <td className="um-th-td">{user.contact}</td>
                <td className="um-th-td">{user.email}</td>
                <td>  
                  <div className="um-info">
                    <div className="um-update"> 
                      <button
                        className="um-button update"
                        onClick={() => {
                        navigate(`/Update/${user.id}`);
                      }}>
                      Update
                      </button>
                    </div>

                    <div className="um-delete"> 
                      <button
                        className="um-button-delete"
                        onClick={(event) => {
                        event.preventDefault();
                        openDeleteModal(user.id);
                      }}><FaTrash />
                      </button>
                    </div>
                  </div>
                </td>             
              </tr>
            ))}
          </tbody>
        </div>
        
      </table>
    
    );
  };

  return (
    <Sidebar>
    <div className="um-wrapper">    
      
        <div className="um-header">
          <h1>User Management</h1>
        </div>
        
        <div className="um-component">
          {renderUserTable()}
        </div>

    </div>
    <DeleteModal />
    </Sidebar>
  );
};

export default UserManagement;