import React, { useState } from "react";
// import { PDFViewer } from "@react-pdf/renderer";
import Sidebar from "../component/sidebar";
import "../css/Gatepass.css";
//import SearchBar from "../component/SearchBar";
import GeneratedGatePass from "../component/GeneratedGatePass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRepeat,
  faPlus,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Gatepass = () => {
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [dateOfTravel, setDateOfTravel] = useState("");
  const [serviceVehicle, setServiceVehicle] = useState("");
  const [department, setDepartment] = useState("");
  const [employeeNames, setEmployeeNames] = useState([""]);
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [startDateOfTravel, setStartDateOfTravel] = useState("");
  const [endDateOfTravel, setEndDateOfTravel] = useState("");
  const [isMoreThanOneDayTravel, setIsMoreThanOneDayTravel] = useState(false);
  const [buttonPopUp, setButtonPopup] = useState(false);

  // Event handler for adding a new input field
  const handleAddNameClick = () => {
    setEmployeeNames([...employeeNames, ""]);
  };

  // Event handler for saving the inputs
  const handleSaveClick = () => {
    // You can access the employee names from the employeeNames state
    console.log("Employee Names:", employeeNames);
    // Perform your save logic here
  };

  // Event handler for removing an input field
  const handleRemoveNameClick = (indexToRemove) => {
    const updatedEmployeeNames = employeeNames.filter(
      (_, index) => index !== indexToRemove
    );
    setEmployeeNames(updatedEmployeeNames);
  };

  // Event handler for updating the employee name in the array
  const handleEmployeeNameChange = (index, value) => {
    const updatedEmployeeNames = [...employeeNames];
    updatedEmployeeNames[index] = value;
    setEmployeeNames(updatedEmployeeNames);
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
                {employeeNames.map((name, index) => (
                  <div key={index} className="input-container">
                    <input
                      type="text"
                      placeholder="Enter the name of employee..."
                      value={name}
                      onChange={(e) =>
                        handleEmployeeNameChange(index, e.target.value)
                      }
                    />
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveNameClick(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button className="addname-button" onClick={handleAddNameClick}>
                  <FontAwesomeIcon icon={faPlus} /> Add a name
                </button>
              </div>
              <div className="save-button">
                <button onClick={handleSaveClick}>
                  <FontAwesomeIcon icon={faCheck} /> Save
                </button>
              </div>
            </div>
            <div className="form-box">
              <div className="form-inner-left">
                <div className="form-block">
                  <div>
                    <label> Area Office:</label>
                    <select>
                      <option value="">Select Area Office</option>
                      <option value="Destination 1">Office 1</option>
                      <option value="Destination 2">Office 2</option>
                    </select>
                  </div>
                  <div>
                    <label>Department:</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option value="">Select Department</option>
                      <option value="Department 1">Department 1</option>
                      <option value="Department 2">Department 2</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label>Destination:</label>
                  <input type="text" />
                </div>

                <div>
                  <label>Service Vehicle:</label>
                  <input type="text" />
                </div>

                <div>
                  <label>Purpose:</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                          onChange={(e) => setStartDateOfTravel(e.target.value)}
                        />
                      </div>

                      <div>
                        <label>End Date:</label>
                        <input
                          type="date"
                          value={endDateOfTravel}
                          onChange={(e) => setEndDateOfTravel(e.target.value)}
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
                          value={dateOfTravel}
                          onChange={(e) => setDateOfTravel(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="time-container">
                  <div>
                    <label>Time:</label>
                    <input type="time" />
                  </div>

                  <div>
                    <label>Return Time:</label>
                    <input type="time" />
                  </div>
                </div>

                <div className="officer-container">
                  <div>
                    <label>Officer In-Charge</label>
                    <input type="text" />
                  </div>

                  <div>
                    <label>Position</label>
                    <input type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="generate-pass button">
            <button type="submit" onClick={() => setButtonPopup(true)}>
              <FontAwesomeIcon icon={faRepeat} /> Generate pass
            </button>
          </div>
        </div>

        {/* NEWLY ADDED */}
        <GeneratedGatePass trigger={buttonPopUp} setTrigger={setButtonPopup} />
      </div>
    </Sidebar>
  );
};

export default Gatepass;
