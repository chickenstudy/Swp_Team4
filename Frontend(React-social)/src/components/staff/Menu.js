import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../staff/Logo_Team.jpg";
import { FormControl } from "react-bootstrap";
import Account from "../../views/auth/Account";

function Menu() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/staffmanagement">
          <span>
            <img src={logo} style={{ width: "50px" }}></img>
          </span>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
            <Nav.Link href="/staffmanagement">Dashbroad</Nav.Link>
            <Nav.Link href="/staffmanagement/movies">Movies</Nav.Link>
          </Nav>
          <Form style={{ paddingRight: "500px" }}>
            <FormControl
              type="text"
              placeholder="Search"
              style={{ paddingRight: "300px" }}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
