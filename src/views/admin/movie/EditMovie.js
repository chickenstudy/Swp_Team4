import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditMovie() {
  const { movieid } = useParams();

  useEffect(() => {
    fetch("http://localhost:8000/movie/" + movieid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setId(resp.id);
        setName(resp.name);
        setPoster(resp.poster);
        setBanner(resp.banner);
        setTimes(resp.times);
        setCountry(resp.country);
        setDescription(resp.description);
        setType(resp.type);
        setTrailer(resp.trailer);
        setShowDate(resp.showdate);
        activechange(resp.isactive);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [trailer, setTrailer] = useState("");
  const [poster, setPoster] = useState("");
  const [banner, setBanner] = useState("");
  const [times, setTimes] = useState("");
  const [type, setType] = useState("");
  const [country, setCountry] = useState("");
  const [showdate, setShowDate] = useState("");
  const [description, setDescription] = useState("");
  const [active, activechange] = useState(true);
  const [validation, valchange] = useState(false);

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const data = {
      id,
      name,
      trailer,
      poster,
      banner,
      times,
      type,
      country,
      showdate,
      description,
    };

    fetch("http://localhost:8000/movie/" + movieid, {
      method: "PUT",
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

  return (
    <>
      <div>
        <div className="row">
          <div className="offset-lg-3 col-lg-6">
            <form className="container" onSubmit={handlesubmit}>
              <div className="card" style={{ textAlign: "left" }}>
                <div className="card-title d-flex justify-content-center my-3">
                  <h2>Edit Movie</h2>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
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

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Trailer</label>
                        <input
                          value={trailer}
                          onChange={(e) => setTrailer(e.target.value)}
                          className="form-control"></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Poster</label>
                        <div>
                          <input
                            value={poster}
                            type="file"
                            accept="image/*"
                            onChange={handlePosterChange}
                            
                          />
                          {poster && <p>Selected File:</p>}
                        </div>
                          {poster && (
                            <img src={poster} style={{ width: "110px" }} />
                          )}
                      </div>
                    </div>

                    <div className="col-lg-12">
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
                            <img src={banner} style={{ width: "110px" }} />
                          )}
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Times</label>
                        <input
                          value={times}
                          onChange={(e) => setTimes(e.target.value)}
                          className="form-control"></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Type</label>
                        <input
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="form-control"></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Country</label>
                        <input
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="form-control"></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Show Date</label>
                        <input
                          value={showdate}
                          onChange={(e) => setShowDate(e.target.value)}
                          className="form-control"></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Description</label>
                        <input
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="form-control"></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-check">
                        <input
                          checked={active}
                          onChange={(e) => activechange(e.target.checked)}
                          type="checkbox"
                          className="form-check-input"></input>
                        <label className="form-check-label">Is Active</label>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <button className="btn btn-success" type="submit">
                          Save
                        </button>
                        <Link to="/listmovie" className="btn btn-danger">
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
    </>
  );
}
