import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Default.css";
import { ApplicationContext } from "../../App";
import SignIn from "../../views/auth/SignIn";
import SignUp from "../../views/auth/SignUp";
import Account from "../../views/auth/Account";
import { Container, Image } from "react-bootstrap";
import logo from "../user/Logo_Team.jpg";

export default function Menu() {
  const { user } = React.useContext(ApplicationContext);
  return (
    <div id="container" style={{ backgroundColor: "rgb(242, 196, 141)" }}>
      <div className="row">
        <div className="col" style={{ textAlign: "left", paddingTop: "1px" }}>
          <span>
            <Image src={logo} style={{ width: "50px" }}></Image>
          </span>
          <span>
            <Link to="/booking">BOOKING</Link>
          </span>
          <span>
            <Link to="/">MOVIES</Link>
          </span>
          <span>
            <Link to="/cinemas">CINEMAS</Link>
          </span>
        </div>
        <div className="col-4" style={{ textAlign: "center" }}></div>
        <div className="col-4" style={{ textAlign: "right" }}>
          {Array.isArray(user) && user.length == 0 ? (
            <Container style={{ paddingTop: "5px" }}>
              <SignIn></SignIn> | <SignUp></SignUp>
            </Container>
          ) : (
            <Container style={{ paddingTop: "5px" }}>
              <Account></Account>
            </Container>
          )}
        </div>
      </div>
    </div>
  );
}
