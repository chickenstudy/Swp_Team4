/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RiDeleteBinLine } from "react-icons/ri";

export default function StaffManagement() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/staff/listStaff")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  console.log(data)
  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:8080/api/staff/delete/" + id, {
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

  return (
    <div className="container">
      <h2 className="d-flex justify-content-center my-3">List Staff</h2>
      <div className="divbtn text-end mx-4">
        <Link to="/addstaff" className="btn btn-success rounded-0 mb-3">
          Add New Staff
        </Link>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="bg-dark text-white">Id</th>
            <th className="bg-dark text-white">Avatar</th>
            <th className="bg-dark text-white">Name</th>
            <th className="bg-dark text-white">Email</th>
            <th className="bg-dark text-white">Sex</th>
            <th className="bg-dark text-white">Address</th>
            <th className="bg-dark text-white">Phone number</th>
            <th className="action bg-dark text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.reverse().map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td style={{ width: "120px" }}>
                  {
                    <img
                      src={item.picture}
                      alt="Image"
                      style={{ width: "100%" }}
                    />
                  }
                </td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.sex === 1 ? "Male" : "Female"}</td>
                <td style={{width:'150px'}}>{item.address}</td>
                <td>{item.phonenumber}</td>
                <td style={{width:'75px'}} className="action">
                  <a
                    className=""
                    onClick={() => {
                      Removefunction(item.id);
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
    </div>
  );
}
