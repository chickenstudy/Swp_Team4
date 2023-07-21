import React, { useState } from "react";
import { Modal, Form, Button, Row, Col, ToastContainer } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InputGroup, FormControl } from "react-bootstrap";
import "../../styles/SignUp.css";
import { toast } from "react-toastify";
import { useRef } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState("");
  const [picture, setPicture] = useState(null);
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhonenumber] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const rpwd = useRef("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  const navigate = useNavigate();

  const handleEmailVerification = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      email === null ||
      email === "" ||
      email === undefined ||
      email === " "
    ) {
      setError1("Your email is Null");
    }
    const data = {
      user: {
        email,
        password,
        sex,
        address,
        picture,
        username,
        phoneNumber,
        dob,
      },
    };

    axios
      .post("http://localhost:8080/api/user/register", data)
      .then((response) => {
        console.log(response.message);

        if (response.status === 200) {
          alert("Sign up successful!");
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.error(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError1("Your email is Null");
        } else {
          setError1("Your email is registered");
        }
      });
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError2("Please choose an image file.");
      return;
    }
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    if (file.size > MAX_FILE_SIZE) {
      setError2("The selected file size exceeds the allowed limit.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPicture(reader.result);
    };

    setError2(null);
  };
  const handleMatchPassword = (e) => {
    if (rpwd.current.value != password) {
      setError("Passwords do not match.");
      rpwd.current.focus();
    } else {
      setError(null);
    }
  };
  const handleClose = () => {
    setShowModal(false);
    setEmail("");
    setOtp("");
    setConfirmationMessage("");
    setError1("");
    setError2("");
    setIsEmailVerified(false);
  };

  const handleShow = () => {
    setShowModal(true);
    setEmail("");
    setOtp("");
    setConfirmationMessage("");
    setError1("");
    setError2("");
    setIsEmailVerified(false);
  };
  return (
    <>
      <Button
        variant="none"
        onClick={handleShow}
        style={{ color: "rgb(245, 245, 245)" }}
      >
        Sign Up
      </Button>

      <Modal size="lg" show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="signup-form">
            <Row>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  {" "}
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                      {error1 && (
                        <div className="text-danger mt-2">{error1}</div>
                      )}
                    </Form.Text>
                  </Form.Group>
                  {confirmationMessage && (
                    <Form.Text>{confirmationMessage}</Form.Text>
                  )}
                  {confirmationMessage ? (
                    <Form.Group controlId="formBasicOtp">
                      <Form.Label>OTP</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      {error2 && (
                        <Form.Text className="text-danger">{error2}</Form.Text>
                      )}
                      <Button
                        onClick={handleOtpVerification}
                        className="btn btn-dark mt-3"
                        disabled={!otp}
                      >
                        Verify OTP
                      </Button>
                    </Form.Group>
                  ) : (
                    <Button
                      className="btn btn-dark"
                      onClick={handleEmailVerification}
                      disabled={!email}
                      size="sm"
                    >
                      Send OTP
                    </Button>
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  {" "}
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  {" "}
                  <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      // value={confirmPassword}
                      ref={rpwd}
                      onBlur={() => {
                        handleMatchPassword();
                      }}
                    />
                    {error && (
                      <Form.Text className="text-danger">{error}</Form.Text>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  {" "}
                  <Form.Group controlId="formBasicSex">
                    <Form.Label>Sex</Form.Label>
                    <Form.Control
                      as="select"
                      custom
                      value={sex}
                      onChange={handleSexChange}
                    >
                      <option value="">Choose option</option>
                      <option value={1}>Male</option>
                      <option value={0}>Female</option>
                      <option value={2}>Other</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  {" "}
                  <Form.Group controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  {" "}
                  <Form.Group controlId="formBasicPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your phone number "
                      value={phoneNumber}
                      onChange={(e) => setPhonenumber(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  {" "}
                  <Form.Group controlId="formBasicDob">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Date of Birth"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Group controlId="formBasicPicture">
                  <Form.Label>Profile Picture</Form.Label>
                  <InputGroup>
                    <FormControl
                      type="file"
                      accept="image/*"
                      onChange={handlePictureChange}
                      isInvalid={!!error2}
                    />
                  </InputGroup>
                  {error2 && (
                    <Form.Text className="text-danger">{error2}</Form.Text>
                  )}
                </Form.Group>
              </Row>
            </Row>

            {isEmailVerified && (
              <Button className="btn btn-dark" type="submit">
                Sign Up
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
