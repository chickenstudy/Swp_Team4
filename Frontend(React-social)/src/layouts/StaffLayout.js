import React, { useEffect } from "react";
import "./layout.css";
import Menu from "../components/staff/Menu";

function StaffLayout({ className = "container-fluid row", children }) {
  return (
    <div className="wrapper">
      <Menu />
      <div className="body">
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default StaffLayout;
