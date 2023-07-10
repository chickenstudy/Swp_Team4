import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Row, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

export default function ProfileAccount() {
  const jwt = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState("");
  const [picture, setPicture] = useState(null);
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");

  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  const navigate = useNavigate();
  const handleUpdate = () => {
    const data = {
      username,
      email,
      password,
      sex,
      address,
      picture,
      phoneNumber,
      dob,
    };

    axios
      .put(`http://localhost:8080/api/user/profiles/update/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/");
        alert("Update successfully!");
        // Thực hiện các xử lý sau khi cập nhật thành công
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi nếu có
      });
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    if (file.size > MAX_FILE_SIZE) {
      setError("The selected file size exceeds the allowed limit.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPicture(reader.result);
    };

    setError(null);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/profiles/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        setUsername(res.data.profile.username);
        setEmail(res.data.profile.email);
        setDob(res.data.profile.dob);
        setPhoneNumber(res.data.profile.phonenumber);
        setAddress(res.data.profile.address);
        setSex(res.data.profile.sex);
        setPicture(res.data.profile.picture);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <Row>
      <section style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5">
          <Form onSubmit={handleUpdate}>
            <MDBRow>
              <MDBCol>
                <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                  <MDBBreadcrumbItem>
                    <a href="/">Movies</a>
                  </MDBBreadcrumbItem>
                  <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
                </MDBBreadcrumb>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src={picture}
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: "150px" }}
                      fluid
                    />{" "}
                    <Form.Group controlId="formBasicPicture">
                      {<p>{username}</p>}
                      <Form.Label>Choose change Picture</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handlePictureChange}
                        isInvalid={!!error}
                      />

                      {error && (
                        <Form.Text className="text-danger">{error}</Form.Text>
                      )}
                    </Form.Group>
                  </MDBCardBody>
                </MDBCard>

                <MDBCard className="mb-4 mb-lg-0">
                  <MDBCardBody className="p-0">
                    <MDBListGroup flush className="rounded-3">
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fas icon="globe fa-lg text-warning" />
                        <MDBCardText>https://mdbootstrap.com</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon
                          fab
                          icon="github fa-lg"
                          style={{ color: "#333333" }}
                        />
                        <MDBCardText>mdbootstrap</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon
                          fab
                          icon="twitter fa-lg"
                          style={{ color: "#55acee" }}
                        />
                        <MDBCardText>@mdbootstrap</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon
                          fab
                          icon="instagram fa-lg"
                          style={{ color: "#ac2bac" }}
                        />
                        <MDBCardText>mdbootstrap</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon
                          fab
                          icon="facebook fa-lg"
                          style={{ color: "#3b5998" }}
                        />
                        <MDBCardText>mdbootstrap</MDBCardText>
                      </MDBListGroupItem>
                    </MDBListGroup>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol lg="8" onSubmit={handleUpdate}>
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <Form>
                          <Form.Control
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </Form>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <Form.Group controlId="formBasicEmail">
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
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Phone</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <Form.Group controlId="formBasicPhoneNumber">
                          <Form.Control
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </Form.Group>
                      </MDBCol>
                    </MDBRow>
                    <hr />

                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Address</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <Form.Group controlId="formBasicAddress">
                          <Form.Control
                            type="text"
                            placeholder="Enter your Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </Form.Group>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Sex</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <Form.Group controlId="formBasicSex">
                          <Form.Control
                            as="select"
                            custom
                            value={sex}
                            onChange={handleSexChange}
                          >
                            <option value="">Choose option</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Other">Other</option>
                          </Form.Control>
                        </Form.Group>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Date of Birth</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <Form.Group controlId="formBasicDob">
                          <Form.Control
                            type="date"
                            placeholder="Date of Birth"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                          />
                        </Form.Group>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <Button variant="primary" size="lg">
                Update Profile
              </Button>
            </MDBRow>
          </Form>
        </MDBContainer>
      </section>

      <Col md={6}>
        <Form className="signup-form"></Form>
      </Col>
    </Row>
  );
}