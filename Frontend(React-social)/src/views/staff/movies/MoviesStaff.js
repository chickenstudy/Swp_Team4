/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

export default function MoviesStaff() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const LoadDetail = (id) => {
    navigate(`/staffmanagement/movies/informationmovie/${id}`);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movie/listMovie")
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <div className="listmovie">
        <Row>
          <Col md={8} style={{ paddingLeft: "20px" }}>
            <Row>
              {movies &&
                movies.map((item) => (
                  <Col className="my-3" md={3} key={item.id}>
                    <div className="movie_box">
                      <div class="mydivouter ">
                        <img
                          style={{ width: "100%", height: "350px" }}
                          src={item.poster}
                          alt="Movie Poster"
                        />
                        <div className="mybuttonoverlap">
                          <button
                            className="btn btn-dark rounded-0"
                            onClick={LoadDetail.bind(this, item.id)}
                            style={{
                              width: "135px",
                              border: "2px solid rgb(206, 161, 11)",
                            }}
                            variant="dark"
                          >
                            <a style={{ textDecoration: "none" }}>Đặt vé</a>
                          </button>
                        </div>
                      </div>

                      <dt
                        style={{
                          borderBottom: "1px solid #ddd",
                          wordWrap: "break-word",
                          paddingLeft: "2px",
                        }}
                      >
                        {item.name}
                      </dt>
                      <dd style={{ paddingLeft: "2px" }}>
                        {item.times}
                        {item.show_date}
                      </dd>
                    </div>
                  </Col>
                ))}
            </Row>
          </Col>

          <Col md={4} style={{ borderLeft: "1px solid black3" }}>
            <Form>
              <Form.Group>
                <div style={{ textAlign: "center" }}>
                  <Form.Label>
                    <h1>Code Ticket</h1>
                  </Form.Label>
                </div>
                <Form.Control type="text"></Form.Control>
                <Form.Text className="text-muted">
                  <div style={{ textAlign: "center", paddingTop: "30px" }}>
                    <h3>Ticket Information </h3>
                  </div>
                  <div style={{ paddingTop: "30px" }}>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Cinema:</span>
                    </p>{" "}
                    <p>
                      <span style={{ fontWeight: "bold" }}>Movie: </span>
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Date: </span>
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Time: </span>
                    </p>
                    <p>
                      <span>
                        <h7>Seat booked:</h7>
                      </span>{" "}
                    </p>
                    <p>
                      <span>Number of ticket(s) booked:</span>
                      <span id="count"> </span>
                    </p>
                    <p class="text">
                      Total: <span id="total"></span>
                      <span>,000 VND</span>
                    </p>
                  </div>
                </Form.Text>
                <Button className="btn btn-dark">Payment</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}
