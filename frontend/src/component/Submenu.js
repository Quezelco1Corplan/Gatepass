import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  overflow: hidden;

  &:hover {
    background: #252831;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #414757;
  height: 40px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 12px;

  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;

const Submenu = ({ item, isSidebarOpen }) => {
  const [subNav, setSubNav] = useState(false);
  const showSubnav = () => {
    if (isSidebarOpen) {
      setSubNav(!subNav);
    }
  };

  useEffect(() => {
    if (!isSidebarOpen) {
      setSubNav(false);
    }
  }, [isSidebarOpen]);

  return (
    <>
      <SidebarLink to={item.path} onClick={showSubnav}>
        <div>
          {item.icon}
          {isSidebarOpen && <SidebarLabel>{item.title}</SidebarLabel> }
        </div>
        <div>
        {isSidebarOpen && (item.subNav && subNav ? item.iconOpened : item.subNav ? item.iconClosed : null)}
        </div>
      </SidebarLink>
        {
            subNav &&
            item.subNav &&
            item.subNav.map((subItem, index) => (
                <DropdownLink to={subItem.path} key={index}>
                    {subItem.icon}
                    {isSidebarOpen && <SidebarLabel>{subItem.title}</SidebarLabel>}
                </DropdownLink>
                )
            )
        }
    </>
  );

       
};
export default Submenu;