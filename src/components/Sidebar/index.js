import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import 'font-awesome/css/font-awesome.min.css';

const Sidebar = () => {
  return (
    <div>
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem className="far fa-gem">Dashboard</MenuItem>
          <SubMenu title="Components" >
            <MenuItem>Home</MenuItem>
            <MenuItem>About</MenuItem>
            <MenuItem>Charities</MenuItem>
            <MenuItem>Upcoming Events</MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
