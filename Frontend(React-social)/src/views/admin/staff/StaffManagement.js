import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
            <td>Id</td>
            <td>Avatar</td>
            <td>Name</td>
            <td>Email</td>
            <td>Sex</td>
            <td>Address</td>
            <td>Phone number</td>
            <td className="action">Actions</td>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => {
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.picture}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.sex}</td>
                <td>{item.address}</td>
                <td>{item.phonenumber}</td>
                <td className="action">Actions</td>
              </tr>;
            })}
        </tbody>
      </table>
    </div>
  );
}
