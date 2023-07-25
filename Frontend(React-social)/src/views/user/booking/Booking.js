import "./Booking.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ApplicationContext } from "../../../App";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Booking() {
  const { user } = useContext(ApplicationContext);
  const [movie, setMovie] = useState([]);
  const [cinema, setCinema] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [showtime, setShowtime] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);
  const [selected, setSelected] = useState(false);
  const [data, setData] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const navigate = useNavigate();
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
  useEffect(() => {
    if (selectedMovie && selectedCinema && selectedDate) {
      axios
        .get("http://localhost:8080/api/showtime/starttime", {
          params: {
            movieid: selectedMovie,
            cinemaid: selectedCinema,
            startdate: selectedDate,
          },
        })
        .then((res) => {
          setShowtime(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [selectedMovie, selectedCinema, selectedDate]);

  useEffect(() => {
    if (selectedMovie && selectedCinema && startTime && selectedDate) {
      axios
        .get("http://localhost:8080/api/showtime", {
          params: {
            movieid: selectedMovie,
            cinemaid: selectedCinema,
            starttime: startTime,
            startdate: selectedDate,
          },
        })
        .then((res) => {
          setData(res.data[0]);
          setSelected(true);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [selectedMovie, selectedCinema, startTime, selectedDate]);
  sessionStorage.setItem("showtimeid", data?.id);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movie/listMovie")
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    axios
      .get("http://localhost:8080/api/cinema/listCinema")
      .then((res) => {
        setCinema(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleClickCinema = (cinema) => () => {
    handleCinemaSelect(cinema);
  };
  const handleClickStartTime = (time) => () => {
    handleStartTimeSelect(time);
  };
  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie.id);
    sessionStorage.setItem("movie", movie.name);
    sessionStorage.setItem("movieid", movie.id);
  };
  const handleCinemaSelect = (cinema) => {
    console.log(cinema);
    setSelectedCinema(cinema.cinemaid);
    sessionStorage.setItem("cinema", cinema.name);
    sessionStorage.setItem("cinemaid", cinema.cinemaid);
  };
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    sessionStorage.setItem("date", date);
  };
  const handleStartTimeSelect = (time) => {
    setStartTime(time);
    sessionStorage.setItem("time", time);
  };
  if (user.length == 0) {
    // alert("Please login to book ticket");
    toast.error("Please login to book ticket");
  } else if (selected === true) {
    navigate("/seat");
  }
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
                    style={{
                      width: "415px",
                      color: "black",
                    }}
                    onClick={() => handleMovieSelect(item)}
                    className={
                      selectedMovie === item.id ? "selected-movie" : ""
                    }
                  >
                    <img
                      src={item.poster}
                      style={{ width: "30px" }}
                      alt="poster"
                    />
                    {item.name}
                  </Button>
                </Form.Group>
              ))}
          </Col>
          <Col md={4}>
            <Row>
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
                        <Button
                          variant="none"
                          style={{ width: "415px" }}
                          onClick={handleClickCinema(item)}
                        >
                          {item.name}
                        </Button>
                      </Form.Group>
                    ))}
                </>
              )}
            </Row>
            <Row></Row>
          </Col>
          <Col md={4}>
            {" "}
            <Form.Group
              style={{ backgroundColor: "pink", textAlign: "center" }}
            >
              <Form.Label>Select Start Date</Form.Label>
            </Form.Group>
            {selectedCinema && (
              <>
                {datelist &&
                  datelist.map((item) => (
                    <Form.Group style={{ border: "1px solid black" }}>
                      <Button
                        variant="none"
                        style={{ width: "415px" }}
                        onClick={() => handleDateSelect(item.date)}
                      >
                        {item.date}
                      </Button>
                    </Form.Group>
                  ))}
              </>
            )}
            <Form.Group
              style={{ backgroundColor: "pink", textAlign: "center" }}
            >
              <Form.Label>Select Start Time</Form.Label>
            </Form.Group>
            {selectedCinema && (
              <>
                {showtime &&
                  showtime.map((item) => (
                    <Form.Group style={{ border: "1px solid black" }}>
                      <Button
                        variant="none"
                        style={{ width: "415px" }}
                        onClick={handleClickStartTime(item)}
                      >
                        {item}
                      </Button>
                    </Form.Group>
                  ))}
              </>
            )}
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
}
