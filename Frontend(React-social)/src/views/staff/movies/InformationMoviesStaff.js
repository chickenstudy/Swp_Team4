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
import { Form, Modal } from "react-bootstrap";
import SeatCinema from "../../user/movies/SeatCinema";

export default function InformationMoviesStaff() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [showtime, setShowtime] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [date, setDate] = useState([]); // [1, 2, 3, 4, 5, 6, 7
  const [time, setTime] = useState("");
  const movie = sessionStorage.setItem("movie", data?.movie?.name);
  const cinema = sessionStorage.setItem("cinema", "tuann");
  const dateMovies = sessionStorage.setItem("date", date);
  const timeStart = sessionStorage.setItem("time", time);

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
      .get("http://localhost:8080/api/showtime/listShowtime")
      .then((res) => {
        setShowtime(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleOpenVideoModal = () => {
    setShowVideoModal(true);
  };
  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
  };

  return (
    <div id="">
      <Container>
        <Row style={{ marginBottom: "20px" }}>
          <Col>
            {" "}
            <h3>LỊCH CHIẾU: </h3>
            <input
              type="date"
              style={{
                height: "40px",
                width: "100%",
                paddingLeft: "10px",
              }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Col>
          <Col>
            {" "}
            <h3>Time to start:</h3>
            {showtime.map((item) => (
              <span className="ml-3">
                <Button
                  style={{ border: "1px solid black" }}
                  variant="light"
                  value={item.starttime}
                  onClick={(e) => setTime(e.target.value)}
                >
                  {item.starttime}
                </Button>
              </span>
            ))}
          </Col>
        </Row>
        <SeatCinema />
      </Container>
    </div>
  );
}
