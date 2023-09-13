import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../css/Employee.css";
import Sidebar from "../component/sidebar";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Employee = () => {
  const [newEmployee, setNewEmployee] = useState({
    empName: "",
    dob: "",
    doe: "",
    pos: "",
    dept: "",
    id_num: "",
  });
  const [addModalOpen, setAddModalopen] = useState(false);
  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState({});
  const [employees, setEmployees] = useState([]);
  const [editEmployeeData, setEditEmployeeData] = useState({});

  useEffect(() => {
    fetchEmployees(true);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get("http://localhost:3001/position");
        setPositions(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPositions();
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

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3001/employee");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const openAddModal = () => {
    setAddModalopen(true);
  };

  const openDeleteModal = (employee) => {
    setEditEmployee(employee);
    setDeleteModalOpen(true);
  };

  const openEditModal = (employee) => {
    setEditEmployeeData(employee);
    setEditModalOpen(true);
  };

  const addEmployee = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/employee",
        newEmployee
      );
      const data = response.data;
      console.log(data);
      setNewEmployee({
        empName: "",
        dob: "",
        doe: "",
        pos: "",
        dept: "",
        id_num: "",
      });
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const updateEmployee = async (id, empName, dob, doe, pos, dept, id_num) => {
    return fetch(`http://localhost:3001/employee/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        empName: empName,
        dob: dob,
        doe: doe,
        pos: pos,
        dept: dept,
        id_num: id_num,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchEmployees();
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
      });
  };

  const deleteEmployee = async (id) => {
    try {
      console.log(`Deleting employee with id: ${id}`);
      await axios.delete("http://localhost:3001/employee/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // AddModal component
  // AddModal component
  const AddModal = () => {
    const inputRef = useRef(null);
    const prevAddModalOpen = usePrevious(addModalOpen);

    const closeModal = () => {
      setAddModalopen(false);
    };

    const handleAdd = async () => {
      addEmployee();
      closeModal();
    };

    const handleInputChange = (event) => {
      setNewEmployee({
        ...newEmployee,
        [event.target.name]: event.target.value,
      });
    };

    useEffect(() => {
      if (prevAddModalOpen !== addModalOpen && addModalOpen) {
        inputRef.current.focus();
      }
    }, [prevAddModalOpen]);

    return (
      <div className={`add-modal ${addModalOpen ? "open" : ""}`}>
        <div className="modal-content">
          <h2>Add Employee</h2>
          <form className="form-container">
            <div className="form-group">
              <label>
                ID Number:
                <input
                  type="text"
                  name="id_num"
                  placeholder="Id Number"
                  value={newEmployee.id_num}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Name:
                <input
                  type="text"
                  name="empName"
                  placeholder="Name"
                  value={newEmployee.empName}
                  onChange={handleInputChange}
                  ref={inputRef}
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Date of Birth:
                <input
                  type="date"
                  name="dob"
                  placeholder="Date of Birth"
                  value={newEmployee.dob}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Date of Employment:
                <input
                  type="date"
                  name="doe"
                  value={newEmployee.doe}
                  placeholder="Date of Employment"
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Position:
                <select
                  name="pos"
                  value={newEmployee.pos}
                  onChange={handleInputChange}
                >
                  <option value="">Select Position</option>
                  {Array.isArray(positions) &&
                    positions.map((position) => (
                      <option
                        key={position.position_id}
                        value={position.position_name}
                      >
                        {position.position_name}
                      </option>
                    ))}
                </select>
              </label>
            </div>

            <div className="form-group">
              <label>
                Department:
                <select
                  name="dept"
                  value={newEmployee.dept}
                  onChange={handleInputChange}
                >
                  <option value="">Select Department</option>
                  {Array.isArray(departments) &&
                    departments.map((department) => (
                      <option
                        key={department.department_id}
                        value={department.department}
                      >
                        {department.department}
                      </option>
                    ))}
                </select>
              </label>
            </div>

            <div className="modal-buttons">
              <button className="cancel-button" onClick={closeModal}>
                Cancel
              </button>
              <button className="add-button" onClick={handleAdd}>
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  // EditModal component
  const EditModal = () => {
    const inputRef = useRef(null);
    const prevEditModalOpen = usePrevious(editModalOpen);

    const closeModal = () => {
      setEditModalOpen(false);
      window.location.reload();
    };

    const handleUpdate = async () => {
      updateEmployee(
        editEmployeeData.employee_id,
        editEmployeeData.empName,
        editEmployeeData.dob,
        editEmployeeData.doe,
        editEmployeeData.pos,
        editEmployeeData.dept,
        editEmployeeData.id_num
      );
      closeModal();
    };

    const handleInputChange = (event) => {
      setEditEmployeeData({
        ...editEmployeeData,
        [event.target.name]: event.target.value,
      });
    };

    useEffect(() => {
      if (prevEditModalOpen !== editModalOpen && editModalOpen) {
        inputRef.current.focus();
      }
    }, [prevEditModalOpen]);

    return (
      <div className={`edit-modal ${editModalOpen ? "open" : ""}`}>
        <div className="modal-content">
          <h2>Edit Employee</h2>
          <form className="form-container">
            <div className="form-group">
              <label>
                ID Number:
                <input
                  type="text"
                  name="id_num"
                  placeholder="Id Number"
                  value={editEmployeeData.id_num}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Name:
                <input
                  type="text"
                  name="empName"
                  placeholder="Name"
                  value={editEmployeeData.empName}
                  onChange={handleInputChange}
                  ref={inputRef}
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Date of Birth:
                <input
                  type="date"
                  name="dob"
                  placeholder="Date of Birth"
                  value={editEmployeeData.dob}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Date of Employment:
                <input
                  type="date"
                  name="doe"
                  placeholder="Date of Employment"
                  value={editEmployeeData.doe}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Position:
                <select
                  name="pos"
                  value={editEmployeeData.pos}
                  onChange={handleInputChange}
                >
                  {Array.isArray(positions) &&
                    positions.map((position) => (
                      <option
                        key={position.position_id}
                        value={position.position_name}
                      >
                        {position.position_name}
                      </option>
                    ))}
                </select>
              </label>
            </div>

            <div className="form-group">
              <label>
                Department:
                <select
                  name="dept"
                  value={editEmployeeData.dept}
                  onChange={handleInputChange}
                >
                  {Array.isArray(departments) &&
                    departments.map((department) => (
                      <option
                        key={department.department_id}
                        value={department.department}
                      >
                        {department.department}
                      </option>
                    ))}
                </select>
              </label>
            </div>

            <div className="modal-buttons">
              <button className="cancel-button" onClick={closeModal}>
                Cancel
              </button>
              <button className="update-button" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // DeleteModal component
  const DeleteModal = () => {
    const closeModal = () => {
      setDeleteModalOpen(false);
    };

    const handleDelete = async () => {
      deleteEmployee(editEmployee.employee_id);
      closeModal();
    };

    return (
      <div className={`delete-modal ${deleteModalOpen ? "open" : ""}`}>
        <div className="modal-content">
          <h2>Delete Employee</h2>
          <p>Are you sure you want to delete this employee?</p>
          <div className="modal-buttons">
            <button className="cancel-button" onClick={closeModal}>
              No
            </button>
            <button className="delete-button" onClick={handleDelete}>
              Yes
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Sidebar>
      <div className="e-container">
        <div className="e-header">
          <h1>Employee List</h1>
        </div>

        <div className="e-button">
          <button className="e-Add" onClick={openAddModal}>
            Add Employee
          </button>
        </div>

        <AddModal />
        <EditModal />
        <DeleteModal />

        <div className="e-table-container">
          <table className="e-table">
            <thead>
              <tr>
                <th className="e-th-td">ID Number</th>
                <th className="e-th-td">Name</th>
                <th className="e-th-td">Date of Birth</th>
                <th className="e-th-td">Date of Employment</th>
                <th className="e-th-td">Position</th>
                <th className="e-th-td">Department</th>
                <th className="e-th-td">Action</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(employees) &&
                employees.map((employee, index) => (
                  <tr key={index}>
                    <td>{employee.id_num}</td>
                    <td>{employee.empName}</td>
                    <td>{formatDate(employee.dob)}</td>
                    <td>{formatDate(employee.doe)}</td>
                    <td>{employee.pos}</td>
                    <td>{employee.dept}</td>
                    <td>
                      <div className="e-button-div">
                        <button
                          className="edit-button"
                          onClick={() => openEditModal(employee)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => openDeleteModal(employee)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Sidebar>
  );
};

export default Employee;
