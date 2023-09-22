import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import "../css/Gatepass.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function GeneratedGatePass(props) {
  const [pdfSrc, setPdfSrc] = useState("");

  const fetchPdf = useCallback(async () => {
    const axiosInstance = axios.create({
      baseURL: "http://localhost:3001",
    });
    try {
      const pdfData = {
        description: props.description,
        destination: props.destination,
        dateOfTravel: props.dateOfTravel,
        serviceVehicle: props.serviceVehicle,
        department: props.department,
        employeeNames: props.employeeNames,
      };

      // POST request
      const postConfig = {
        url: "/createPdf",
        method: "post",
        data: pdfData,
      };

      const postResponse = await axiosInstance(postConfig);

      if (postResponse.status === 200) {
        console.log("PDF creation response:", postResponse.data);
      } else {
        console.error("POST request failed with status:", postResponse.status);
      }

      // GET request
      const getConfig = {
        url: "/fetchPdf",
        method: "get",
        responseType: "blob",
      };

      const getResponse = await axiosInstance(getConfig);

      if (getResponse.status === 200) {
        const pdfBlob = new Blob([getResponse.data], {
          type: "application/pdf",
        });

        // Display the PDF as data URI for preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setPdfSrc(reader.result);
        };
        reader.readAsDataURL(pdfBlob);
      } else {
        console.error("GET request failed with status:", getResponse.status);
      }
    } catch (err) {
      console.error("Axios Error:", err);
    }
  }, [
    props.description,
    props.destination,
    props.dateOfTravel,
    props.serviceVehicle,
    props.department,
    props.employeeNames,
  ]);

  useEffect(() => {
    if (props.trigger) {
      // Only fetch and set PDF source when the component is triggered
      fetchPdf();
    }
  }, [props.trigger, fetchPdf]);

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
