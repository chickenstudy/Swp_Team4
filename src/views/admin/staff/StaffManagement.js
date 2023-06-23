import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiDetail } from "react-icons/bi";
import axios from "axios";

export default function StaffManagement() {
  
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // const loadDetail = (id) => {
  //   navigate(`/movie/detailmovie/${id}`);
  // };

  // const loadEdit = (id) => {
  //   navigate(`/movie/editmovie/${id}`);
  // };

  // const removeMovie = (id) => {
  //   if (window.confirm("Do you want to remove?")) {
  //     axios
  //       .delete(`http://localhost:8080/api/movie/listMovie/${id}`)
  //       .then((res) => {
  //         alert("Removed successfully.");
  //         window.location.reload();
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //   }
  // };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/api/movie/listMovie")
  //     .then((res) => {
  //       setData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);

  
  return (
    <div className="container">
      {/* <div className="card">
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
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <th>Id</th>
                <th>Poster</th>
                <th>Name</th>
                <th>Type</th>
                <th>Country</th>
                <th>Show date</th>
                <th className="action">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td style={{ width: "80px" }}>
                    <img
                      src={item.poster}
                      alt="Image"
                      style={{ width: "100%" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.country}</td>
                  <td>{item.show_date}</td>
                  <td className="action">
                    <div>
                      <button
                        onClick={() => {
                          loadDetail(item.id);
                        }}
                      >
                        <BiDetail size={20} />
                      </button>

                      <button
                        onClick={() => {
                          loadEdit(item.id);
                        }}
                      >
                        <BiEdit size={20} />
                      </button>

                      <button
                        onClick={() => {
                          removeMovie(item.id);
                        }}
                      >
                        <RiDeleteBinLine size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  )
}
