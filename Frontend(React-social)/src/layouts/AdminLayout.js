import React from "react";
import SideBar from "../components/admin/sidebar/SideBar";
import Header from "../components/admin/header/Header";
import "./layout.css";

function AdminLayout({ className = "container-fluid row", children }) {
  

  return (
    <div className="wrapper">
      <Header />
      <div className="body">
        <SideBar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
