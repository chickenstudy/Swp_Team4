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

export default function ChangePassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [confirmationMessage1, setConfirmationMessage1] = useState("");
  const id = localStorage.getItem("id");
  const jwt = localStorage.getItem("token");
  const email1 = localStorage.getItem("email");
  const handleEmailVerification = () => {
    if (email1 !== email) {
      setError1("Email is not same with email login");
      window.location.reload();
    }

    axios
      .post("http://localhost:3001/send-otp", { email })
      .then((response) => {
        console.log(response.data);
        setConfirmationMessage("OTP has been sent to your email.");
      })
      .catch((error) => {
        console.log(error);
        setConfirmationMessage("Error sending OTP. Please try again.");
      });
  };

  const handleOtpVerification = () => {
    axios
      .post("http://localhost:3001/verify-otp", { email, otp })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setConfirmationMessage("OTP has been verified successfully.");
          setIsEmailVerified(true);
        } else {
          setConfirmationMessage("Invalid OTP. Please try again.");
          setIsEmailVerified(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setConfirmationMessage("Error verifying OTP. Please try again.");
        setIsEmailVerified(false);
      });
  };
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    axios
      .put(
        `http://localhost:8080/api/user/profiles/update/changepassword/${id}`,
        {
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success("Change Password successfully", {
          onClose: () => {
            navigate("/");
            // Thực hiện các xử lý sau khi cập nhật thành công
          },
        }); // Thực hiện các xử lý sau khi cập nhật thành công
      })
      .catch((error) => {
        console.log(error);
        setConfirmationMessage1("Error changing password. Please try again.");
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
        <Col style={{}}>
          <Row
            style={{
              borderBottom: "1px ridge gray",
            }}
          >
            <Col>
              <h2 style={{ textAlign: "center" }}>Change Password</h2>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    {error1 && <div className="text-danger mt-2">{error1}</div>}
                  </Form.Text>
                </Form.Group>

                {confirmationMessage ? (
                  <Form.Group controlId="formBasicOtp">
                    <Form.Label>OTP</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    {confirmationMessage && (
                      <Form.Text>{confirmationMessage}</Form.Text>
                    )}
                    <br />
                    <Button
                      onClick={handleOtpVerification}
                      className="mt-3 btn btn-dark"
                      disabled={!otp}
                    >
                      Verify OTP
                    </Button>
                  </Form.Group>
                ) : (
                  <Button
                    onClick={handleEmailVerification}
                    disabled={!email}
                    className="btn btn-dark"
                    style={{ marginTop: "10px" }}
                  >
                    Send OTP
                  </Button>
                )}

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
                  {error && (
                    <Form.Text className="text-danger">{error}</Form.Text>
                  )}
                </Form.Group>

                {confirmationMessage1 && (
                  <Form.Text>{confirmationMessage1}</Form.Text>
                )}

                {isEmailVerified && (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="btn btn-dark"
                  >
                    Change Password
                  </Button>
                )}
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}
