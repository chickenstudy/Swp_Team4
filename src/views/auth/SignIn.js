import React, { useState, useContext } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // import Axios
import "../../styles/SignIn.css";
import { ApplicationContext } from "../../App";

export default function SignIn() {
  const { makeSignIn } = useContext(ApplicationContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const setRoleIdInSessionStorage = (roleId) => {
    sessionStorage.setItem("roleId", roleId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        user: {
          email,
          password,
        },
      });

      const { data } = response;
      const user = data.user;
      console.log(user.token);

      if (!user) {
        throw new Error("Incorrect email or password");
      }

      makeSignIn(user);

      const roleId = user.roleID;
      setRoleIdInSessionStorage(roleId);

      switch (roleId) {
        case 1:
          navigate("/admin");
          break;
        case 2:
          navigate("/staff");
          break;
        case 3:
          navigate("/");
          break;
        default:
          throw new Error("Unknown role");
      }

      handleClose();
    } catch (error) {
      console.log(error.message);
      setError(error.response.data.errors.message);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="none" onClick={handleShow}>
        Sign In
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {error && <div className="alert alert-danger">{error}</div>}

            <Button variant="primary" type="submit">
              Sign In
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
