import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { ApplicationContext } from "../../../App";

export default function History() {
  const { user } = useContext(ApplicationContext);
  const [data, setData] = useState([]);
  const id = localStorage.getItem("id");
  const styles = {
    available: {
      color: "green",
      fontWeight: "bold",
    },
    disabled: {
      color: "red",
      fontWeight: "bold",
    },
  };
  if (Array.isArray(user) && user.length == 0) {
    window.location.href = "/";
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/tickets/listBooking?userId=${id}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, []);
  if (!data || data.length === 0) {
    return (
      <Row>
        <Col
          style={{
            textAlign: "center",
            color: "rgb(243, 21, 89)",
            paddingTop: "30px",
          }}
        >
          <h1>You haven't had a history of buying tickets on the website. </h1>
        </Col>
      </Row>
    );
  } else {
    return (
      <Row>
        <Col>
          <Row style={{ paddingTop: "20px", paddingBottom: "20px" }}>
            <Col>
              <h2 style={{ textAlign: "center" }}>List of History d ticket</h2>
            </Col>
          </Row>

          <Row>
            <Col style={{ textAlign: "right" }}></Col>
          </Row>

          <Row>
            <Col>
              <Table className="table-bordered">
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Purchase Date</th>
                    <th>Seat</th>
                    <th>Start time </th>
                    <th>Start date</th>
                    <th>Movie name</th>
                    <th>Cinema name</th>
                    <th>Ticket code</th>
                    <th>Total</th>
                    <th colSpan={2}>Status</th>{" "}
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, index) => (
                    <tr key={index}>
                      <td style={{ textAlign: "center" }}>{index + 1}</td>
                      <td>{d.createddate}</td>
                      <td>
                        Row: {d.seatid.row}, Col: {d.seatid.col}
                      </td>
                      <td>{d.showtimeid.starttime}</td>
                      <td>{d.showtimeid.startdate}</td>
                      <td>{d.showtimeid.movie.name}</td>
                      <td>{d.showtimeid.cinema.name}</td>
                      <td>{d.ticketcode}</td>
                      <td>{d.orderid.total} VND</td>
                      <td
                        style={
                          d.ticketactive === 1
                            ? styles.available
                            : styles.disabled
                        }
                      >
                        {d.ticketactive === 1 ? "Available" : "Unavialable"}
                      </td>
                    </tr>
                  ))}{" "}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
