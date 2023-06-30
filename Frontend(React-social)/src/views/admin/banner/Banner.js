/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { Form } from "react-bootstrap";
import { ApplicationContext } from "../../../App";

export default function Banner() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [picture, setPicture] = useState([]);
  const { bannerid } = useParams();
  const [data, setData] = useState([]);
  const [banner, setBanner] = useState("");
  const { banners, setBanners } = useContext(ApplicationContext);
  useEffect(() => {
    if (data.movie) {
      setBanner(data.movie.banner || "");
    }
  }, [data]);

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

  const handleBannerChange = (event) => {
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
    const databanner = {
      banner: {
        picture,
      },
    };
    console.log(JSON.stringify(databanner));
    fetch("http://localhost:8080/api/banner/create", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(databanner),
    })
      .then((res) => {
        alert("Saved successfully.");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });

    axios
      .put(`http://localhost:8080/api/banner/updateBanner/${bannerid}`, data)
      .then((res) => {
        alert("Saved successfully.");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const Removefunction = (bannerid) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:8080/api/banner/deletebanner/" + bannerid, {
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
      <div className="divbtn text-end mx-4">
        <Button
          variant="success rounded-0 my-3"
          onClick={handleShow}
          type="submit"
        >
          Add new banner
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add banner</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerChange}
              />
              {picture && <p>Selected File:</p>}
            </div>
            {picture && <img src={picture} style={{ width: "100%" }} />}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handlesubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <table
        className="table table-bordered mx-auto"
        style={{ maxWidth: "800px" }}
      >
        <thead>
          <tr>
            <td className="bg-dark text-white">Id</td>
            <td className="bg-dark text-white w-100">Banner</td>
            <td className="bg-dark text-white">Action</td>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => (
              <tr key={item.bannerid}>
                <td>{item.bannerid}</td>
                <td className="">
                  {
                    <img
                      src={item.picture}
                      alt="Image"
                      style={{ width: "100%" }}
                    />
                  }
                </td>
                <td style={{ width: "100%" }}>
                  {/* <a
                    onClick={() => {
                      // LoadEdit(item.id);
                    }}>
                    <BiEdit className="btn btn-primary my-1" size={50} />
                  </a> */}
                  <Form>
                    <Form.Check
                      type="switch"
                      id={item.bannerid}
                      label="on screen"
                      onChange={(event) => {
                        if (event.target.checked == true) {
                          banners.push(item.picture);

                          setBanners(banners);
                        } else {
                          banners.pop(item.picture);
                          setBanners(banners);
                        }
                      }}
                    />{" "}
                  </Form>
                  <BiEdit
                    className="btn btn-primary my-1"
                    size={50}
                    onClick={handleShow}
                  />

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add banner</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBannerChange}
                        />
                        {picture && <p>Selected File:</p>}
                      </div>
                      {picture && (
                        <img src={picture} style={{ width: "100%" }} />
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" onClick={handlesubmit}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <a
                    className=""
                    onClick={() => {
                      Removefunction(item.bannerid);
                    }}
                  >
                    <RiDeleteBinLine
                      className="btn btn-danger my-1"
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
