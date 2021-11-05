import React, { useState } from 'react';
import './sidebar.css';
import { NavLink, Link } from 'react-router-dom';
import {
  AssessmentOutlined,
  CheckOutlined,
  DashboardOutlined,
  PeopleAltOutlined,
} from '@material-ui/icons';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarSearch">
        <input placeholder="Search" />
      </div>
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <NavLink
              activeClassName="active-class"
              className="link"
              to="/dashboard"
            >
              <li className="sidebarListItem">
                <DashboardOutlined className="sidebarIcon" /> Trang chủ
              </li>
            </NavLink>
            <NavLink
              activeClassName="active-class"
              className="link"
              to="/takeCare"
            >
              <li className="sidebarListItem">
                <AssessmentOutlined className="sidebarIcon" /> Chăm sóc khách
                hàng
              </li>
            </NavLink>
            <NavLink
              activeClassName="active-class"
              className="link"
              to="/users"
            >
              <li className="sidebarListItem">
                <PeopleAltOutlined className="sidebarIcon" /> Quản lí thành viên
              </li>
            </NavLink>
            <NavLink
              activeClassName="active-class"
              className="link"
              to="/activeUsers"
            >
              <li className="sidebarListItem">
                <CheckOutlined className="sidebarIcon" /> Phê duyệt thành viên
              </li>
            </NavLink>
            <NavLink
              activeClassName="active-class"
              className="link"
              to="/classrooms"
            >
              <li className="sidebarListItem">
                <AssessmentOutlined className="sidebarIcon" /> Quản lí lớp học
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
