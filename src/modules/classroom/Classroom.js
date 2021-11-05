import React from "react";
import "./classroom.css";
import { HomeOutlined } from "@material-ui/icons";

function Classroom() {
  return (
    <div className="classroom">
      <div className="classroomTitle">
        <HomeOutlined className="classroomIcon" /> / Danh sách lớp học
      </div>
    </div>
  );
}

export default Classroom;
