import React from "react";
import { Link } from "react-router-dom";
import { ApplicationContext } from "../../App";
import SignIn from "../../views/auth/SignIn";
import SignUp from "../../views/auth/SignUp";
import Account from "../../views/auth/Account";
import { Container, Image } from "react-bootstrap";
import logo from "../user/Logo_Team.jpg";

export default function Menu() {
  const { user } = React.useContext(ApplicationContext);
  return (
    <div
      id="container"
      style={{ background: "linear-gradient(90deg, #000000, #737373)" }}
    >
      <div className="row">
        <div className="col" style={{ textAlign: "left", paddingTop: "1px" }}>
          <span>
            <Link to="/">
              <Image src={logo} style={{ width: "50px" }}></Image>
            </Link>
          </span>
          <span>
            <Link to="/" style={{ color: "rgb(245, 245, 245)" }}>
              MOVIES
            </Link>
          </span>

          <span>
            <Link to="/booking" style={{ color: "rgb(245, 245, 245)" }}>
              BOOKING
            </Link>
          </span>
          <span>
            {Array.isArray(user) && user.length == 0 ? (
              <span></span>
            ) : (
              <Link to="/history" style={{ color: "rgb(245, 245, 245)" }}>
                TICKET HISTORY
              </Link>
            )}
          </span>
        </div>
        <div className="col-4" style={{ textAlign: "center" }}></div>
        <div className="col-4" style={{ textAlign: "right" }}>
          {Array.isArray(user) && user.length == 0 ? (
            <Container style={{ paddingTop: "5px", color: "white" }}>
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
