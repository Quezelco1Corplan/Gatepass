import React from "react";
import "../css/Gatepass.css";

function GeneratedGatePass(props) {
  return props.trigger ? (
    <div className="popup-gate-pass">
      <div className="gate-pass-inner">
        <button
          className="close-button"
          onClick={() => {
            props.setTrigger(false);
          }}
        >
          Close
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default GeneratedGatePass;
