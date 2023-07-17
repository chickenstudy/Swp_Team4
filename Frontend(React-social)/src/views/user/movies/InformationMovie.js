import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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

const InformationMovie = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [cinema, setCinema] = useState([]);
  const [showtime, setShowtime] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selected, setSelected] = useState(false);
  const datelist = [
    {
      date: "2023-07-19",
    },
    {
      date: "2023-07-20",
    },
    {
      date: "2023-07-21",
    },
    {
      date: "2023-07-22",
    },
    {
      date: "2023-07-23",
    },
  ];

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleCinemaChange = (event) => {
    const cinemaId = event.target.value;
    const selectedCinema = cinema.find(
      (cinemaItem) => cinemaItem.cinemaid === parseInt(cinemaId)
    );
    setSelectedCinema(selectedCinema || null);
  };
  const movieId = sessionStorage.setItem("movieid", id);
  const [startTime, setStartTime] = useState("");
  const handleTicketClick = (date, cinema, showtime, movieName, cinemaid) => {
    // Save values to session storage
    setStartTime(showtime);
    sessionStorage.setItem("date", date);
    sessionStorage.setItem("cinema", cinema);
    sessionStorage.setItem("time", showtime);
    sessionStorage.setItem("movie", movieName);
    sessionStorage.setItem("cinemaid", cinemaid);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movie/listMovie/" + id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

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
      .get("http://localhost:8080/api/showtime/starttime", {
        params: {
          movieid: id,
          cinemaid: selectedCinema.cinemaid,
          startdate: selectedDate,
        },
      })
      .then((res) => {
        setShowtime(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id, selectedCinema, selectedDate]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/showtime", {
        params: {
          movieid: id,
          cinemaid: selectedCinema.cinemaid,
          starttime: startTime,
          startdate: selectedDate,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData1(res.data[0]);
        setSelected(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id, selectedCinema, startTime, selectedDate]);
  console.log(data1.id);
  const showtimeid = sessionStorage.setItem("showtimeid", data1?.id);
  const navigate = useNavigate();
  if (selected === true) {
    navigate("/seat");
  }
  const handleOpenVideoModal = () => {
    setShowVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
  };
  return (
    <div id="">
      <div className="movie_trailer detail_typeA">
        <div className="movie-box d-block">
          <Carousel>
            <Carousel.Item>
              <div className="d-flex justify-content-center ">
                <img
                  className="bannerImg"
                  src={data?.movie?.banner}
                  alt="Banner"
                />
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
      <Container>
        <Row>
          <Col xs={2}></Col>
          <Col className="my-4">
            <div className="wide-top d-flex">
              <div className="thumb">
                <span className="img">
                  <img src={data?.movie?.poster} alt="Poster" />
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
            <div className="showtimes">
              <h3>LỊCH CHIẾU</h3>

              <Row className="mt-4">
                <Col md={3}>
                  <select
                    style={{
                      height: "40px",
                      width: "100%",
                      paddingLeft: "10px",
                    }}
                    onChange={handleDateChange}
                    value={selectedDate}
                  >
                    <option value="">Chọn ngày</option>
                    {datelist.map((dateitem) => (
                      <option key={dateitem.date} value={dateitem.date}>
                        {dateitem.date}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col md={3}>
                  <select
                    style={{
                      height: "40px",
                      width: "100%",
                      paddingLeft: "10px",
                    }}
                    onChange={handleCinemaChange}
                    value={selectedCinema ? selectedCinema.cinemaid : ""}
                  >
                    <option value="">Chọn rạp chiếu</option>
                    {cinema.map((cinemaitem) => (
                      <option
                        key={cinemaitem.cinemaid}
                        value={cinemaitem.cinemaid}
                      >
                        {cinemaitem.name}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>

              {selectedDate && selectedCinema && (
                <div className="cinema mt-5">
                  <div className="title-cinema">
                    <span>{selectedCinema?.name}</span>
                  </div>
                  <div className="item-cinema">
                    <Row>
                      <Col></Col>
                      <Col xs={8}>
                        {showtime.map((showtimeitem) => (
                          <span className="ml-3" key={showtimeitem.showtimeid}>
                            {" "}
                            <Button
                              onClick={() =>
                                handleTicketClick(
                                  selectedDate,
                                  selectedCinema?.name,
                                  showtimeitem,
                                  data?.movie?.name,
                                  selectedCinema?.cinemaid // Thêm cinemaid vào session storage
                                )
                              }
                              style={{ border: "1px solid black" }}
                              variant="light"
                            >
                              {showtimeitem}
                            </Button>
                          </span>
                        ))}
                      </Col>
                    </Row>
                  </div>
                </div>
              )}
            </div>
          </Col>
          <Col xs={2}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default InformationMovie;
