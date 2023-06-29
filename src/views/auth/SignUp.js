import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { InputGroup, FormControl } from "react-bootstrap";
import "../../styles/SignUp.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState("");
  const [picture, setPicture] = useState(null);
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhonenumber] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
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
          console.log(response);

          if (response.status === 200) {
            window.location.href = "/";
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setError("Passwords do not match.");
    }
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Vui lòng chọn tệp hình ảnh.");
      return;
    }
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    if (file.size > MAX_FILE_SIZE) {
      setError("Kích thước tệp đã chọn vượt quá giới hạn cho phép.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPicture(reader.result);
    };

    setError(null);
  };
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Button variant="none" onClick={handleShow}>
        Sign Up
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="signup-form">
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

            <Form.Group controlId="formBasicSex">
              <Form.Label>Sex</Form.Label>
              <Form.Control
                as="select"
                custom
                value={sex}
                onChange={handleSexChange}
              >
                <option value="">Choose option</option>
                <option value={0}>Female</option>
                <option value={1}>Male</option>
                <option value={2}>Other</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPicture">
              <Form.Label>Profile Picture</Form.Label>
              <InputGroup>
                <FormControl
                  type="file"
                  accept="image/*"
                  onChange={handlePictureChange}
                  isInvalid={!!error}
                />
              </InputGroup>
              {error && <Form.Text className="text-danger">{error}</Form.Text>}
            </Form.Group>

            <Form.Group controlId="formBasicPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number "
                value={phoneNumber}
                onChange={(e) => setPhonenumber(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
