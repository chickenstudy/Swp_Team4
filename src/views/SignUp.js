import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/SignUp.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const data = {
        name: name,
        email: email,
        password: password,
        dob: Dob,
        gender: gender,
      };

      axios
        .post("http://localhost:9999/register", data)
        .then((response) => {
          // Handle response if necessary
          console.log(response);
          navigate("/");
        })
        .catch((error) => {
          // Handle error if there is one
          console.error(error);
        });
    } else {
      setError("Passwords do not match.");
    }
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Sign Up</h1>
      <div
        className="row content d-flex justify-content-center align-items-center"
        id="signup"
      >
        <div className="signup-block">
          <Form onSubmit={handleSubmit} className="signup-form">
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
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

            <Form.Group controlId="formBasicDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date of Birth"
                value={Dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                custom
                value={gender}
                onChange={handleGenderChange}
              >
                <option value="">Choose option</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
