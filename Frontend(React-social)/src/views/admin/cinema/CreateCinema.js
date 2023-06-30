import { useEffect, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function CreateCinema() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const negative = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length == 0 || location == 0) {
      alert("Please check your input again.");
      return;
    }
    const cinema = {
      cinema: {
        name: name,
        location: location,
      },
    };

    fetch("http://localhost:8080/api/cinema/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cinema),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Create Cinema successfully.");
        setName("");
        setLocation("");
        negative("/cinema");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Row>
      <Col className="">
        <Row>
          <Col>
            <h2 style={{ textAlign: "center" }}> Create a new cinema</h2>
          </Col>
        </Row>
        <Row>
          <Col className="offset-2 col-md-8">
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Row style={{ marginBottom: "20px" }}>
                <Form.Group className="col-md-12">
                  <label>
                    Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <Form.Control
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                  {name.length == 0 && (
                    <label style={{ color: "red" }}>
                      Please enter the name.
                    </label>
                  )}
                </Form.Group>
              </Row>
              <Row style={{ marginBottom: "20px" }}>
                <Form.Group className="col-md-12">
                  <label>
                    Location<span style={{ color: "red" }}>*</span>
                  </label>
                  <Form.Control
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  {location.length == 0 && (
                    <label style={{ color: "red" }}>
                      Please enter the Location
                    </label>
                  )}
                </Form.Group>
                <Form.Group
                  className="col-md-12"
                  style={{ textAlign: "center" }}
                >
                  <Button type="submit">ADD</Button> |
                  <Link to="/cinema" className="btn btn-danger">
                    Back to Cinema List
                  </Link>
                </Form.Group>
              </Row>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
