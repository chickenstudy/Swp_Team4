import React from "react";
import UserLayout from "../../../layouts/UserLayout";
import { Link } from "react-router-dom";
import "./movies.css";
import Carousel from "react-bootstrap/Carousel";
import MoviesCard from "./MoviesCard"; // Import MovieCard component
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Movies() {
  const movies = [
    {
      id: 1,
      title: "Movie 1",
      image:
        "https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/351321388_141408422277925_5184421727816832107_n.jpg?stp=dst-jpg_p843x403&_nc_cat=1&ccb=1-7&_nc_sid=730e14&_nc_ohc=csM5zVtbpJQAX_mLuRO&_nc_ht=scontent.fhan5-2.fna&oh=00_AfBEDQhcTYnIKnBAfM2LKRF6zoqS9i_NBkvvUxA3cP5Y8w&oe=648188EE",
      description: "This is Movie 1",
    },
    {
      id: 2,
      title: "Movie 2",
      image:
        "https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/351321388_141408422277925_5184421727816832107_n.jpg?stp=dst-jpg_p843x403&_nc_cat=1&ccb=1-7&_nc_sid=730e14&_nc_ohc=csM5zVtbpJQAX_mLuRO&_nc_ht=scontent.fhan5-2.fna&oh=00_AfBEDQhcTYnIKnBAfM2LKRF6zoqS9i_NBkvvUxA3cP5Y8w&oe=648188EE",
      description: "This is Movie 2",
    },
    // Thêm các phần tử khác tương tự
  ];
  return (
    <>
      <span className="hotmovies narbar">
        <Link to="/" style={{ textDecoration: "none", color: "#000000" }}>
          HOT MOVIES
        </Link>
      </span>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.lottecinemavn.com/Media/WebAdmin/4dd36ed1cad242ec9bbb5400624a9b22.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.lottecinemavn.com/Media/WebAdmin/df18effc746842f1834d34bea8081501.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.lottecinemavn.com/Media/WebAdmin/a49acadcb9a04f73835912cdee3c489f.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <h1 className="title" style={{ textAlign: "center" }}>
        NOW SHOWING
      </h1>
      <Row>
        {movies.map((movie) => (
          <Col sm={6} md={4} lg={3} key={movie.id}>
            <MoviesCard
              title={movie.title}
              image={movie.image}
              description={movie.description}
            />
          </Col>
        ))}
      </Row>{" "}
    </>
  );
}
