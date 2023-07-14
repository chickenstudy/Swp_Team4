import React from "react";
import "./sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
import { BsBoxArrowRight } from "react-icons/bs";
import { useContext } from "react";
import { ApplicationContext } from "../../../App";

function SideBar() {
  const { user, makeSignOut } = useContext(ApplicationContext);
  const navigate = useNavigate();
  const makeSignOutClick = () => {
    makeSignOut();
    navigate("/");
  };
  return (
    <aside className="sidebar">
      <Nav>
        <NavLink to="/admin" className="nav-link" activeClassName="active">
          DASHBOARD
        </NavLink>

        <NavLink to="/listmovie" className="nav-link" activeClassName="active">
          <p>LIST MOVIE</p>
        </NavLink>

        <NavLink to="/staff" className="nav-link" activeClassName="active">
          <p>STAFF</p>
        </NavLink>
        <NavLink to="/cinema" className="nav-link" activeClassName="active">
          <p>CINEMA</p>
        </NavLink>

        <NavLink to="/banner" className="nav-link" activeClassName="active">
          <p>BANNER</p>
        </NavLink>

        <NavLink to="/feedback" className="nav-link" activeClassName="active">
          <p>FEEDBACK</p>
        </NavLink>
      </Nav>

      <div className="logout-button">
        <Button
          variant="outline-light"
          className="logout-btn"
          style={{ position: "relative", left: "18px", top: "474px" }}
          onClick={makeSignOutClick}
        >
          <BsBoxArrowRight className="logout-icon" />
          Logout
        </Button>
      </div>
    </aside>
  );
}

export default SideBar;
