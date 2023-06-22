/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./movie.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";

const DetailMovie = () => {
  const { movieid } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/movie/" + movieid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setData(resp);
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
                  src="https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202305/11108_105_100007.jpg"
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="d-flex justify-content-center ">
                <img
                  className="bannerImg"
                  src="https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202305/11108_105_100002.jpg"
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="d-flex justify-content-center ">
                <img
                  className="bannerImg"
                  src="https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202305/11108_105_100003.jpg"
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="d-flex justify-content-center ">
                <img
                  className="bannerImg"
                  src="https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202305/11108_105_100005.jpg"
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="d-flex justify-content-center ">
                <img
                  className="bannerImg"
                  src="https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202305/11108_105_100006.jpg"
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
                  <img src="https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202305/11108_103_100004.jpg" />
                </span>
                <Button
                  href="https://www.youtube.com/watch?v=itnqEauWQZM&ab_channel=ParamountPictures"
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
                <h2 className="movie_title">TRANSFORMERS</h2>
                <p>127 phút</p>
              </div>
            </div>
            <div className="summary my-4">
              <h3>Summary</h3>
              <p>tóm tắt phim</p>
            </div>
            <Link to="/listmovie" className="btn btn-danger text-end mx-3">
              Back to list
            </Link>
          </Col>
          <Col xs={2}></Col>
        </Row>
      </Container>
    </div>
  );
};
export default DetailMovie;
