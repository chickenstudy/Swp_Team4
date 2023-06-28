import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Banner() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/banner/listBanner")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="container">
      <div className="divbtn text-end mx-4">
            <Link
              to="/"
              className="btn btn-success rounded-0 mb-3">
              Add new banner
            </Link>
          </div>
      <table className="table table-bordered">
        <thead className="bg-dark text-white">
          <tr>
            <td>Id</td>
            <td>Banner</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => (
              <tr>
                <td>{data.id}</td>
                <td>{data.picture}</td>
                <td>Action</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
