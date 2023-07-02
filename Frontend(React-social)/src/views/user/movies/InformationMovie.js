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
import { Form, Modal } from "react-bootstrap";
import './informationMovie.css'

const Informationmovie = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
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
  console.log(data);
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
                  variant="dark">
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
                  <AiOutlineFieldTime size={26} /> {data?.movie?.times}
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
                  <input type="date" style={{ height: "40px", width: "100%", paddingLeft:'10px' }} />
                </Col>
                <Col md={3}>
                  <a>
                    <span class="btn-select-value ng-binding">Tất cả rạp</span>
                    <div></div>
                  </a>
                </Col>
                <Col md={3}></Col>
                <Col md={3}></Col>
              </Row>
  
              <div className="cinema mt-4">
                <div class="title-cinema">
                  <h5 class="">Sông Lam Nghệ An</h5>
                </div>
                <div className="item-cinema">Genre and Show Time</div>
              </div>
            </div>
          </Col>
          <Col xs={2}></Col>
        </Row>
      </Container>
    </div>
  );
};
export default Informationmovie;
