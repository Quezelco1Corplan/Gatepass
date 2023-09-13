import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";
import umCss from '../css/UserManagement.module.css';
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
      <div className={`${umCss["um-edit-modal"]} ${deleteModalOpen ? umCss.open : ""}`}>
        <div className={umCss["um-modal-content"]}>
          <div className={umCss["um-text-container"]}>
            <div className={umCss["um-text-h2"]}>
              <h2>Are you sure you want to delete this account? </h2>
            </div>
            <div className={umCss["um-text-p"]}>
              <p>Note: this will not be recovered if yes!</p>
            </div>
          </div>
         
          <div className={umCss["um-modal-buttons"]}>
            <div className={umCss["um-button"]}>
              <button className={umCss["um-update-button"]} onClick={handleDelete}>
                YES
              </button>
            </div>
            <div className={umCss["um-button"]}>
              <button className={umCss["um-cancel-button"]} onClick={closeModal}>
                CANCEL
              </button>
              </div>
          </div>
        </div>
      </div>
    );
  };

  const renderUserTable = () => {
    return (
      <div className={umCss["um-table-container"]}>
        <table className={umCss["um-table"]}>
          <thead>
            <tr>
              <th className={umCss["um-th"]}>No.</th>
              <th className={umCss["um-th"]}>First Name</th>
              <th className={umCss["um-th"]}>Last Name</th>
              <th className={umCss["um-th"]}>Contact</th>
              <th className={umCss["um-th"]}>Email</th>
              <th className={umCss["um-th"]}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td className={umCss["um-td"]}>{index + 1}</td>
                <td className={umCss["um-td"]}>{user.firstname}</td>
                <td className={umCss["um-td"]}>{user.lastname}</td>
                <td className={umCss["um-td"]}>{user.contact}</td>
                <td className={umCss["um-td"]}>{user.email}</td>
                <td className={umCss["um-td"]}>
                  <div className={umCss["um-info"]}>
                    <div className={umCss["um-update"]}>
                      <button
                        className={`${umCss["um-button"]} ${umCss.update}`}
                        onClick={() => {
                          navigate(`/Update/${user.id}`);
                        }}
                      >
                        Update
                      </button>
                    </div>
                    <div className={umCss["um-delete"]}>
                      <button
                        className={umCss["um-button-delete"]}
                        onClick={(event) => {
                          event.preventDefault();
                          openDeleteModal(user.id);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Sidebar>
      <div className="um-wrapper">
        <div className="um-header">
          <h1>User Management</h1>
        </div>
        <div className="um-component">{renderUserTable()}</div>
      </div>
      <DeleteModal />
    </Sidebar>
  );
};

export default UserManagement;
