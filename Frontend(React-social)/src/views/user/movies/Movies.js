import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./movies.css";
import Carousel from "react-bootstrap/Carousel";
import MoviesCard from "./MoviesCard"; // Import MovieCard component
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { Container } from "react-bootstrap";
import { useContext } from "react";
import { ApplicationContext } from "../../../App";

export default function Movies() {
  const { banners } = useContext(ApplicationContext);

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
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <div className="banner">
        <span className="hotmovies narbar">
          <Link to="/" style={{ textDecoration: "none", color: "#000000" }}>
            HOT MOVIES
          </Link>
        </span>
        <Carousel>
          {banners.map((banner, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={banner.content}
                alt={`Slide ${index + 1}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
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
    </div>
  );
}
