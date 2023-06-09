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

export default function InformationMoviesStaff() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [showtime, setShowtime] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [date, setDate] = useState([]); // [1, 2, 3, 4, 5, 6, 7
  const [time, setTime] = useState("");
  const movie = sessionStorage.setItem("movie", data?.movie?.name);
  const cinema = "tuann";
  const dateMovies = sessionStorage.setItem("date", date);
  const timeStart = sessionStorage.setItem("time", time);
  const dateMovies12 = sessionStorage.getItem("date");
  const timeStart12 = sessionStorage.getItem("time");
  const navigate = useNavigate();

  if (dateMovies12 && timeStart12) {
    // Cả hai biến đã có giá trị và được lưu trong sessionStorage
    // Thực hiện chuyển hướng đến trang khác
    navigate("/seat");
  }
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
              <h3>LỊCH CHIẾU: </h3>

              <Row className="mt-4">
                <Col md={3}>
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
                <Col md={3}>
                  <a>
                    <span class="btn-select-value ng-binding"></span>
                    <div></div>
                  </a>
                </Col>
                <Col md={3}></Col>
                <Col md={3}></Col>
              </Row>

              <div className="cinema mt-5">
                <Row>
                  <Col xs={8}>
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
              </div>
            </div>
          </Col>
          <Col xs={2}></Col>
        </Row>
      </Container>
    </div>
  );
}
