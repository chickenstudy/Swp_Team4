/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddNewStaff() {
  const [username, setUserName] = useState("");
  const [picture, setPicture] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [sex, setSex] = useState("");
  const [dob, setDob] = useState("");

  const [validation, valchange] = useState(false);

  const handlePosterChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPicture(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();
  const handlesubmit = (e) => {
    e.preventDefault();
    const data = {
      user: {
        username,
        picture,
        address,
        email,
        password,
        phonenumber,
        sex,
        dob,
      },
    };
    console.log(JSON.stringify(data));
    fetch("http://localhost:8080/api/staff/create", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        alert("Saved successfully.");
        navigate("/staff");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2 className="text-center my-3">ADD NEW STAFF</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12 my-1">
                    <div className="form-group">
                      <label>Name <span style={{ color: "red" }}>*</span></label>
                      <input
                        required
                        value={username}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => setUserName(e.target.value)}
                        className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12 my-1">
                    <div className="form-group">
                      <label>Avatar </label>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePosterChange}
                        />
                        {picture && <p>Selected File:</p>}
                      </div>
                      {picture && (
                        <img src={picture} style={{ width: "150px" }} />
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12 my-1">
                    <div className="form-group">
                      <label>Email <span style={{ color: "red" }}>*</span></label>
                      <input
                      required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12 my-1">
                    <div className="form-group">
                      <label>Password <span style={{ color: "red" }}>*</span></label>
                      <input
                      required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12 my-1">
                    <div className="form-group">
                      <label>Sex <span style={{ color: "red" }}>*</span></label>
                      <div
                      required
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                        className="form-control">
                        <select>
                          <option value="">Choose option</option>
                          <option value={1}>Male</option>
                          <option value={0}>Female</option>
                          <option value={2}>Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 my-1">
                    <div className="form-group">
                      <label>Address</label>
                      <input
                      
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12 my-1">
                    <div className="form-group">
                      <label>Data of birth</label>
                      <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 my-1">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        rows="6"
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 text-end my-4">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/staff" className="btn btn-danger mx-3">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
