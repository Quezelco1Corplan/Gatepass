import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3001/users/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // Render the user table
  const renderUserTable = () => {
    return (
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              First Name
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Last Name
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Contact
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Email</th>
            {/* <th>Status</th> */}
            <th style={{ border: "1px solid black", padding: "8px" }}>
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {user.firstname}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {user.lastname}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {user.contact}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {user.email}
              </td>
              {/* <td>{user.status}</td> */}
              <td style={{ border: "1px solid black", padding: "8px" }}>
                <button className="update" style={{ margin: "4px" }}>
                  <Link to={`/update/${user.id}`}>Update</Link>
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(user.id)}
                  style={{ margin: "4px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h2>User Management</h2>
      {renderUserTable()}
    </div>
  );
};

export default UserManagement;
