import { Link } from "react-router-dom";

import "./Booking.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Booking() {
  const [movie, setMovie] = useState([]);
  const [cinema, setCinema] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // Thêm biến trạng thái selectedMovie

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movie/listMovie")
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/cinema/listCinema")
      .then((res) => {
        setCinema(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie); // Cập nhật giá trị selectedMovie khi phim được chọn
  };

  return (
    <>
      <Container style={{ paddingTop: "30px" }}>
        <Row>
          <Col md={4}>
            <Form.Group
              style={{ backgroundColor: "pink", textAlign: "center" }}
            >
              <Form.Label style={{ margin: "auto", fontSize: "18px" }}>
                Select Movie
              </Form.Label>
            </Form.Group>
            {movie &&
              movie.map((item) => (
                <Form.Group
                  key={item.id}
                  style={{ border: "1px solid silver" }}
                >
                  <Button
                    variant="none"
                    style={{ width: "415px" }}
                    onClick={() => handleMovieSelect(item)} // Gọi hàm handleMovieSelect khi phim được chọn
                  >
                    <img src={item.poster} style={{ width: "30px" }}></img>
                    {item.name}
                  </Button>
                </Form.Group>
              ))}
          </Col>
          <Col md={4}>
            <Form.Group
              style={{ backgroundColor: "pink", textAlign: "center" }}
            >
              <Form.Label style={{ margin: "auto", fontSize: "18px" }}>
                Select Cinema
              </Form.Label>
            </Form.Group>

            {selectedMovie && ( // Kiểm tra nếu đã chọn phim thì mới hiển thị phần chọn rạp chiếu
              <>
                {cinema &&
                  cinema.map((item) => (
                    <Form.Group
                      key={item.cinemaid}
                      style={{ border: "1px solid silver" }}
                    >
                      <Button variant="none" style={{ width: "415px" }}>
                        {item.name}
                      </Button>
                    </Form.Group>
                  ))}
              </>
            )}
          </Col>
          {/* <Col md={4}>
            <Form.Group style={{ backgroundColor: "pink" }}>
              <Form.Label style={{ paddingLeft: "130px" }}>
                Select Session
              </Form.Label>
            </Form.Group>
            {data &&
              data.map((item) => (
                <Form.Group key={item.id} style={{ border: "1px solid black" }}>
                  <Button variant="none" style={{ width: "415px" }}>
                    <img src={item.poster} style={{ width: "30px" }}></img>
                    {item.name}
                  </Button>
                </Form.Group>
              ))}
          </Col> */}
        </Row>
      </Container>
    </>
  );
}
