/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { Button, Form, FormControl } from "react-bootstrap";
import e from "cors";
import { ToastContainer, toast } from "react-toastify";

export default function MoviesStaff() {
  const [movies, setMovies] = useState([]);
  const [ticketcode, setTicketcode] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const LoadDetail = (id) => {
    navigate(`/staffmanagement/movies/informationmovie/${id}`);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movie/listMovie")
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const [visible, setVisible] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm !== "") {
      axios
        .get(`http://localhost:8080/api/movie/searchMovie/${searchTerm}`)
        .then((response) => {
          setSearchResults(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleTicketcode = () => {
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .put(
        `http://localhost:8080/api/staff/checkoutTicket`,
        JSON.stringify(ticketcode),
        { headers }
      )
      .then((response) => {
        toast.success("Checkout ticket successfully!");
        setData(response.data.checkoutedTicket);
        setError(null);
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status == 500) {
          setError("Ticket code has been sold!");
          setData([]);
        } else if (error.response.status == 404) {
          setError("Ticket code not found!");
          setData([]);
        }
        console.error(error);
      });
  };

  return (
    <div>
      <div className="listmovie">
        <Row>
          <Col md={8} style={{ paddingLeft: "20px" }}>
            <Row style={{ textAlign: "center" }}>
              <div style={{ textAlign: "center" }}>
                <FormControl
                  type="text"
                  placeholder="Search Moives..."
                  style={{ paddingRight: "300px" }}
                  value={searchTerm}
                  onChange={handleInputChange}
                />

                {searchResults.length > 0 ? (
                  <Row>
                    {searchResults.slice(0, visible).map((item) => (
                      <Col className="my-3" md={3} key={item.id}>
                        <div className="movie_box">
                          <div class="mydivouter ">
                            <img
                              style={{ width: "100%", height: "350px" }}
                              src={item.poster}
                              alt="Movie Poster"
                            />
                            <div className="mybuttonoverlap">
                              <button
                                className="btn btn-dark rounded-0"
                                onClick={LoadDetail.bind(this, item.id)}
                                style={{
                                  width: "135px",
                                  border: "2px solid rgb(206, 161, 11)",
                                }}
                                variant="dark"
                              >
                                <a style={{ textDecoration: "none" }}>Đặt vé</a>
                              </button>
                            </div>
                          </div>

                          <dt
                            style={{
                              borderBottom: "1px solid #ddd",
                              wordWrap: "break-word",
                              paddingLeft: "2px",
                            }}
                          >
                            {item.name}
                          </dt>
                          <dd style={{ paddingLeft: "2px" }}>
                            {item.times} | {item.show_date}
                          </dd>
                        </div>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p>No results search.</p>
                )}
              </div>
            </Row>

            <Row>
              {movies &&
                movies.map((item) => (
                  <Col className="my-3" md={3} key={item.id}>
                    <div className="movie_box">
                      <div class="mydivouter ">
                        <img
                          style={{ width: "100%", height: "350px" }}
                          src={item.poster}
                          alt="Movie Poster"
                        />
                        <div className="mybuttonoverlap">
                          <button
                            className="btn btn-dark rounded-0"
                            onClick={LoadDetail.bind(this, item.id)}
                            style={{
                              width: "135px",
                              border: "2px solid rgb(206, 161, 11)",
                            }}
                            variant="dark"
                          >
                            <a style={{ textDecoration: "none" }}>Đặt vé</a>
                          </button>
                        </div>
                      </div>

                      <dt
                        style={{
                          borderBottom: "1px solid #ddd",
                          wordWrap: "break-word",
                          paddingLeft: "2px",
                        }}
                      >
                        {item.name}
                      </dt>
                      <dd style={{ paddingLeft: "2px" }}>
                        {item.times}
                        {item.show_date}
                      </dd>
                    </div>
                  </Col>
                ))}
            </Row>
          </Col>

          <Col md={4} style={{ borderLeft: "1px solid black3" }}>
            <Form>
              <Form.Group>
                <div style={{ textAlign: "center" }}>
                  <Form.Label>
                    <h1>Code Ticket</h1>
                  </Form.Label>
                </div>

                <Row>
                  <Col md={8}>
                    <Form.Control
                      type="number"
                      style={{ width: "100%" }} // Đặt chiều rộng của input là 100% để lấp đầy cột
                      onChange={(e) => {
                        setTicketcode(e.target.value);
                      }}
                    />
                    {error && <div className="text-danger mt-2">{error}</div>}
                  </Col>
                  <Col md={4}>
                    {" "}
                    {/* Dùng md={4} để cột chiếm 4/12 (1/3) của hàng */}
                    <Button
                      style={{ width: "100%" }}
                      onClick={handleTicketcode}
                    >
                      Get
                    </Button>
                  </Col>
                </Row>
                <Form.Text className="text-muted">
                  <div style={{ textAlign: "center", paddingTop: "30px" }}>
                    <h3>Ticket Information </h3>
                  </div>
                  {data.length > 0 ? (
                    <div style={{ paddingTop: "30px" }}>
                      {/* <p>
                      <span style={{ fontWeight: "bold" }}>Cinema:</span>
                    </p>{" "} */}
                      <p>
                        <span style={{ fontWeight: "bold" }}>
                          Movie:{data[0].showtimeid.movie.name}{" "}
                        </span>
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>
                          Date: {data[0].createddate}
                        </span>
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>
                          Order by: {data[0].orderid.userid.username}{" "}
                        </span>
                      </p>
                      <p>
                        <span>
                          <h7>
                            Seat booked:
                            <br />
                            {/* Row: {data[0].seatid.row}
                          Col: {data[0].seatid.Col} */}
                            {data.map((item) => {
                              const { row, col } = item.seatid; // Lấy row và col từ seatid
                              return (
                                <div key={item.ticketid}>
                                  <li>
                                    Row: {row}, Col: {col}
                                  </li>
                                </div>
                              );
                            })}
                            <br />
                          </h7>
                        </span>{" "}
                      </p>
                      <p class="text">
                        Total: <span id="total"></span>
                        <span>{data[0].orderid.total} VND</span>
                      </p>
                    </div>
                  ) : (
                    <p>No ticket information available.</p>
                  )}
                </Form.Text>
                <Button className="btn btn-dark">Payment</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </div>
    </div>
  );
}
