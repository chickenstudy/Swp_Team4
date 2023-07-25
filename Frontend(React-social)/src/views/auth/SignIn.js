import React, { useState, useContext } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
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
      const response = await axios.post(
        "http://localhost:8080/api/user/login",
        {
          user: {
            email,
            password,
          },
        }
      );

      const { data } = response;
      const user = data.user;

      localStorage.setItem("email", user.email);
      localStorage.setItem("token", user.token);
      localStorage.setItem("id", user.userId);
      if (!user) {
        throw new Error("Incorrect email or password");
      }

      makeSignIn(user);

      const roleId = user.roleID;
      setRoleIdInSessionStorage(roleId);

      switch (roleId) {
        case 1:
          navigate("/listmovie");
          break;
        case 2:
          navigate("/staffmanagement/movies");
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
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const handleCloseForgotPassword = () => {
    setShowForgotPassword(false);
  };
  const handleShowForgotPassword = () => setShowForgotPassword(true);
  const [otp, setOTP] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showVerifyOTP, setShowVerifyOTP] = useState(false);
  const [userid, setUserid] = useState([]);
  const sendOTP = () => {
    axios
      .post("http://localhost:3001/send-otp", { email })
      .then((response) => {
        setConfirmationMessage("OTP has been sent to your email.");
        setShowVerifyOTP(true);
      })
      .catch((error) => {
        console.log(error);
        setConfirmationMessage("Error sending OTP. Please try again.");
      });
  };

  const verifyOTP = () => {
    axios
      .post("http://localhost:3001/verify-otp", { email, otp })
      .then((response) => {
        setConfirmationMessage("OTP has been verified successfully.");
        handleCloseForgotPassword();
        navigate("/user/change-password");
      })
      .catch((error) => {
        console.log(error);
        setConfirmationMessage("Invalid OTP. Please try again.");
      });
  };
  const handleGetUserid = () => {
    axios
      .get("http://localhost:8080/api/user/profiles/userid", {
        params: {
          email: email,
        },
      })
      .then((response) => {
        setUserid(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  sessionStorage.setItem("userid", userid.userId);
  // Function to handle form submission for Forgot Password
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button
        variant="none"
        onClick={handleShow}
        style={{ color: "rgb(245, 245, 245)" }}
      >
        Sign In
      </Button>
      <Modal show={show} onHide={handleClose}>
        <div>
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
              <Form.Group style={{ paddingBottom: "20px" }}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              {error && <div className="alert alert-danger">{error}</div>}

              <Button type="submit" className="btn btn-dark">
                Sign In
              </Button>
              <Button
                variant="link"
                onClick={() => {
                  handleClose();
                  handleShowForgotPassword();
                }}
              >
                Forgot Password
              </Button>
            </Form>
          </Modal.Body>
        </div>
      </Modal>
      <Modal show={showForgotPassword} onHide={handleCloseForgotPassword}>
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Forgot Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Enter your email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <p>{confirmationMessage}</p>
              <Button
                className="btn btn-dark"
                onClick={() => {
                  sendOTP();
                  handleGetUserid();
                }}
              >
                Send OTP
              </Button>
              {showVerifyOTP && (
                <>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                  />
                  <Button className="btn btn-dark" onClick={verifyOTP}>
                    Verify OTP
                  </Button>
                </>
              )}{" "}
            </Form>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
