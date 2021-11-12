import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent, SidebarHeader } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import 'font-awesome/css/font-awesome.min.css';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import './Sidebar.css'
import {NavLink, Link } from 'react-router-dom';

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
        Transpirity
  </SidebarHeader> 
  <SidebarContent>
          <Menu iconShape="circle">
          <MenuItem icon={<FaTachometerAlt />}>Home</MenuItem>
          <MenuItem icon={<FaGem />}>About</MenuItem>
          <SubMenu icon={<FaHeart />} title="Charities" >
            <MenuItem>Upcoming Events</MenuItem>
            <MenuItem>Feedback Page <NavLink to="/feedbackForm"></NavLink></MenuItem>
          </SubMenu>
        </Menu>
    </SidebarContent>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
