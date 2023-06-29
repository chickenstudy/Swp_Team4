/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./movie.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { AiOutlineFieldTime } from "react-icons/ai";

import axios from "axios";

const DetailMovie = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

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

  return (
    <div id="content">
      <div className="movie_trailer detail_typeA">
        <div className="movie-box d-block">
          <Carousel>
            <Carousel.Item>
              <div className="d-flex justify-content-center ">
                <img
                  className="bannerImg"
                  src={data?.movie?.banner}
                />
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
                  <img src={data?.movie?.poster} />
                </span>
                <Button
                  href={data?.movie?.trailer}
                  className="btn_reverse Lang-LBL0000 d-block justify-content-center my-2 rounded-0"
                  style={{
                    width: "175px",
                    border: "2px solid rgb(206, 161, 11)",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="dark">
                  View trailer
                </Button>
              </div>
              <div className="info_main">
                <h2 className="movie_title">{data?.movie?.name}</h2>
                <p><AiOutlineFieldTime size={26}/> {data?.movie?.times}</p>
                <p><strong>Thể loại</strong> {data?.movie?.type}</p>
                <p><strong>Quốc gia</strong> {data?.movie?.country}</p>
                <p><strong>Ngày công chiếu </strong>{data?.movie?.show_date}</p>
              </div>
            </div>
            <div className="summary my-4">
              <h3>Summary</h3>
              <p className="my-2">{data?.movie?.description}</p>
            </div>
            <div className="text-end my-2">
              <Link to="/listmovie" className="btn btn-danger">
                Back to list
              </Link>
            </div>
          </Col>
          <Col xs={2}></Col>
        </Row>
      </Container>
    </div>
  );
};
export default DetailMovie;
