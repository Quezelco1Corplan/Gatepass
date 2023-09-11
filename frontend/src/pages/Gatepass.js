import React, { useState, useEffect } from "react";
import Sidebar from "../component/sidebar";
import "../css/Gatepass.css";
import SearchBar from "../component/SearchBar.js";
import GeneratedGatePass from "../component/GeneratedGatePass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faRepeat } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Gatepass = () => {
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [dateOfTravel, setDateOfTravel] = useState("");
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [buttonPopUp, setButtonPopup] = useState(false);
  const [gatepass, setGatepass] = useState({
    purpose: "",
    destination: "",
    dot: "",
    departments: "",
    service_vehicle: "",
    names: "",
  });
  const [error, setError] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [serviceVehicle, setServiceVehicle] = useState("");

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  useEffect(() => {
    fetchEmployeesAndDepartments();
  }, []);

  const fetchEmployeesAndDepartments = async () => {
    try {
      const employeesResponse = await axios.get("http://localhost:3001/employee");
      const departmentsResponse = await axios.get("http://localhost:3001/departments");
  
      console.log("Employees:", employeesResponse.data);
      console.log("Departments:", departmentsResponse.data);
  
      if (Array.isArray(employeesResponse.data)) {
        setEmployees(employeesResponse.data);
      } else {
        console.error("Error: employees data is not an array");
      }
  
      setDepartments(departmentsResponse.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setGatepass((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    setGatepass((prev) => ({ ...prev, destination: e.target.value }));
  };

  const handleDateOfTravelChange = (e) => {
    setDateOfTravel(e.target.value);
    setGatepass((prev) => ({ ...prev, dot: e.target.value }));
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    setGatepass((prev) => ({ ...prev, departments: e.target.value }));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setGatepass((prev) => ({ ...prev, names: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const { purpose, destination, dot, departments, service_vehicle, names } = gatepass;

    if (!purpose || !destination || !dot || !departments || !service_vehicle || !names) {
      alert("Values are empty");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/gatepass", gatepass);
      alert(response.data);
      setDescription(purpose); 
      setServiceVehicle(service_vehicle);
      setButtonPopup(true);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <Sidebar>
      <div>
        <div className="main-wrap">
          <div className="header">
            <h1 className="title">Gatepass</h1>
            <div className="search-wrap">
              <SearchBar
                isSearchVisible={isSearchVisible}
                toggleSearch={toggleSearch}
              />
            </div>
          </div>
          <div className="form-box">
            <div className="form-preview">
              <div className="form-wrap">
                <form onSubmit={handleClick}>
                  <label>
                    Purpose:
                    <textarea
                      value={gatepass.purpose}
                      onChange={handleChange}
                      name="purpose"
                    />
                  </label>

                  <label>
                    Destination:
                    <select
                      className="dropdown-input"
                      value={destination}
                      onChange={handleDestinationChange}
                      name="destination"
                    >
                      <option value="">Select Destination</option>
                      <option value="Destination 1">Destination 1</option>
                      <option value="Destination 2">Destination 2</option>
                      {/* Add more destination options */}
                    </select>
                  </label>

                  <label>
                    Date of Travel:
                    <input
                      type="date"
                      value={dateOfTravel}
                      onChange={handleDateOfTravelChange}
                      name="dot"
                    />
                  </label>

                  <label>Service Vehicle
                    <input
                      type="text"
                      value={gatepass.service_vehicle}
                      onChange={handleChange}
                      name="service_vehicle"
                      />
                  </label>

                  <label>
                    Department:
                    <select
                      className="dropdown-input"
                      value={department}
                      onChange={handleDepartmentChange}
                      name="departments"
                    >
                      <option value="">Select Department</option>
                      {Array.isArray(departments) && departments.map((department) => (
                        <option
                          key={department.department_id}
                          value={department.department}
                        >
                          {department.department}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Name:
                    <select
                      className="dropdown-input"
                      value={name}
                      onChange={handleNameChange}
                      name="names"
                    >
                      <option value="">Select Name</option>
                      {Array.isArray(employees) && employees.map((employee) => (
                        <option
                          key={employee.employee_id}
                          value={employee.empName}
                        >
                          {employee.empName}
                        </option>
                      ))}
                    </select>
                  </label>
                </form>
              </div>
              <button
                className="generate-pass-button"
                type="submit"
                onClick={handleClick}
              >
                <FontAwesomeIcon icon={faRepeat} /> Generate pass
              </button>
            </div>

            <GeneratedGatePass
              trigger={buttonPopUp}
              setTrigger={setButtonPopup}
              description={description} 
            >
              <h2>Gate Pass</h2>
              <div className="gatepass-content">
                <p>Description: {description}</p>
                <p>Destination: {destination}</p>
                <p>Date of Travel: {dateOfTravel}</p>
                <p>Service Vehicle: {serviceVehicle}</p>
                <p>Department: {department}</p>
                <p>Name: {name}</p>
              </div>
            </GeneratedGatePass>

            <div className="history-box">
              <div className="history-title">History</div>
              <div className="history-content">
                {/* put the history content here :) */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Gatepass;
