import React, { useState, useEffect } from "react"
import "../css/DepartmentStyle.css";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

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

  return (
    <div className="main-content">
      <header>
        <div className="header-title">
          <label htmlFor="nav-toggle">
            <span className="las la-bars"></span>
          </label>
          <b>Department</b>
        </div>
      </header>
      <div className="container" style={{ paddingTop: "100px" }}>
        <p id="success"></p>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DEPARTMENT</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr key={department.department_id}>
                  <td>{department.department_id}</td>
                  <td>{department.department}</td>
                  <td>
                    <button
                      className="edit-button"
                      data-department_id={department.department_id}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      data-department_id={department.department_id}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="add-department">
        <h4>Add Department</h4>
        <input
          type="text"
          id="department"
          name="department"
          required
          value={newDepartment}
          onChange={(e) => setNewDepartment(e.target.value)}
        />
        <button className="add-button" onClick={addDepartment}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Department;