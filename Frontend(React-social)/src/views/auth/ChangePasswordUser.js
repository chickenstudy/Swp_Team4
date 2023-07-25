import { Col, Container, Row, Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";

export default function ChangePasswordUser() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const id = sessionStorage.getItem("userid");

  const navigate = useNavigate();
  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    axios
      .put(
        `http://localhost:8080/api/user/profiles/update/forgotpassword/${id}`,
        {
          password: password,
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success("Change Password successfully", {
          onClose: () => {
            window.location.reload("/");
            sessionStorage.removeItem("userid");
          },
        }); // Thực hiện các xử lý sau khi cập nhật thành công
      })
      .catch((error) => {
        console.log(error);
        setError("Error changing password. Please try again.");
      });
  };
  return (
    <Container>
      <Row style={{ paddingTop: "50px" }}>
        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
          <MDBBreadcrumbItem>
            <a href="/">Movies</a>
          </MDBBreadcrumbItem>
          <MDBBreadcrumbItem active>Change Password</MDBBreadcrumbItem>
        </MDBBreadcrumb>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <Form.Text className="text-danger">{error}</Form.Text>}
          </Form.Group>

          <Button type="button" onClick={handleSubmit} className="btn btn-dark">
            Change Password
          </Button>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}
