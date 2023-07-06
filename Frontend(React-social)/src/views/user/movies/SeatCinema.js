import React, { useEffect, useState } from "react";
import "./Seat.css";
import { Button, Container, Modal } from "react-bootstrap";

export default function SeatCinema() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    calculateTotalPrice();
  }, [count]);

  useEffect(() => {
    setSelectedSeats([
      {
        row: "A",
        col: 3,
        available: false,
        isSelected: false,
      },
      {
        row: "A",
        col: 5,
        available: true,
        isSelected: true,
      },
    ]);
  }, []);
  const getAvailable = (row, col) => {
    const seat = selectedSeats.find(
      (seat) => seat.row === row && seat.col === col
    );
    if (!seat) return true;
    return seat.available;
  };
  const handleSeatClick = (row, col) => {
    // Kiểm tra xem ghế đã được chọn hay chưa
    const isSelected = selectedSeats.some(
      (seat) => seat.row === row && seat.col === col
    );

    if (isSelected) {
      // Bỏ chọn ghế
      const updatedSeats = selectedSeats.filter(
        (seat) => !(seat.row === row && seat.col === col)
      );
      setSelectedSeats(updatedSeats);
      setCount(count - 1);
    } else {
      // Chọn ghế
      const newSeat = { row, col };
      const updatedSeats = [...selectedSeats, newSeat];
      setSelectedSeats(updatedSeats);
      setCount(count + 1);
    }
  };
  const calculateTotalPrice = () => {
    const pricePerSeat = 50; // Giá tiền mỗi ghế
    const totalPrice = count * pricePerSeat;
    setTotalPrice(totalPrice);
  };
  const renderSeats = () => {
    const seats = [];

    const rows = ["A", "B", "C", "D", "E"]; // Mảng chứa tên các hàng

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      const rowSeats = [];

      for (let col = 1; col <= 15; col++) {
        let seatClass = "seat-blank default";

        // Kiểm tra nếu là hàng A và ghế là ghế đầu hoặc ghế cuối
        if (
          row === "A" &&
          (col === 1 || col === 2 || col === 14 || col === 15)
        ) {
          seatClass = "seat-blank default";
        }
        // Kiểm tra nếu là hàng E và ghế là ghế đầu hoặc ghế cuối
        else if (
          row === "E" &&
          (col === 1 || col === 2 || col === 14 || col === 15)
        ) {
          seatClass = "seat-blank default";
        } else if (getAvailable(row, col) === false) {
          seatClass = "seat occupied";
        } else {
          const isSelected = selectedSeats.some(
            (seat) => seat.row === row && seat.col === col
          );
          seatClass = isSelected ? "seat selected" : "seat";
        }

        rowSeats.push(
          <button
            key={`${row}-${col}`}
            className={seatClass}
            onClick={() => handleSeatClick(row, col)}
            disabled={getAvailable(row, col) === false}
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
      <div class="movie-container-aaa">
        <label>Movie Selected:</label>
        <input
          type="text"
          placeholder="Movie"
          disabled
          style={{ border: "10px", textAlign: "center" }}
        />
      </div>

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
            <h5>You’re booking tickets for:</h5>
            <p>
              <span style={{ fontWeight: "bold" }}>Cinema:</span> aaaa
            </p>{" "}
            <p>
              <span style={{ fontWeight: "bold" }}>Movie:</span> aaaa
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Date:</span> aaaa
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Time:</span> aaaa
            </p>
            <p>
              <span>
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
