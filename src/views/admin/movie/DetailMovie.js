import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    <Row>
      <h2 className="text-center my-3">Detail Movie</h2>
      <Col className="text-center" sm={3}>
        <img
          className="w-100"
          src="https://cdn.galaxycine.vn/media/2023/5/22/300x450_1684739467824.jpg"
          alt="First slide"
        />
      </Col>
      <Col sm={9}>
        <div className="">
          <form className="container">
            <h2>The Flash</h2>
            <div className="detail-info" style={{ textAlign: "" }}>
              <div className="detail-info-row">
                <div className="detail-info-right">
                <label style={{color:'gray'}}> Thể loại:&nbsp; </label>
                  Giả tưởng, hành động
                </div>
              </div>

              <div className="detail-info-row">
                <div className="detail-info-right">
                <label style={{color:'gray'}}> Diễn viên:&nbsp; </label>
                Michael Keaton, Ben Affleck, Ezra Miller
                </div>
              </div>

              <div className="detail-info-row">
                <div className="detail-info-right">
                <label style={{color:'gray'}}> Quốc gia:&nbsp; </label>
                  Mỹ
                </div>
              </div>

              <div className="detail-info-row">
                <div className="detail-info-right">
                <label style={{color:'gray'}}> :&nbsp; </label>
                  
                </div>
              </div>

              <div className="detail-info-row">
                <div className="detail-info-right">
                <label style={{color:'gray'}}> :&nbsp; </label>
                  
                </div>
              </div>

              <div className="detail-info-row">
                <div className="detail-info-right">
                <label style={{color:'gray'}}> :&nbsp; </label>
                  
                </div>
              </div>
            </div>
          </form>
        </div>
      </Col>
    </Row>
  );
};
export default DetailMovie;
