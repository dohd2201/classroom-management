import React from "react";
import "./topbar.css";
import {
  NotificationsNone,
  Settings,
  ExitToAppOutlined,
  PersonOutline,
} from "@material-ui/icons";
import { NavLink } from "react-router-dom";
function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <NavLink className="link" to="/dashboard">
            <span className="logo">HDD</span>
          </NavLink>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div className="topAvatarDropdown">
            <img src="../images/avatar.jpg" alt="" className="topAvatar" />
            <div className="logout">
              <div className="logoutItem">
                <ExitToAppOutlined />
                <span>Log out</span>
              </div>
              <div className="logoutItem">
                <PersonOutline />
                <span>My profile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
