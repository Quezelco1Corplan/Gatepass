import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import "../css/Gatepass.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function GeneratedGatePass(props) {
  const [pdfSrc, setPdfSrc] = useState("");

  useEffect(() => {
    if (props.trigger) {
      // Only fetch and set PDF source when the component is triggered
      fetchPdf();
    }
  }, [props.trigger]);

  const fetchPdf = async () => {
    try {
      const pdfData = {
        description: props.description,
        destination: props.destination,
        dateOfTravel: props.dateOfTravel,
        serviceVehicle: props.serviceVehicle,
        department: props.department,
        employeeNames: props.employeeNames,
      }

      // Send the PDF data URL to the server
      const response = await axios.post(`http://localhost:3001/createPdf`, pdfData);
      console.log('PDF creation response:', response.data); // Log the response for debugging

      // Make a request to fetch the PDF data
      const pdfResponse = await axios.get(`http://localhost:3001/fetchPdf`, {
        responseType: "blob",
      });
      const pdfBlob = new Blob([pdfResponse.data], { type: "application/pdf" });

      // Display the PDF as data URI for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdfSrc(reader.result);
      };
      reader.readAsDataURL(pdfBlob);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  const handleDownloadClick = () => {
    // Trigger PDF download when the "Download Gatepass" button is clicked
    const pdfBlob = dataURItoBlob(pdfSrc);
    saveAs(pdfBlob, "Gatepass.pdf");
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
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
        {pdfSrc ? (
          <div>
            <div className="pdf-prev-container">
              <iframe
                title="Generated PDF"
                src={`${pdfSrc}#toolbar=0`}
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
          <p>Loading PDF...</p>
        )}
      </div>
    </div>
  ) : (
    ""
  );
}

export default GeneratedGatePass;
