import React from "react";
import SideBar from "../components/admin/sidebar/SideBar";
import Header from "../components/admin/header/Header";
import "./layout.css";

function AdminLayout({ className = "container-fluid row", children }) {
  return (
    <div className="wrapper">
      <div className="body">
        <SideBar />
        <Header />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
