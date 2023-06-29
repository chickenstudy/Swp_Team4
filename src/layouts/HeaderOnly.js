import React from "react";
import Header from "../components/admin/header/Header";
import "./layout.css";

function HeaderOnly({ className = "container-fluid row", title, children }) {
  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        <div className='content'>{children}</div>
      </div>
    </div>
  );
}

export default HeaderOnly;
