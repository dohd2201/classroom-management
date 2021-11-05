import React from "react";
import "./activeUsers.css";
import { HomeOutlined } from "@material-ui/icons";
function ActiveUsers() {
  return (
    <div className="activeUsers">
      <div className="activeUsersTitle">
        <HomeOutlined className="activeUsersIconTitle" /> / Phê duyệt thành viên
      </div>
    </div>
  );
}

export default ActiveUsers;
