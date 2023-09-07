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

      <table className="table">
        <thead>
          <tr>
            <th className="th-td">No.</th>
            <th className="th-td">First Name</th>
            <th className="th-td">Last Name</th>
            <th className="th-td">Contact</th >
            <th className="th-td">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="th-td">{index + 1}</td>
              <td className="th-td">{user.firstname}</td>
              <td className="th-td">{user.lastname}</td>
              <td className="th-td">{user.contact}</td>
              
              <td className="th-td">
              <div className="um-info">
                <div className="title-email">
                  {user.email}
                </div>
              
                <div className="update"> 
                 <button
                  className="button update"
                  onClick={() => {
                    navigate(`/Update/${user.id}`);
                  }}>
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

              </td>
            </tr>
          ))}
        </tbody>
        
      </table>
    );
  };

  return (
    <Sidebar>
    <div className="um-wrapper">    
      <div className="um-containter">
        <div className="um-component">
          <h2>User Management</h2>
        </div>
        <div className="um-component">
          {renderUserTable()}
        </div>
      </div>
    </div>
    <DeleteModal />
    </Sidebar>
  );
};

export default UserManagement;