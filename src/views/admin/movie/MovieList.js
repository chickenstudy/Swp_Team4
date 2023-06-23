/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiDetail } from "react-icons/bi";

const MovieList = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("/movie/detailmovie/" + id);
  };
  const LoadEdit = (id) => {
    navigate("/movie/editmovie/" + id);
  };

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

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2 className="d-flex justify-content-center my-3">List Movie</h2>
        </div>
        <div className="card-body">
          <div className="divbtn text-end mx-4">
            <Link
              to="/movie/addmovie"
              className="btn btn-success rounded-0 mb-3"
            >
              Add new movie
            </Link>
          </div>
          <table className=" table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>Id</td>
                <td>Poster</td>
                <td>Name</td>
                <td>Type</td>
                <td>Country</td>
                <td>Show date</td>
                <td className="action">Actions</td>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item) => (
                  <tr key={item.Id}>
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
                    <td style={{ width: "110px" }}>{item.show_date}</td>
                    <td style={{ width: "103px" }} className="action">
                      <div>
                        <a
                          onClick={() => {
                            LoadDetail(item.id);
                          }}
                        >
                          <BiDetail
                            className="btn btn-outline-dark mx-1"
                            size={50}
                          />
                        </a>

                        <a
                          onClick={() => {
                            LoadEdit(item.id);
                          }}
                        >
                          <BiEdit
                            className="btn btn-outline-dark mx-1"
                            size={50}
                          />
                        </a>

                        <a
                          className=""
                          onClick={() => {
                            Removefunction(item.id);
                          }}
                        >
                          <RiDeleteBinLine
                            className="btn btn-outline-dark mx-1"
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
