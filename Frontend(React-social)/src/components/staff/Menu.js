import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../staff/Logo_Team.jpg";
import { Col, FormControl, Row } from "react-bootstrap";
import AccountStaff from "../../views/staff/account_staff/AccountStaff";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { isVisible } from "@testing-library/user-event/dist/utils";

function Menu() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/staffmanagement/movies">
          <span>
            <img src={logo} style={{ width: "50px" }}></img>
          </span>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
            <Nav.Link href="/staffmanagement/movies">Movies</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Row>
        <Col>
          <AccountStaff />
        </Col>
      </Row>
    </Navbar>
  );
}

export default Menu;
