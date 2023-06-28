import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddNewMovie = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [poster, setPoster] = useState("");
  const [trailer, setTrailer] = useState("");
  const [times, setTimes] = useState("");
  const [type, setType] = useState("");
  const [country, setCountry] = useState("");
  const [show_date, setShowDate] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState("");

  const [validation, valchange] = useState(false);

  const handlePosterChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPoster(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBanner(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();
  const handlesubmit = (e) => {
    e.preventDefault();
    const data = {
      movie:{
      name,
      poster,
      trailer,
      banner,
      times,
      type,
      country,
      show_date,
      description,},
    };
    console.log(JSON.stringify(data));
    fetch("http://localhost:8080/api/movie/create", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        alert("Saved successfully.");
        navigate("/listmovie");
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
                <h2 className="text-center my-3">Add New Movie</h2>
              </div>
              <div className="card-body">
                <div className="row">
                 

                  <div className="col-lg-12 my-1">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        required
                        value={name}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12 my-1">
                    <div className="form-group">
                      <label>Genre</label>
                      <input
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12 my-1">
                    <div className="form-group">
                      <label>Poster</label>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePosterChange}
                        />
                        {poster && <p>Selected File:</p>}
                      </div>
                      {poster && (
                        <img src={poster} style={{ width: "150px" }} />
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12 my-1">
                    <div className="form-group">
                      <label>Banner</label>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBannerChange}
                        />
                        {banner && <p>Selected File:</p>}
                      </div>
                      {banner && (
                        <img src={banner} style={{ width: "310px" }} />
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12 my-1">
                    <div className="form-group">
                      <label>Trailer</label>
                      <input
                        value={trailer}
                        onChange={(e) => setTrailer(e.target.value)}
                        className="form-control"></input>
                    </div>
                  </div>
                  <div className="col-lg-12 my-1">
                    <div className="form-group">
                      <label>Times</label>
                      <input
                        value={times}
                        onChange={(e) => setTimes(e.target.value)}
                        className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12 my-1">
                    <div className="form-group">
                      <label>Country</label>
                      <input
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12 my-1">
                    <div className="form-group">
                      <label>Show date</label>
                      <input
                        type="date"
                        value={show_date}
                        onChange={(e) => setShowDate(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 my-1">
                    <div className="form-group">
                      <label>Movie Content</label>
                      <textarea rows="6"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 text-end my-4">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/listmovie" className="btn btn-danger mx-3">
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
};
export default AddNewMovie;
