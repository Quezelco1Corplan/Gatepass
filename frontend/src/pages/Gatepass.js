import React, { useState, useEffect } from "react";
import Sidebar from "../component/sidebar";
import "../css/Gatepass.css";
import SearchBar from "../component/SearchBar.js";
import GeneratedGatePass from "../component/GeneratedGatePass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
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
    ref_number: "",
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
  const [refNumber, setRefNumber] = useState("");
  const [counter, setCounter] = useState(() => {
    const savedCounter = localStorage.getItem("counter");
    return savedCounter ? Number(savedCounter) : 1;
  });
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [gatepassData, setGatepassData] = useState([]);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  useEffect(() => {
    fetchEmployeesAndDepartments();
    fetchGatepass();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const fetchEmployeesAndDepartments = async () => {
    try {
      const employeesResponse = await axios.get(
        "http://localhost:3001/employee"
      );
      const departmentsResponse = await axios.get(
        "http://localhost:3001/departments"
      );

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

  const fetchGatepass = async () => {
    try {
      const response = await axios.get("http://localhost:3001/gatepass");
      setGatepassData(response.data);
    } catch (error) {
      console.error(error);
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

  // Modify the handleClick function
  const handleClick = async (e) => {
    e.preventDefault();

    const { purpose, destination, dot, departments, service_vehicle, names } =
      gatepass;

    if (
      !purpose ||
      !destination ||
      !dot ||
      !departments ||
      !service_vehicle ||
      !names
    ) {
      alert("Values are empty");
      return;
    }

    const confirm = window.confirm("Are you sure your information is correct?");
    if (!confirm) {
      return;
    }

    const date = new Date();
    const dateString = date.toISOString().slice(0, 10);

    if (dateString !== currentDate) {
      setCounter(1);
      localStorage.setItem("counter", "1");
      setCurrentDate(dateString);
    } else {
      setCounter(counter + 1);
      localStorage.setItem("counter", String(counter + 1));
    }

    const refNumber = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}-${String(
      counter
    ).padStart(4, "0")}`;

    try {
      const response = await axios.post("http://localhost:3001/gatepass", {
        ...gatepass,
        ref_number: refNumber,
      });

      // Add the new gatepass to the gatepassData state
      setGatepassData((prevGatepassData) => [
        ...prevGatepassData,
        {
          ...gatepass,
          ref_number: refNumber,
          gatepass_id: response.data.insertId,
        },
      ]);

      // setGatepass({
      //   ref_number: "",
      //   purpose: "",
      //   destination: "",
      //   dot: "",
      //   departments: "",
      //   service_vehicle: "",
      //   names: "",
      // });
      // setDestination("");
      // setDateOfTravel("");
      // setDepartment("");
      // setName("");
      // setServiceVehicle("");

      alert(response.data);
      setDescription(purpose);
      setServiceVehicle(service_vehicle);
      setButtonPopup(true);
      setRefNumber(refNumber);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const deleteGatepass = async (id) => {
    // Ask the user to confirm
    const confirm = window.confirm("Are you want to delete this gatepass?");
    if (!confirm) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:3001/gatepass/${id}`
      );
      if (response.status === 200) {
        // Remove the deleted gatepass from the gatepassData state
        setGatepassData(
          gatepassData.filter((gatepass) => gatepass.gatepass_id !== id)
        );
        alert("Gatepass has been deleted");
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        alert("Gatepass not found");
      } else {
        console.error(err);
      }
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
                      <option value="Gumaca">Gumaca</option>
                      <option value="Macalelon">Macalelon</option>
                      <option value="Pitogo">Pitogo</option>
                      <option value="Lopez">Lopez</option>
                      <option value="General Luna">General Luna</option>
                      <option value="Calauag">Calauag</option>
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

                  <label>
                    Service Vehicle
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

                  <label>
                    Name:
                    <select
                      className="dropdown-input"
                      value={name}
                      onChange={handleNameChange}
                      name="names"
                    >
                      <option value="">Select Name</option>
                      {Array.isArray(employees) &&
                        employees.map((employee) => (
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
              {error && "Something went wrong!"}
            </div>

            <GeneratedGatePass
              trigger={buttonPopUp}
              setTrigger={setButtonPopup}
              description={description}
            >
              <h2>Gate Pass</h2>
              <div className="gatepass-content">
                <p>Reference Number: {refNumber}</p>
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
                <table className="empty">
                  <thead className="empty">
                    <tr className="empty">
                      <th>Ref Number</th>
                      <th>Purpose</th>
                      <th>Destination</th>
                      <th>Date of Travel</th>
                      <th>Department</th>
                      <th>Service Vehicle</th>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="empty">
                    {gatepassData.map((gatepass, index) => {
                      return (
                        <tr key={index}>
                          <td>{gatepass.ref_number}</td>
                          <td>{gatepass.purpose}</td>
                          <td>{gatepass.destination}</td>
                          <td>{formatDate(gatepass.dot)}</td>
                          <td>{gatepass.departments}</td>
                          <td>{gatepass.service_vehicle}</td>
                          <td>{gatepass.names}</td>
                          <td>
                            <div className="delete">
                              <button
                                onClick={() =>
                                  deleteGatepass(gatepass.gatepass_id)
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Gatepass;
