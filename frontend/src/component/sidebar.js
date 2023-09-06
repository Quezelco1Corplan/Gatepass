import React, { useState } from "react";
import "../css/sidebar.css";
import { Sidebardata } from "./Sidebardata";
import Submenu from "./Submenu";
import { RxHamburgerMenu } from "react-icons/rx";

function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="sidebar-container">
      <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
        <div className="top-section">
          <h1
            style={{ display: isOpen ? "block" : "none" }}
            className="logo fixed-header"
          >
            Quezelco 1
          </h1>
          <div
            style={{ marginLeft: isOpen ? "50px" : "-8px" }}
            className="bars fixed-header"
          >
            <RxHamburgerMenu onClick={toggle} />
          </div>
        </div>
        <div className="sidebar-content">
          <div className="sidebar-scroll">
            {Sidebardata.map((item, index) => (
              <Submenu
                item={item}
                key={index}
                isSidebarOpen={isOpen}
                className="link"
                activeclassName="active"
              >
                <div className="icon">{item.icon}</div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link-text"
                >
                  {item.title}
                </div>
              </Submenu>
            ))}
          </div>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
}

export default Sidebar;