/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./movie.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { AiOutlineFieldTime } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";

import axios from "axios";

const DetailMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [cinema, setCinema] = useState([]);
  const [showtime, setShowtime] = useState([]);
  const [startdate, setStartDate] = useState([]);
  const [starttime, setStartTime] = useState([]);
  const [movieid, setMovieId] = useState(id);
  const [cinemaid, setCinemaId] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movie/listMovie/" + id)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  console.log(cinemaid);
  // Hàm xử lý sự kiện khi người dùng thay đổi tùy chọn
  const handleCinemaChange = (event) => {
    setCinemaId(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const showtime = {
      showtime: {
        startdate,
        movieid,
        cinemaid,
        starttime,
      },
    };
    fetch("http://localhost:8080/api/showtime/create", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(showtime),
    })
      .then((res) => {
        alert("Saved successfully.");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  console.log(showtime);

  return (
    <div id="content">
      <div className="movie_trailer detail_typeA">
        <div className="movie-box d-block">
          <Carousel>
            <Carousel.Item>
              <div className="d-flex justify-content-center ">
                <img className="bannerImg" src={movie?.movie?.banner} />
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
      <Container>
        <Row>
          <Col xs={2}></Col>
          <Col className="border border-2 my-4">
            <div className="wide-top d-flex">
              <div className="thumb">
                <span className="img">
                  <img src={movie?.movie?.poster} />
                </span>
                <Button
                  href={movie?.movie?.trailer}
                  className="btn_reverse Lang-LBL0000 d-block justify-content-center my-2 rounded-0"
                  style={{
                    width: "175px",
                    border: "2px solid rgb(206, 161, 11)",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="dark"
                >
                  View trailer
                </Button>
              </div>
              <div className="info_main">
                <h2 className="movie_title">{movie?.movie?.name}</h2>
                <p>
                  <AiOutlineFieldTime size={26} /> {movie?.movie?.times}
                </p>
                <p>
                  <strong>Thể loại</strong> {movie?.movie?.type}
                </p>
                <p>
                  <strong>Quốc gia</strong> {movie?.movie?.country}
                </p>
                <p>
                  <strong>Ngày công chiếu </strong>
                  {movie?.movie?.show_date}
                </p>
              </div>
            </div>
            <div
              className="summary my-4"
              style={{ borderBottom: "1px solid grey" }}
            >
              <h3>Summary</h3>
              <p className="my-2">{movie?.movie?.description}</p>
            </div>

            <div>
              <div className="addshowtimes d-flex align-items-center">
                {" "}
                <h3 style={{ marginRight: "10px" }}>Add a showtime</h3>
                <Button onClick={handleShow} variant="">
                  <AiFillPlusCircle size="32" />
                </Button>
              </div>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Showtimes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <label class="form-label">Cinema</label>
                    <select
                      value={cinemaid} // Đặt giá trị của select theo selectedCinemaId
                      onChange={handleCinemaChange}
                      required
                      className="form-control"
                      style={{ padding: "10px" }}
                    >
                      {cinema.map((cinemaItem) => (
                        <option
                          key={cinemaItem.cinemaId}
                          value={cinemaItem.cinemaid}
                        >
                          {cinemaItem.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <br />
                  <label class="form-label">Date</label>

                  <input
                    required
                    className="form-control"
                    type="date"
                    style={{ padding: "10px" }}
                    onChange={handleStartDateChange}
                  />
                  <br />
                  <label class="form-label">Time</label>
                  <input
                    required
                    className=" form-control"
                    type="time"
                    style={{ padding: "10px" }}
                    onChange={handleStartTimeChange}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={handlesubmit} variant="primary">
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Col>
          <Col xs={2}></Col>
        </Row>
      </Container>
    </div>
  );
};
export default DetailMovie;
