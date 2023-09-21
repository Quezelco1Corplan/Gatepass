import React, { useState, useEffect } from "react";
// import { PDFViewer } from "@react-pdf/renderer";
import Sidebar from "../component/sidebar";
import "../css/gate.css";
//import SearchBar from "../component/SearchBar";
//import GeneratedGatePass from "../component/GeneratedGatePass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRepeat,
  faPlus,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Gatepass = () => {
  const [gatepass, setGatepass] = useState({
    ref_number: "",
    duration_day: "",
    purpose: "",
    destination: "",
    dot: "",
    departments: "",
    service_vehicle: "",
    names: "",
    area_office: "",
    start_time: "",
    return_time: "",
    start_date: "",
    end_date: "",
  });
  const [filteredNames, setFilteredNames] = useState([]);
  const [description, setDescription] = useState("");
  const [area_office, setAreaOffice] = useState("");
  const [dateOfTravel, setDateOfTravel] = useState("");
  const [dateOfTime, setDateOfTime] = useState("");
  const [returnDateOfTime, setReturnDateOfTime] = useState("");
  const [serviceVehicle, setServiceVehicle] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [buttonPopUp, setButtonPopup] = useState(false);
  const [employeeNames, setEmployeeNames] = useState([
    { id: Math.random(), name: "" },
  ]);
  const [startDateOfTravel, setStartDateOfTravel] = useState("");
  const [endDateOfTravel, setEndDateOfTravel] = useState("");
  const [isMoreThanOneDayTravel, setIsMoreThanOneDayTravel] = useState(false);
  const [refNumber, setRefNumber] = useState("");
  const [counter, setCounter] = useState(() => {
    const savedCounter = localStorage.getItem("counter");
    return savedCounter ? Number(savedCounter) : 1;
  });
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [gatepassData, setGatepassData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  // Event handler for adding a new input field
  const handleAddNameClick = () => {
    setEmployeeNames([...employeeNames, { id: Math.random(), name: "" }]);
  };

  // // Event handler for saving the inputs
  // const handleSaveClick = () => {
  //   // You can access the employee names from the employeeNames state
  //   console.log("Employee Names:", employeeNames);
  //   // Perform your save logic here
  // };
  useEffect(() => {
    fetchEmployeesAndDepartments();
  }, []);

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

  // Event handler for removing an input field
  const handleRemoveNameClick = (idToRemove) => {
    const updatedEmployeeNames = employeeNames.filter(
      (employee) => employee.id !== idToRemove
    );
    setEmployeeNames(updatedEmployeeNames);
  };

  const handleAreaOfficeChange = (e) => {
    setAreaOffice(e.target.value);
    setGatepass((prev) => ({ ...prev, area_office: e.target.value }));
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    setGatepass((prev) => ({ ...prev, departments: e.target.value }));
  };

  const handleDestinationChange = (e) => {
    setGatepass((prev) => ({ ...prev, destination: e.target.value }));
  };

  const handleServiceVehicleChange = (e) => {
    setGatepass((prev) => ({ ...prev, service_vehicle: e.target.value }));
  };

  const handlePurposeChange = (e) => {
    setGatepass((prev) => ({ ...prev, purpose: e.target.value }));
  };

  const handleDateOfTravelChange = (e) => {
    setDateOfTravel(e.target.value);
    setGatepass((prev) => ({ ...prev, dot: e.target.value }));
  };

  const StartDateOfTravel = (e) => {
    setStartDateOfTravel(e.target.value);
    setGatepass((prev) => ({ ...prev, start_date: e.target.value }));
  };

  const EndDateOfTravel = (e) => {
    setEndDateOfTravel(e.target.value);
    setGatepass((prev) => ({ ...prev, end_date: e.target.value }));
  };

  const convertTo12HourFormat = (time24) => {
    const [hours24, minutes] = time24.split(":");
    let period = "AM";
    let hours = hours24;

    if (hours24 > 12) {
      hours = hours24 - 12;
      period = "PM";
    } else if (hours24 === "00") {
      hours = 12;
    } else if (hours24 === "12") {
      period = "PM";
    }

    return `${hours}:${minutes} ${period}`;
  };

  const handleStartTimeChange = (e) => {
    const time24 = e.target.value;
    setDateOfTime(time24);
    setGatepass((prev) => ({
      ...prev,
      start_time: convertTo12HourFormat(time24),
    }));
  };

  const handleReturnTimeChange = (e) => {
    const time24 = e.target.value;
    setReturnDateOfTime(time24);
    setGatepass((prev) => ({
      ...prev,
      return_time: convertTo12HourFormat(time24),
    }));
  };

  // Event handler for updating the employee name in the array
  const handleEmployeeNameChange = (id, value) => {
    setName(value);

    // Filter the names based on the user input
    const filtered = employees.filter((employee) =>
      employee.empName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredNames(filtered);
    setGatepass((prev) => ({ ...prev, names: value }));

    const updatedEmployeeNames = employeeNames.map((employee) =>
      employee.id === id ? { ...employee, name: value } : employee
    );
    setEmployeeNames(updatedEmployeeNames);
  };

  const handleNameClick = (name) => {
    setName(name);
    setFilteredNames([]);
  };

  // Modify the handleClick function
  const handleClick = async (e) => {
    e.preventDefault();

    const {
      purpose,
      destination,
      departments,
      service_vehicle,
      area_office,
      start_time,
      return_time,
    } = gatepass;

    if (
      !purpose ||
      !destination ||
      !departments ||
      !service_vehicle ||
      !area_office ||
      !start_time ||
      !return_time
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
      setCounter((prevCounter) => {
        const newCounter = prevCounter + 1;
        localStorage.setItem("counter", String(newCounter));
        return newCounter;
      });
    }

    const refNumber = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}-${String(
      counter
    ).padStart(4, "0")}`;

    // Loop through the employeeNames state
    for (const employee of employeeNames) {
      try {
        const response = await axios.post("http://localhost:3001/gatepass", {
          ...gatepass,
          names: employee.name, // Use the employee name from the loop
          ref_number: refNumber,
          isMoreThanOneDayTravel: Number(isMoreThanOneDayTravel),
          duration_day: isMoreThanOneDayTravel ? 1 : 0,
        });

        // Add the new gatepass to the gatepassData state
        setGatepassData((prevGatepassData) => [
          ...prevGatepassData,
          {
            ...gatepass,
            names: employee.name, // Use the employee name from the loop
            ref_number: refNumber,
            gatepass_id: response.data.insertId,
          },
        ]);

        alert(response.data);
        setDescription(purpose);
        setServiceVehicle(service_vehicle);
        setButtonPopup(true);
        setRefNumber(refNumber);
        window.location.reload();
      } catch (err) {
        console.log(err);
        setError(true);
      }
    }
  };

  return (
    <Sidebar>
      <div>
        <div className="header">
          <h1 className="title">Gatepass</h1>
        </div>
        <div className="main-wrap">
          <div className="form-wrap">
            <div className="employee-form-box">
              <div className="employee-box">
                <label>Add employee</label>
                {employeeNames.map((employee) => (
                  <div key={employee.id} className="input-container">
                    <input
                      type="text"
                      placeholder="Enter the name of employee..."
                      value={employee.name}
                      name="names"
                      onChange={(e) =>
                        handleEmployeeNameChange(employee.id, e.target.value)
                      }
                    />
                    {filteredNames.map((employee) => (
                      <div
                        key={employee.employee_id}
                        onClick={() => handleNameClick(employee.empName)}
                      >
                        {employee.empName}
                      </div>
                    ))}
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveNameClick(employee.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button className="addname-button" onClick={handleAddNameClick}>
                  <FontAwesomeIcon icon={faPlus} /> Add a name
                </button>
              </div>
            </div>
            <div className="form-box">
              <div className="form-inner-left">
                <div className="form-block">
                  <div>
                    <label> Area Office:</label>
                    <select
                      id="areaoffice"
                      value={area_office}
                      onChange={handleAreaOfficeChange}
                    >
                      <option value="">Select Area Office</option>
                      <option value="Office 1">Office 1</option>
                      <option value="Office 2">Office 2</option>
                    </select>
                  </div>
                  <div>
                    <label>Department:</label>
                    <select
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
                  </div>
                </div>

                <div>
                  <label>Destination:</label>
                  <input
                    type="text"
                    name="destination"
                    value={gatepass.destination}
                    onChange={handleDestinationChange}
                  />
                </div>

                <div>
                  <label>Service Vehicle:</label>
                  <input
                    id="service_vehicle"
                    type="text"
                    name="service_vehicle"
                    value={gatepass.service_vehicle}
                    onChange={handleServiceVehicleChange}
                  />
                </div>

                <div>
                  <label>Purpose:</label>
                  <textarea
                    name="purpose"
                    value={gatepass.purpose}
                    onChange={handlePurposeChange}
                  ></textarea>
                </div>
              </div>

              <div className="form-inner-right">
                <div className="checkbox-container">
                  <h3 className="checkbox-text">More than 1-day travel?</h3>
                  <input
                    type="checkbox"
                    id="check-active"
                    checked={isMoreThanOneDayTravel}
                    onChange={(e) =>
                      setIsMoreThanOneDayTravel(e.target.checked)
                    }
                  />
                </div>

                <div>
                  {isMoreThanOneDayTravel && (
                    <div className="date-container">
                      <div>
                        <label>Start Date:</label>
                        <input
                          type="date"
                          value={startDateOfTravel}
                          onChange={StartDateOfTravel}
                        />
                      </div>

                      <div>
                        <label>End Date:</label>
                        <input
                          type="date"
                          value={endDateOfTravel}
                          onChange={EndDateOfTravel}
                        />
                      </div>
                    </div>
                  )}

                  {!isMoreThanOneDayTravel && (
                    <div>
                      <div>
                        <label>Travel Date:</label>
                        <input
                          type="date"
                          name="dot"
                          value={dateOfTravel}
                          onChange={handleDateOfTravelChange}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="time-container">
                  <div>
                    <label>Time:</label>
                    <input
                      type="time"
                      name="start_time"
                      value={dateOfTime}
                      onChange={handleStartTimeChange}
                    />
                  </div>

                  <div>
                    <label>Return Time:</label>
                    <input
                      type="time"
                      name="return_time"
                      value={returnDateOfTime}
                      onChange={handleReturnTimeChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="generate-pass button">
            <button type="submit" onClick={handleClick}>
              <FontAwesomeIcon icon={faRepeat} /> Generate pass
            </button>
            {error && "Something went wrong!"}
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Gatepass;
