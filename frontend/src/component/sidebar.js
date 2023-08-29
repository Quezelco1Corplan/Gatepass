import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import '../css/sidebar.css'

import { 
        RxDashboard,
        RxHamburgerMenu, 
        RxHome
       } from "react-icons/rx";
 
function Sidebar({children}) {

  const [isOpen ,setIsOpen] = useState(true);
  const toggle = () => setIsOpen (!isOpen); 

  const menuItem = [
    {
      path: '/Home',
      name: "Home",
      icon: <RxHome />
     },
     {
      path: '/Dashboard',
      name: "Dashboard",
      icon: <RxDashboard />
     }  
  ]
  return (
    <div className='sidebar-container'>
      <div style={{width: isOpen ? "200px" : "50px"}} className='sidebar'>
        <div className='top-section'> 
            <h1  style={{display: isOpen ? "block" : "none"}} className='logo'>Logo</h1>
            <div  style={{marginLeft: isOpen ? "50px" : "0px"}} className='bars'>
              <RxHamburgerMenu onClick={toggle}/>
            </div>
    
          </div>
          {
            menuItem.map((item, index)=>(
              <NavLink to={item.path} key = {index} className="link" activeclassName="active">  
                <div className='icon'>{item.icon}</div>
                <div style={{display: isOpen ? "block" : "none"}}  className='link-text'>{item.name}</div>   
              </NavLink>
            ))
          }
        </div>
        <main>{children}</main>
    </div>
  );
}

export default Sidebar;