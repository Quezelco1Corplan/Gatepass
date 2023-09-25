import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import "../css/Gatepass.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function GeneratedGatePass(props) {
  const [pdfSrc, setPdfSrc] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPdf = async () => {
    setLoading(true);
    try {
      const pdfData = {
        description: props.description,
        destination: props.destination,
        dateOfTravel: props.dateOfTravel,
        serviceVehicle: props.serviceVehicle,
        department: props.department,
        employeeNames: props.employeeNames,
        area_office: props.area_office,
        dateOfTime: props.dateOfTime,
        timeIn: props.timeIn,
        timeOut: props.timeOut,
      };

      // Send the PDF data URL to the server
      const response = await axios.post(
        `http://localhost:3001/createPdf`,
        pdfData
      );
      console.log("PDF creation response:", response.data);

      // Make a request to fetch the PDF data
      const pdfResponse = await axios.get(`http://localhost:3001/fetchPdf`, {
        responseType: "blob",
      });

      const pdfBlob = new Blob([pdfResponse.data], { type: "application/pdf" });
      setPdfSrc(URL.createObjectURL(pdfBlob));
    } catch (error) {
      console.error("Axios Error:", error);
      // Handle errors and display a user-friendly message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props.trigger) {
      fetchPdf();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.trigger,
    props.description,
    props.destination,
    props.dateOfTravel,
    props.serviceVehicle,
    props.department,
    props.employeeNames,
    props.area_office,
    props.dateOfTime,
    props.timeIn,
    props.timeOut,
  ]);

  const handleDownloadClick = () => {
    if (pdfSrc) {
      saveAs(pdfSrc, "Gatepass.pdf");
    }
  };

  return props.trigger ? (
    <div className="popup-gate-pass">
      <div className="gate-pass-inner">
        <div className="gate-pass-header">
          <div>
            <h2>Preview</h2>
          </div>
          <div className="close-button-wrap">
            <button
              className="close-button"
              onClick={() => {
                props.setTrigger(false);
              }}
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
        </div>
        {loading ? (
          <p>Loading PDF...</p>
        ) : pdfSrc ? (
          <div>
            <div className="pdf-prev-container">
              <iframe
                title="Generated PDF"
                src={pdfSrc}
                width="100%"
                height="440px"
              />
            </div>
            <div className="gatepass-button-wrap">
              <button
                className="download-gatepass-button"
                onClick={handleDownloadClick}
              >
                Download Gatepass
              </button>
            </div>
          </div>
        ) : (
          <p>No PDF available.</p>
        )}
      </div>
    </div>
  ) : null;
}

export default GeneratedGatePass;
