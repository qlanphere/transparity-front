import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent, SidebarHeader } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import 'font-awesome/css/font-awesome.min.css';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart, FaHome } from 'react-icons/fa';
import './Sidebar.css'
import {NavLink, Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap'

const Sidebar = () => {
  return (
    <div className="bar">
      <ProSidebar>
      <SidebarHeader 
       style={{
        padding: '24px',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 14,
        letterSpacing: '1px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
      >
        Transparity
  </SidebarHeader> 
  <SidebarContent>
          <Menu iconShape="circle">
          <MenuItem icon={<FaHome />}><Nav.Link href = "/home">Home</Nav.Link></MenuItem>
          <MenuItem icon={<FaGem />}>About</MenuItem>
          <SubMenu icon={<FaHeart />} title="Charities" >
            <MenuItem>Upcoming Events</MenuItem>
            <MenuItem> <Nav.Link href="/feedbackForm">Feedback Page</Nav.Link></MenuItem>
          </SubMenu>
        </Menu>
    </SidebarContent>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
