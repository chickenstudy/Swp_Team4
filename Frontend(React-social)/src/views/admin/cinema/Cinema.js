/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";


export const CinemaContext = React.createContext([]);

export default function Cinema() {
  const makeCinema = (cinema) => {
    setCinema(cinema);
  };

  const [cinema, setCinema] = useState([]);

  // call api
  useEffect(() => {
    fetch("http://localhost:8080/api/cinema/listCinema")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCinema(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleDelete = (cinemaid) => {
    if (window.confirm("Do you want to remove this cinema")) {
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
            <Link
              to={"/cinema/create"}
              className="btn btn-success rounded-0 mb-2">
              {" "}
              Create new Cinema{" "}
            </Link>
          </Col>
        </Row>

        <Row>
          <Col>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="bg-dark text-white">Id</th>
                  <th className="bg-dark text-white">Name</th>
                  <th className="bg-dark text-white">Location</th>
                  <th className="bg-dark text-white" colSpan={2}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {cinema.reverse().map((p) => (
                  <tr key={p.cinemaid}>
                    <td>{p.cinemaid}</td>
                    <td>
                          {p.name}
                    </td>
                    <td>{p.location}</td>
                    <td>
                     
                      <a
                        className=""
                        onClick={() => {
                          handleDelete(p.cinemaid);
                        }}
                      >
                        <RiDeleteBinLine
                          className="btn btn-danger mx-1"
                          size={50}
                        />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
