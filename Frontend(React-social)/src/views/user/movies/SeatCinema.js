import React, { useEffect, useState } from "react";
import "./Seat.css";
import { Button, Container, Modal } from "react-bootstrap";
import axios from "axios";

export default function SeatCinema() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loadingSeats, setLoadingSeats] = useState(true);
  const [seats, setSeats] = useState([]);

  const cinema = sessionStorage.getItem("cinema");
  const date = sessionStorage.getItem("date");
  const time = sessionStorage.getItem("time");
  const movie = sessionStorage.getItem("movie");
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
        (seat) => !(seat.row === row && seat.col === col)
      );
      setSelectedSeats(updatedSeats);
      setCount(count - 1);
    } else {
      const newSeat = { row, col };
      const updatedSeats = [...selectedSeats, newSeat];
      setSelectedSeats(updatedSeats);
      setCount(count + 1);
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
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                {selectedSeats.map((seat, index) => (
                  <li key={index}>{`Row: ${seat.row}, Col: ${seat.col}`}</li>
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
            <Button variant="secondary" onClick={handleClose}>
              Pay Now
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}
