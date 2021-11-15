import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent, SidebarHeader } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import 'font-awesome/css/font-awesome.min.css';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart, FaSignOutAlt, FaSignInAlt, FaUserCircle, FaDonate, FaTicketAlt, FaBars } from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IoHome } from "react-icons/io5";
import { BiDonateHeart } from "react-icons/bi";
import { BsBook } from "react-icons/bs";
import { HiCubeTransparent } from "react-icons/hi";
import './Sidebar.css'
import { NavLink, Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap'
import { useAuthContext } from "../../contexts/auth";
import styled from 'styled-components';


const Sidebar = () => {

  const { currentUser, logout } = useAuthContext()

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
            <MenuItem icon={<BsBook />}><Nav.Link href='/about'>About</Nav.Link></MenuItem>
            {currentUser && <MenuItem icon={<FaTicketAlt />}><Nav.Link href="/tickets" >Tickets</Nav.Link></MenuItem>}
            {currentUser && <MenuItem icon={<FaSignOutAlt />}><Nav.Link href="/home" onClick={logout}>Logout</Nav.Link></MenuItem>}
            {!currentUser && <MenuItem icon={<FaSignInAlt />}><Nav.Link href="/login">Sign in</Nav.Link></MenuItem>}
            {!currentUser && <MenuItem icon={<FaUserCircle />}><Nav.Link href="/register">Register</Nav.Link></MenuItem>}
            <SubMenu icon={<FaHeart />} title="Charities" >
              <MenuItem>Upcoming Events</MenuItem>
              <MenuItem> <Nav.Link href="/feedbackForm">Feedback Page</Nav.Link></MenuItem>
            </SubMenu>
            {currentUser && <MenuItem icon={<BiDonateHeart />}><Nav.Link href="/donations">Donations</Nav.Link></MenuItem>}
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </div>

  );
};

export default Sidebar;
