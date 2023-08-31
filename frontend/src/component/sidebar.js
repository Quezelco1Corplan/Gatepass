import React, { useState } from "react";
// import { NavLink } from 'react-router-dom'
import "../css/sidebar.css";
import { Sidebardata } from "./Sidebardata";
import Submenu from "./Submenu";

import {
  // RxDashboard,
  RxHamburgerMenu,
  // RxHome
} from "react-icons/rx";

function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="sidebar-container">
      <div style={{ width: isOpen ? "280px" : "50px" }} className="sidebar">
        <div className="top-section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Qeuzelco1
          </h1>
          <div style={{ marginLeft: isOpen ? "70px" : "0px" }} className="bars">
            <RxHamburgerMenu onClick={toggle} />
          </div>
        </div>
        <div className="sidebar-content">
          <div className="sidebar-scroll">
            {Sidebardata.map((item, index) => {
              return <Submenu item={item} key={index} isSidebarOpen={isOpen} />;
            })}
          </div>
        </div>
        {/* {
           Sidebardata.map((item, index)=>(
              <Submenu item={item} key = {index} className="link" activeclassName="active">  
                <div className='icon'>{item.icon}</div>
                <div style={{display: isOpen ? "block" : "none"}}  className='link-text'>{item.title}</div>   
              </Submenu>
            ))
          } */}
      </div>
      <main>{children}</main>
    </div>
  );
}

export default Sidebar;
