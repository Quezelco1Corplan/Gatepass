import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";
import umCss from "../css/UserManagement.module.css";
import Sidebar from "../component/sidebar";
import * as UMStyles from "../css/UM.styles";

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
      setUsers(users.filter((user) => user.id !== id));
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
      <div
        className={`${umCss["um-edit-modal"]} ${
          deleteModalOpen ? umCss.open : ""
        }`}
      >
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
              <button
                className={umCss["um-update-button"]}
                onClick={handleDelete}
              >
                YES
              </button>
            </div>
            <div className={umCss["um-button"]}>
              <button
                className={umCss["um-cancel-button"]}
                onClick={closeModal}
              >
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
      <>
        <UMStyles.UMBody>
          <UMStyles.UMContainer>
            <UMStyles.UMbox1>
              <h1>User Management</h1>
            </UMStyles.UMbox1>

            <UMStyles.UMbox2>
              <UMStyles.UMTable>
                <UMStyles.UMTableHead>
                  <tr>
                    <UMStyles.UMTableth>No.</UMStyles.UMTableth>
                    <UMStyles.UMTableth>First Name</UMStyles.UMTableth>
                    <UMStyles.UMTableth>Last Name</UMStyles.UMTableth>
                    <UMStyles.UMTableth>Contact</UMStyles.UMTableth>
                    <UMStyles.UMTableth>Email</UMStyles.UMTableth>
                    <UMStyles.UMTableth>Action</UMStyles.UMTableth>
                  </tr>
                </UMStyles.UMTableHead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <UMStyles.UMTabletd>{index + 1}</UMStyles.UMTabletd>
                      <UMStyles.UMTabletd>{user.firstname}</UMStyles.UMTabletd>
                      <UMStyles.UMTabletd>{user.lastname}</UMStyles.UMTabletd>
                      <UMStyles.UMTabletd>{user.contact}</UMStyles.UMTabletd>
                      <UMStyles.UMTabletd>{user.email}</UMStyles.UMTabletd>
                      <UMStyles.UMTabletd>
                        <UMStyles.UMAction>
                          <UMStyles.UMTablebutton1>
                            <button
                              onClick={() => {
                                navigate(`/Update/${user.id}`);
                              }}
                            >
                              Update
                            </button>
                          </UMStyles.UMTablebutton1>

                          <UMStyles.UMablebutton2>
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                openDeleteModal(user.id);
                              }}
                            >
                              <FaTrash />
                            </button>
                          </UMStyles.UMablebutton2>
                        </UMStyles.UMAction>
                      </UMStyles.UMTabletd>
                    </tr>
                  ))}
                </tbody>
              </UMStyles.UMTable>
            </UMStyles.UMbox2>
          </UMStyles.UMContainer>
        </UMStyles.UMBody>
      </>
    );
  };

  return (
    <Sidebar>
      {renderUserTable()}
      <DeleteModal />
    </Sidebar>
  );
};

export default UserManagement;
