/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./movies.css";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useContext } from "react";
import { ApplicationContext } from "../../../App";
import picture from "./A.jpg";
import picture1 from "./B.jpg";
import { useMediaQuery } from "react-responsive";

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

  const [visible, setVisible] = useState(8);
  const showMore = () => {
    setVisible((prevValue) => prevValue + 8);
  };
  const isDesktop = useMediaQuery({ minWidth: 1400 });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm !== "") {
      axios
        .get(`http://localhost:8080/api/movie/searchMovie/${searchTerm}`)
        .then((response) => {
          setSearchResults(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div>
      <div className="banner">
        <span className="hotmovies narbar">
          <Link to="/" style={{ textDecoration: "none", color: "#000000" }}>
            <strong>HOT MOVIES</strong>
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
        <strong>NOW SHOWING</strong>
      </h2>
      <div style={{ textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search Moives..."
          value={searchTerm}
          onChange={handleInputChange}
        />

        {searchResults.length > 0 ? (
        
          <Row>
            <Col
              md={2}
              className="d-flex justify-content-center align-items-center"></Col>
           
              <Col md={8}>
                <Row>
                  {searchResults.slice(0, visible).map((item) => (
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
                              variant="dark">
                              <a style={{ textDecoration: "none" }}>Đặt vé</a>
                            </button>
                          </div>
                        </div>
  
                        <dt
                          style={{
                            borderBottom: "1px solid #ddd",
                            wordWrap: "break-word",
                            paddingLeft: "2px",
                          }}>
                          {item.name}
                        </dt>
                        <dd style={{ paddingLeft: "2px" }}>
                          {item.times} | {item.show_date}
                        </dd>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Col>
            
            <Col
              md={2}
              className="d-flex justify-content-center align-items-center"></Col>
          </Row>
        ) : (
          <p>No results search.</p>
        )}
      </div>
      <div className="listmovie">
        <Row>
          <Col
            md={2}
            className="d-flex justify-content-center align-items-center">
            {isDesktop && (
              <img
                src={picture}
                style={{
                  width: "600px",
                  height: "200px",
                  transform: "rotate(90deg)",
                  position: "relative",
                  left: "-1px",
                }}
                alt="Picture"
              />
            )}
          </Col>{" "}
          <Col md={8}>
            <Row>
              {movies &&
                movies.slice(0, visible).map((item) => (
                  <Col md={3} className="my-3" key={item.id}>
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
                            variant="dark">
                            <a style={{ textDecoration: "none" }}>Đặt vé</a>
                          </button>
                        </div>
                      </div>

                      <dt
                        style={{
                          borderBottom: "1px solid #ddd",
                          wordWrap: "break-word",
                          paddingLeft: "2px",
                        }}>
                        {item.name}
                      </dt>
                      <dd style={{ paddingLeft: "2px" }}>
                        {item.times} | {item.show_date}
                      </dd>
                    </div>
                  </Col>
                ))}
            </Row>
          </Col>
          <Col
            md={2}
            className="d-flex justify-content-center align-items-center">
            {isDesktop && (
              <img
                src={picture1}
                style={{
                  width: "600px",
                  height: "200px",
                  transform: "rotate(90deg)",
                  position: "relative",
                  left: "-1px",
                }}
                alt="Picture"
              />
            )}
          </Col>{" "}
        </Row>
      </div>
      <div className="d-flex flex-column align-items-center">
        <Button className="mt-3" onClick={showMore} variant="dark">
          Show more
        </Button>
      </div>
    </div>
  );
}
