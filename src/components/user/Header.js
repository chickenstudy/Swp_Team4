import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
const headerNav = [
  {
    display: "Login",
    path: "/login",
  },
  {
    display: "My Account",
    path: "/myaccount",
  },
  {
    display: "Logout",
    path: "/logout",
  },
];

export default function Header() {
  return (
    <div className="container">
      <div className="luncher">
        <span>
          <Link to=""></Link>
        </span>
        <span>
          <Link to=""></Link>
        </span>
      </div>
    </div>
  );
}
