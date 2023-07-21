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
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { ApplicationContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfileAccount() {
  const { user } = React.useContext(ApplicationContext);
  const jwt = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState("");
  const [picture, setPicture] = useState(null);
  const [username, setUsername] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [age, setAge] = useState(0);

  const navigate = useNavigate();
  const handleSexChange = (event) => {
    setSex(event.target.value);
  };
  const isOver18 = (dob) => {
    const currentDate = new Date();
    const inputDate = new Date(dob);
    const ageDiff = currentDate.getFullYear() - inputDate.getFullYear();
    const monthDiff = currentDate.getMonth() - inputDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < inputDate.getDate())
    ) {
      return ageDiff - 1;
    }
    return ageDiff;
  };

  const handleUpdate = () => {
    const userAge = isOver18(dob);
    if (userAge < 18) {
      toast.error("You must be over 18 years old to Update");
      return;
    } else {
      const data = {
        username,
        email,
        password,
        sex,
        address,
        picture,
        phonenumber,
        dob,
      };

      axios
        .put(`http://localhost:8080/api/user/profiles/update/${userId}`, data, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => {
          toast.success("Update success", {
            onClose: () => {
              navigate("/profile");
              // Thực hiện các xử lý sau khi cập nhật thành công
            },
          }); // Thực hiện các xử lý sau khi cập nhật thành công
        })
        .catch((error) => {
          console.error(error);
          // Xử lý lỗi nếu có
        });
    }
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
    if (!(user?.username && user?.email)) navigate("/");
  }, [user, navigate]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/profiles/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
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
                          disabled
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
                          value={phonenumber}
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
                          <option value={1}>Male</option>
                          <option value={0}>Female</option>
                          <option value={2}>Other</option>
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
            <Button
              variant="primary"
              size="lg"
              onClick={handleUpdate}
              className="btn btn-dark"
            >
              Update Profile
            </Button>
          </MDBRow>
        </Form>
      </MDBContainer>
      <ToastContainer />
    </section>
  );
}
