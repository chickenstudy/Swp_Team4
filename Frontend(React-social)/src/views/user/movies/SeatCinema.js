import React, { useContext, useEffect, useState } from "react";
import "./Seat.css";
import { Button, Container, Modal, Toast } from "react-bootstrap";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import { CLOSING } from "ws";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ApplicationContext } from "../../../App";
export default function SeatCinema() {
  const { user } = useContext(ApplicationContext);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [seats, setSeats] = useState([0]);

  const cinema = sessionStorage.getItem("cinema");
  const date = sessionStorage.getItem("date");
  const time = sessionStorage.getItem("time");
  const movie = sessionStorage.getItem("movie");
  const showtimeid = sessionStorage.getItem("showtimeid");
  const [seatid, setSeatid] = useState([]);
  const [showAlert, setShowAlert] = React.useState(false);
  const [ticketcode, setTicketcode] = useState([]);
  const roleID = sessionStorage.getItem("roleId");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  function handleSuccess() {
    setShowAlert(true);
  }

  function onConfirm() {
    setShowAlert(false);
    if (roleID == 3) {
      window.location.href = "/";
    }
    window.location.href = "/staffmanagement/movies";
  }
  useEffect(() => {
    calculateTotalPrice();
  }, [count]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/seat/listSeat")
      .then((res) => {
        setSeats(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const handleSeatClick = (row, col) => {
    const seat = seats.find((seat) => seat.row === row && seat.col === col);

    if (seat) {
      // Seat is disabled, do nothing
      return;
    }

    const isSelected = selectedSeats.some(
      (seat) => seat.row === row && seat.col === col
    );

    if (isSelected) {
      const updatedSeats = selectedSeats.filter(
        (seat) => !(seat.row == row && seat.col == col)
      );

      const deselectedSeat = seats.find(
        (seat) =>
          seatid.includes(seat.seatid) && seat.row == row && seat.col == col
      );
      if (deselectedSeat) {
        setSeatid(seatid.filter((id) => id !== deselectedSeat.seatid));
      }
      setSelectedSeats(updatedSeats);
      setCount(count - 1);
    } else {
      // Cập nhật mảng selectedSeatIds sau khi chọn ghế

      const selected = seats.find((seat) => seat.row == row && seat.col == col);
      if (selected) {
        const newSeat = {
          row,
          col,
        };
        setSeatid([...seatid, selected.seatid]);

        // const newSeat = { row, col };
        const updatedSeats = [...selectedSeats, newSeat];
        setSelectedSeats(updatedSeats);
        setCount(count + 1);
      }
    }
  };

  const calculateTotalPrice = () => {
    const pricePerSeat = 50;
    const totalPrice = count * pricePerSeat;
    setTotalPrice(totalPrice);
  };

  const getActive = (row, col) => {
    const seat = seats.find((seat) => {
      return seat.row == row && seat.col == col;
    });
    if (!seat) return 1;
    return seat.active;
  };

  const renderSeats = () => {
    const seats = [];

    const rows = ["A", "B", "C", "D", "E"];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      const rowSeats = [];

      for (let col = 1; col <= 15; col++) {
        let seatClass = "seat-blank default";

        if (
          row === "A" &&
          (col === 1 || col === 2 || col === 14 || col === 15)
        ) {
          seatClass = "seat-blank default";
        } else if (
          row === "E" &&
          (col === 1 || col === 2 || col === 14 || col === 15)
        ) {
          seatClass = "seat-blank default";
        } else if (getActive(row, col) === 0) {
          seatClass = "seat occupied";
        } else {
          const isSelected = selectedSeats.some(
            (seat) => seat.row == row && seat.col == col
          );
          seatClass = isSelected ? "seat selected" : "seat";
        }

        rowSeats.push(
          <button
            key={`${row}-${col}`}
            className={seatClass}
            onClick={() => handleSeatClick(row, col)}
            disabled={getActive(row, col) === 0}
          ></button>
        );
      }
      seats.push(
        <div key={row} className="rowseat ">
          <div className="row-mark">{row}</div>
          {rowSeats}
        </div>
      );
    }

    // Thêm hàng đánh số tứ tự dưới mỗi cột
    const colNumbers = Array.from({ length: 15 }, (_, index) => (
      <div key={`col-number-${index}`} className="seat-col">
        {index + 1}
      </div>
    ));
    seats.push(
      <div key={`number-row`} className="rowseat">
        <div className="row-mark"></div>
        {colNumbers}
      </div>
    );

    return seats;
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  if (user.length == 0) {
    alert("Please login to book ticket!");
    navigate("/");
  }

  const handlePayment = () => {
    const data = {
      showtimeId: showtimeid,
      listSeatIds: JSON.stringify(seatid),
    };
    console.log(data.listSeatIds);
    if (selectedSeats == null || selectedSeats.length === 0) {
      toast.error("Please choose seat!");
      setError(true);
    } else if (data.showtimeId == null) {
      toast.error("Please choose showtime!");
      setError(true);
      navigate("/");
    } else {
      axios
        .put("http://localhost:8080/api/order/bills/createbills", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setTicketcode(response.data.ticket[0].ticketcode);
          console.log(
            "Bill created successfully!",
            response.data.ticket[0].ticketcode
          );
        })
        .catch((error) => {
          // toast.error("Please choose seat!");
          console.error("Error creating bill:", error);
        });
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#fff",
        color: "##d8d8d8",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "sans-serif",
        // marginTop: "500px",
        margin: "0",
        boxSizing: "border-box",
        marginBottom: "500px",
      }}
    >
      <div class="space" style={{ marginTop: "170px" }}></div>
      <label>Movie Selected:</label>
      <input
        type="text"
        readOnly
        style={{ border: "10px", width: "500px", textAlign: "center" }}
        value={movie}
      />

      <ul class="showcase">
        <li>
          <div class="seat-blank" id="disable"></div>
          <small>Delete seat</small>
        </li>
        <li>
          <div class="seat selected" id="normal"></div>
          <small> Available </small>
        </li>
        <li>
          <div class="seat occupied" id="gold"></div>
          <small> Unavailable</small>
        </li>
      </ul>

      <div class="screen"></div>
      <Container>
        <div style={{ textAlign: "center", color: "pink" }}>
          <div class="row">{renderSeats()}</div>
        </div>
      </Container>
      {/* hien thi thong bao mua ve thanh cong  */}
      {roleID == 3 && !error ? (
        <SweetAlert
          show={showAlert}
          title="Order Successfull!"
          onConfirm={onConfirm}
          type="success"
          style={{ display: "block", width: "37em", marginTop: "150px" }}
        >
          <h3>Your ticket have been ordered successfully</h3>
          <p>Movie: {movie}</p>
          <p>
            Ticket code: <a style={{ color: "red" }}>{ticketcode}</a>
          </p>
          <p>Total: {totalPrice},000 VND</p>
          <p>
            If you have any trouble, please contact us at <br></br>
            <a style={{ color: "gray" }}>hoidap@groovycineplex.vn</a> or hotline{" "}
            <a style={{ color: "gray", whiteSpace: "nowrap" }}>0123456789</a>
          </p>
        </SweetAlert>
      ) : roleID == 2 && !error ? (
        <SweetAlert
          show={showAlert}
          title="Order Successfull!"
          onConfirm={onConfirm}
          type="success"
          style={{ display: "block", width: "37em", marginTop: "150px" }}
        >
          <p>oke </p>
        </SweetAlert>
      ) : (
        <p></p>
      )}
      <>
        <Button className="open-button" onClick={handleShow}>
          Pay Now
        </Button>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Ticket Confimation </h3>
            <p>
              <span style={{ fontWeight: "bold" }}>Cinema: {cinema}</span>
            </p>{" "}
            <p>
              <span style={{ fontWeight: "bold" }}>Movie: {movie}</span>
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Date: {date}</span>
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Time: {time}</span>
            </p>
            <p>
              <span>
                <h7>Seat booked:</h7>
                {selectedSeats.map((seat, id) => (
                  <li key={id}>{`Row: ${seat.row}, Col: ${seat.col}`}</li>
                ))}
              </span>{" "}
            </p>
            <p>
              <span>Number of ticket(s) booked:</span>
              <span id="count"> {count}</span>
            </p>
            <p class="text">
              Total: <span id="total">{totalPrice}</span>
              <span>,000 VND</span>
            </p>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={handleClose}>
              Pay Now
            </Button> */}
            {/* <Button
              className="open-button"
              onClick={() => {
                handleClose;
                handlePayment;
              }}
            >
              Pay Now
            </Button> */}

            <Button
              onClick={() => {
                {
                  handleClose();
                  handleSuccess();
                  handlePayment();
                }
              }}
            >
              Payment
            </Button>

            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer />
      </>
    </div>
  );
}
