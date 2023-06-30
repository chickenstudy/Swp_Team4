import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export const CinemaContext = React.createContext([]);

export default function Cinema() {
  const makeCinema = (cinema) => {
    setCinema(cinema);
  };

  const [cinema, setCinema] = useState([]);
  const [categories, setCategories] = useState([]);
  const [supplier, setSupplier] = useState([]);

  // call api
  useEffect(() => {
    fetch("http://localhost:8080/api/cinema/listCinema")
      .then((res) => res.json())
      .then((data) => {
        setCinema(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const handleDelete = (cinemaid) => {
    if (window.confirm("Muon xoa-id: " + cinemaid + "?")) {
      fetch("http://localhost:8080/api/cinema/deleteCinema/" + cinemaid, {
        method: "DELETE",
      })
        .then(() => {
          alert("Delete success");
          window.location.reload("/cinema");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h2 style={{ textAlign: "center" }}>List Cinema</h2>
          </Col>
        </Row>

        <Row>
          <Col style={{ textAlign: "right" }}>
            <Link to={"/cinema/create"}> Create new Cinema </Link>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cinema.map((p) => (
                  <tr key={p.cinemaid}>
                    <td>{p.cinemaid}</td>
                    <td>
                      {
                        <Link to={"/cinema/detail/" + p.cinemaid}>
                          {p.name}
                        </Link>
                      }
                    </td>
                    <td>{p.location}</td>
                    <td>
                      <Link to={"/cinema/edit/" + p.cinemaid}>Edit</Link> |{" "}
                      <Link
                        to={"/cinema"}
                        onClick={() => handleDelete(p.cinemaid)}
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
