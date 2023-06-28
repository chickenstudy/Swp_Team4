import { Link } from "react-router-dom";

import "./Booking.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Booking() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movie/listMovie")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <Container style={{ paddingTop: "30px" }}>
        <Row>
          <Col md={4}>
            <Form.Group style={{ backgroundColor: "pink" }}>
              <Form.Label style={{ paddingLeft: "130px" }}>
                Select Movie
              </Form.Label>
            </Form.Group>
            {data &&
              data.map((item) => (
                <Form.Group key={item.id} style={{ border: "1px soild black" }}>
                  <Button variant="none" style={{ width: "415px" }}>
                    <img src={item.poster} style={{ width: "30px" }}></img>
                    {item.name}
                  </Button>
                </Form.Group>
              ))}
          </Col>
          <Col md={4}>
            <Form.Group style={{ backgroundColor: "pink" }}>
              <Form.Label style={{ paddingLeft: "130px" }}>
                Select Cinema
              </Form.Label>
            </Form.Group>
            {data &&
              data.map((item) => (
                <Form.Group key={item.id} style={{ border: "1px soild black" }}>
                  <Button variant="none" style={{ width: "415px" }}>
                    <img src={item.poster} style={{ width: "30px" }}></img>
                    {item.name}
                  </Button>
                </Form.Group>
              ))}
          </Col>
          <Col md={4}>
            <Form.Group style={{ backgroundColor: "pink" }}>
              <Form.Label style={{ paddingLeft: "130px" }}>
                Select Session
              </Form.Label>
            </Form.Group>
            {data &&
              data.map((item) => (
                <Form.Group key={item.id} style={{ border: "1px soild black" }}>
                  <Button variant="none" style={{ width: "415px" }}>
                    <img src={item.poster} style={{ width: "30px" }}></img>
                    {item.name}
                  </Button>
                </Form.Group>
              ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}
