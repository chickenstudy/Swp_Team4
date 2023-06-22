/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";

const MovieList = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/movie")
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

  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:8000/movie/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const LoadDetail = (id) => {
    navigate("/movie/detailmovie/" + id);
  };
  const LoadEdit = (id) => {
    navigate("edit/" + id);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2 className="d-flex justify-content-center my-3">List Movie</h2>
        </div>
        <div className="card-body">
          <div className="divbtn text-end">
            <Link to="/movie/addmovie" className="btn btn-success mb-3">
              Add new movie
            </Link>
          </div>
          <table className=" table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Poster</td>
                <td>Type</td>
                <td>Country</td>
                <td>Premiere date</td>
                <td className="action">Actions</td>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item) => (
                  <tr key={item.id}>
                    <td style={{ width: "10px" }}>{item.id}</td>
                    <td style={{ width: "80px" }}>
                      {
                        <img
                          src={item.poster}
                          alt="Image"
                          style={{ width: "100%" }}
                        />
                      }
                    </td>
                    <td style={{ width: "110px" }}>{item.name}</td>
                    <td style={{ width: "100px" }}>{item.type}</td>
                    <td style={{ width: "110px" }}>{item.country}</td>
                    <td style={{ width: "110px" }}>{item.premiereDate}</td>
                    <td style={{ width: "103px" }} className="action">
                      <div>
                        <a
                          onClick={() => {
                            LoadDetail(item.id);
                          }}>
                          <IoEyeOutline
                            className="btn btn-outline-primary mx-1"
                            size={50}
                          />
                        </a>

                        <Link to="/">
                          <BiEdit
                            className="btn btn-outline-success mx-1"
                            size={50}
                          />
                        </Link>

                        <a
                          className=""
                          onClick={() => {
                            Removefunction(item.id);
                          }}>
                          <RiDeleteBinLine
                            className="btn btn-outline-danger mx-1"
                            size={50}
                          />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default MovieList;
