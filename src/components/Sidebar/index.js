import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent, SidebarHeader } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import 'font-awesome/css/font-awesome.min.css';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import { IoHome } from "react-icons/io5";
import { BiDonateHeart } from "react-icons/bi";
import { BsBook } from "react-icons/bs";
import { HiCubeTransparent } from "react-icons/hi";
import './Sidebar.css'
import { NavLink, Link } from 'react-router-dom';
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
          Transparity <HiCubeTransparent />
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<IoHome />}><Nav.Link href="/home">Home</Nav.Link></MenuItem>
            <MenuItem icon={<BsBook />}>About</MenuItem>
            <SubMenu icon={<FaHeart />} title="Charities" >
              <MenuItem>Upcoming Events</MenuItem>
              <MenuItem> <Nav.Link href="/feedbackForm">Feedback Page</Nav.Link></MenuItem>
            </SubMenu>
            <MenuItem icon={<BiDonateHeart />}>Your Donations</MenuItem>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
