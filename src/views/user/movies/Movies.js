import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./movies.css";
import Carousel from "react-bootstrap/Carousel";
import MoviesCard from "./MoviesCard"; // Import MovieCard component
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { Container } from "react-bootstrap";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const LoadDetail = (id) => {
    navigate(`/informationmovie/${id}`);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movie/listMovie")
      .then((res) => {
        setMovies(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Container>
      <span className="hotmovies narbar">
        <Link to="/" style={{ textDecoration: "none", color: "#000000" }}>
          HOT MOVIES
        </Link>
      </span>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.lottecinemavn.com/Media/WebAdmin/df18effc746842f1834d34bea8081501.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.lottecinemavn.com/Media/WebAdmin/a49acadcb9a04f73835912cdee3c489f.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.lottecinemavn.com/Media/WebAdmin/b2397436fad3439c86f005325f05fac1.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.lottecinemavn.com/Media/WebAdmin/5164c5f4e6964c71b3f9443471000840.jpg"
            alt="Fourth slide"
          />
        </Carousel.Item>
      </Carousel>
      <h2 className="title my-3" style={{ textAlign: "center" }}>
        NOW SHOWING
      </h2>

      <div className="listmovie">
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            <Row>
              {movies &&
                movies.map((item) => (
                  <Col
                    className="my-3"
                    md={3}
                    key={item.id}
                    onClick={LoadDetail.bind(this, item.id)}
                  >
                    <MoviesCard
                      title={item.name}
                      image={item.poster}
                      times={item.times}
                      date={item.show_date}
                    />
                  </Col>
                ))}
            </Row>
          </Col>
          <Col md={2}></Col>
        </Row>
      </div>
    </Container>
  );
}
