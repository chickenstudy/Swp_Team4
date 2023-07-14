/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { AiOutlineFieldTime } from "react-icons/ai";
import axios from "axios";
import ReactPlayer from "react-player";
import { Modal } from "react-bootstrap";
import "./informationMovie.css";

const Informationmovie = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [cinema, setCinema] = useState([]);
  const [cinema1, setCinema1] = useState([]);
  const [showtime, setShowtime] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movie/listMovie/" + id)
      .then((res) => {
        setData(res.data);
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

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/showtime/listShowtime")
      .then((res) => {
        setShowtime(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  console.log(cinema);

  const handleOpenVideoModal = () => {
    setShowVideoModal(true);
  };
  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
  };

  const handleTicketClick = (date, cinema, showtime, movieName) => {
    setSelectedDate(date);
    setSelectedCinema(cinema);
    setSelectedShowtime(showtime);

    // Save values to session storage
    sessionStorage.setItem("date", date);
    sessionStorage.setItem("cinema", cinema);
    sessionStorage.setItem("time", showtime);
    sessionStorage.setItem("movie", movieName);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div id="">
      <div className="movie_trailer detail_typeA">
        <div className="movie-box d-block">
          <Carousel>
            <Carousel.Item>
              <div className="d-flex justify-content-center ">
                <img className="bannerImg" src={data?.movie?.banner} />
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
      <Container>
        <Row>
          <Col xs={2}></Col>
          <Col className=" my-4">
            <div className="wide-top d-flex">
              <div className="thumb">
                <span className="img">
                  <img src={data?.movie?.poster} />
                </span>
                <Button
                  onClick={handleOpenVideoModal}
                  className="btn_reverse Lang-LBL0000 d-block justify-content-center my-2 rounded-0"
                  style={{
                    width: "175px",
                    border: "2px solid rgb(206, 161, 11)",
                  }}
                  rel="noopener noreferrer"
                  variant="dark"
                >
                  View trailer
                </Button>

                <Modal
                  show={showVideoModal}
                  onHide={handleCloseVideoModal}
                  size="lg"
                >
                  <Modal.Body>
                    <ReactPlayer
                      url={data?.movie?.trailer}
                      width="100%"
                      style={{ aspectRatio: "16/9" }} // Tỷ lệ khung hình 16:9
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseVideoModal}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <div className="info_main">
                <h2 className="movie_title">{data?.movie?.name}</h2>
                <p>
                  <AiOutlineFieldTime size={25} /> {data?.movie?.times}
                </p>
                <p>
                  <strong>Thể loại</strong> {data?.movie?.type}
                </p>
                <p>
                  <strong>Quốc gia</strong> {data?.movie?.country}
                </p>
                <p>
                  <strong>Ngày công chiếu </strong>
                  {data?.movie?.show_date}
                </p>
              </div>
            </div>
            <div className="summary my-4">
              <h3>SUMMARY</h3>
              <p className="my-2">{data?.movie?.description}</p>
            </div>
            <p class="ng-scope">&nbsp;</p>
            <div className="showtimes">
              <h3>LỊCH CHIẾU</h3>

              <Row className="mt-4">
                <Col md={3}>
                  <input
                    type="date"
                    style={{
                      height: "40px",
                      width: "100%",
                      paddingLeft: "10px",
                    }}
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </Col>
                <Col md={3}>
                  <a>
                    <span class="btn-select-value ng-binding"></span>
                    <div></div>
                  </a>
                </Col>
                <Col md={3}></Col>
                <Col md={3}></Col>
              </Row>

              {cinema.map((cinemaitem) => (
                <div className="cinema mt-5">
                  <div class="title-cinema">
                    <h5 class="">{cinemaitem.name}</h5>
                  </div>
                  <div className="item-cinema">
                    <Row>
                      <Col>{data?.movie?.type}</Col>
                      <Col xs={8}>
                        {showtime.map((showtimeitem) => (
                          <span className="ml-3">
                            {" "}
                            <Link to="/seat">
                              <Button
                                onClick={() =>
                                  handleTicketClick(
                                    selectedDate,
                                    cinemaitem.name,
                                    showtimeitem.starttime,
                                    data?.movie?.name
                                  )
                                }
                                style={{ border: "1px solid black" }}
                                variant="light"
                              >
                                {showtimeitem.starttime}
                              </Button>
                            </Link>
                          </span>
                        ))}
                      </Col>
                    </Row>
                  </div>
                </div>
              ))}
            </div>
          </Col>
          <Col xs={2}></Col>
        </Row>
      </Container>
    </div>
  );
};
export default Informationmovie;
