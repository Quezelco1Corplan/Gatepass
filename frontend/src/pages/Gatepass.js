import React, { useState, useEffect } from "react";
import Sidebar from "../component/sidebar";
import "../css/Gatepass.css";
import SearchBar from "../component/SearchBar.js";
import GeneratedGatePass from "../component/GeneratedGatePass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Gatepass = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNames, setFilteredNames] = useState([]);

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

  // search function
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
    const userInput = e.target.value;
    setName(userInput);

    // Filter the names based on the user input
    const filtered = employees.filter((employee) =>
      employee.empName.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredNames(filtered);
  };

  const handleNameClick = (name) => {
    setName(name);
    setFilteredNames([]);
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
        <div className="g-main-wrap">
          <div className="g-header">
            <h1>Gatepass</h1>
            <div className="g-search-wrap">
              <div className="g-component">
                <h3 className="h3">Search</h3>
              </div>

              <SearchBar
                isSearchVisible={isSearchVisible}
                toggleSearch={toggleSearch}
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="g-form-box">
            <div className="g-form-preview">
              <div className="g-form-wrap">
                <form onSubmit={handleClick}>
                  <div className="g-label-container">
                    <label htmlFor="purpose">
                      Purpose:
                      <textarea
                        id="purpose"
                        name="purpose"
                        value={gatepass.purpose}
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  <div className="g-label-container">
                    <label htmlFor="destination">
                      Destination:
                      <select
                        id="destination"
                        className="dropdown-input"
                        name="destination"
                        value={destination}
                        onChange={handleDestinationChange}
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
                  </div>

                  <div className="g-label-container">
                    <label htmlFor="dot">
                      Date of Travel:
                      <input
                        id="dot"
                        type="date"
                        name="dot"
                        value={dateOfTravel}
                        onChange={handleDateOfTravelChange}
                      />
                    </label>
                  </div>
                  <div className="g-label-container">
                    <label htmlFor="service_vehicle">
                      Service Vehicle
                      <input
                        id="service_vehicle"
                        type="text"
                        name="service_vehicle"
                        value={gatepass.service_vehicle}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="g-label-container">
                    <label htmlFor="departments">
                      Department:
                      <select
                        id="departments"
                        className="dropdown-input"
                        name="departments"
                        value={department}
                        onChange={handleDepartmentChange}
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
                  <div className="g-label-container">
                    <label htmlFor="names">
                      Names
                      <input
                        id="names"
                        className="dropdown-input"
                        type="text"
                        name="names"
                        value={name}
                        onChange={handleNameChange}
                      />
                      {/* Display the filtered names as suggestions */}
                      {filteredNames.map((employee) => (
                        <div
                        key={employee.employee_id}
                        onClick={() => handleNameClick(employee.empName)}
                      >
                        {employee.empName}
                      </div>
                      ))}
                    </label>
                  </div>
                </form>
                ;
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
              <div className="g-gatepass-content">
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
              <div className="history-title">
                <h3>History</h3>
              </div>
              <div className="history-content">
                <table className="g-table">
                  <thead className="g-thead">
                    <tr className="empty">
                      <th className="g-th-td">Purpose</th>
                      <th className="g-th-td">Ref Number</th>
                      <th className="g-th-td">Destination</th>
                      <th className="g-th-td">Date of Travel</th>
                      <th className="g-th-td">Department</th>
                      <th className="g-th-td">Service Vehicle</th>
                      <th className="g-th-td">Name</th>
                      <th className="g-th-td">Action</th>
                    </tr>
                  </thead>
                  <tbody className="g-tbody">
                    {gatepassData
                      .filter((gatepass) => {
                        // Change this line to match the fields you want to search
                        return (
                          gatepass.ref_number
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          gatepass.purpose
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          gatepass.destination
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          gatepass.departments
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          gatepass.service_vehicle
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          gatepass.names
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        );
                      })
                      .map((gatepass, index) => {
                        return (
                          <tr key={index}>
                            <td className="g-th-td">{gatepass.purpose}</td>
                            <td className="g-th-td">{gatepass.ref_number}</td>
                            <td className="g-th-td">{gatepass.destination}</td>
                            <td className="g-th-td">
                              {formatDate(gatepass.dot)}
                            </td>
                            <td className="g-th-td">{gatepass.departments}</td>
                            <td className="g-th-td">
                              {gatepass.service_vehicle}
                            </td>
                            <td className="g-th-td">{gatepass.names}</td>
                            <td className="g-th-td">
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
