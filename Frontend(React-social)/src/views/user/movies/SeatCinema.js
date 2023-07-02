import React, { useState } from "react";
import "./seat.css";
import { Button, Container, Modal } from "react-bootstrap";

export default function SeatCinema() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (row, col) => {
    // Check if the seat is already selected
    const isSelected = selectedSeats.some(
      (seat) => seat.row === row && seat.col === col
    );

    if (isSelected) {
      // Deselect the seat
      const updatedSeats = selectedSeats.filter(
        (seat) => seat.row !== row || seat.col !== col
      );
      setSelectedSeats(updatedSeats);
      setCount(count - 1);
    } else {
      // Select the seat
      const newSeat = { row, col };
      const updatedSeats = [...selectedSeats, newSeat];
      setSelectedSeats(updatedSeats);
      setCount(count + 1);
    }
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
        <label>Pick a movie:</label>
        <select id="movie">
          <option value="10">Avengers: Endgame ($10)</option>
          <option value="12">Joker ($12)</option>
          <option value="8">Toy Story 4 ($8)</option>
          <option value="9">The Lion King ($9)</option>
        </select>
      </div>

      <ul class="showcase">
        <li>
          <div class="seat-blank" id="disable"></div>
          <small>Delete seat</small>
        </li>
        <li>
          <div class="seat selected" id="normal"></div>
          <small>Normal Seat</small>
        </li>
        <li>
          <div class="seat occupied" id="gold"></div>
          <small>Gold Seat</small>
        </li>
      </ul>

      <div class="screen"></div>
      <Container>
        <div style={{ textAlign: "center", color: "pink" }}>
          <div class="container">
            <div class="row">
              <div class="row-mark">A</div>
              <div class="seat-blank default row-A col-1"></div>
              <div class="seat-blank default row-A col-2"></div>
              <div
                class="seat default row-A col-3"
                onClick={() => handleSeatClick("A", 3)}
              ></div>
              <div
                class="seat default row-A col-4"
                onClick={() => handleSeatClick("A", 4)}
              ></div>
              <div
                class="seat default row-A col-5"
                onClick={() => handleSeatClick("A", 5)}
              ></div>
              <div
                class="seat default row-A col-6"
                onClick={() => handleSeatClick("A", 6)}
              ></div>
              <div
                class="seat default row-A col-7"
                onClick={() => handleSeatClick("A", 7)}
              ></div>
              <div
                class="seat default row-A col-8"
                onClick={() => handleSeatClick("A", 8)}
              ></div>
              <div
                class="seat default row-A col-9"
                onClick={() => handleSeatClick("A", 9)}
              ></div>
              <div
                class="seat default row-A col-10"
                onClick={() => handleSeatClick("A", 10)}
              ></div>
              <div
                class="seat default row-A col-11"
                onClick={() => handleSeatClick("A", 11)}
              ></div>
              <div
                class="seat default row-A col-12"
                onClick={() => handleSeatClick("A", 12)}
              ></div>
              <div
                class="seat default row-A col-13"
                onClick={() => handleSeatClick("A", 13)}
              ></div>
              <div
                class="seat default row-A col-14"
                onClick={() => handleSeatClick("A", 14)}
              ></div>
              <div
                class="seat default row-A col-15"
                onClick={() => handleSeatClick("A", 15)}
              ></div>
              <div
                class="seat default row-A col-16"
                onClick={() => handleSeatClick("A", 16)}
              ></div>
              <div class="seat-blank default row-A col-17"></div>
              <div class="seat-blank default row-A col-18"></div>
            </div>
            <div class="row">
              <div class="row-mark">B</div>
              <div class="seat-blank"></div>
              <div class="seat" onClick={() => handleSeatClick("B", 1)}></div>
              <div class="seat" onClick={() => handleSeatClick("B", 2)}></div>
              <div
                class="seat occupied"
                onClick={() => handleSeatClick("B", 3)}
              ></div>
              <div
                class="seat occupied"
                onClick={() => handleSeatClick("B", 4)}
              ></div>
              <div class="seat" onClick={() => handleSeatClick("B", 5)}></div>
              <div class="seat" onClick={() => handleSeatClick("B", 6)}></div>
              <div class="seat" onClick={() => handleSeatClick("B", 7)}></div>
              <div class="seat" onClick={() => handleSeatClick("B", 8)}></div>
              <div class="seat" onClick={() => handleSeatClick("B", 9)}></div>
              <div class="seat" onClick={() => handleSeatClick("B", 10)}></div>
              <div class="seat" onClick={() => handleSeatClick("B", 11)}></div>
              <div class="seat" onClick={() => handleSeatClick("B", 12)}></div>
              <div class="seat" onClick={() => handleSeatClick("B", 13)}></div>
              <div class="seat" onClick={() => handleSeatClick("B", 14)}></div>
              <div class="seat" onClick={() => handleSeatClick("B", 15)}></div>
              <div class="seat" onClick={() => handleSeatClick("B", 16)}></div>
              <div class="seat-blank"></div>
            </div>
            <div class="row">
              <div class="row-mark">C</div>
              <div class="seat" onClick={() => handleSeatClick("C", 1)}></div>
              <div class="seat" onClick={() => handleSeatClick("C", 2)}></div>
              <div class="seat" onClick={() => handleSeatClick("C", 3)}></div>
              <div
                class="seat occupied"
                onClick={() => handleSeatClick("C", 4)}
              ></div>
              <div
                class="seat occupied"
                onClick={() => handleSeatClick("C", 5)}
              ></div>
              <div class="seat" onClick={() => handleSeatClick("C", 6)}></div>
              <div class="seat" onClick={() => handleSeatClick("C", 7)}></div>
              <div class="seat" onClick={() => handleSeatClick("C", 8)}></div>
              <div class="seat" onClick={() => handleSeatClick("C", 9)}></div>
              <div class="seat" onClick={() => handleSeatClick("C", 10)}></div>
              <div class="seat" onClick={() => handleSeatClick("C", 11)}></div>
              <div class="seat" onClick={() => handleSeatClick("C", 12)}></div>
              <div class="seat" onClick={() => handleSeatClick("C", 13)}></div>
              <div class="seat" onClick={() => handleSeatClick("C", 14)}></div>
              <div class="seat" onClick={() => handleSeatClick("C", 15)}></div>
              <div class="seat" onClick={() => handleSeatClick("C", 16)}></div>
              <div class="seat" onClick={() => handleSeatClick("C", 17)}></div>
              <div class="seat" onClick={() => handleSeatClick("C", 18)}></div>
            </div>
            <div class="row">
              <div class="row-mark">D</div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat occupied"></div>
              <div class="seat occupied"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
            </div>
            <div class="row">
              <div class="row-mark">E</div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat occupied"></div>
              <div class="seat occupied"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
            </div>
            <div class="row">
              <div class="row-mark">F</div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat occupied"></div>
              <div class="seat occupied"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
            </div>
            <div class="row">
              <div class="row-mark">G</div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat occupied"></div>
              <div class="seat occupied"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
            </div>
            <div class="row">
              <div class="row-mark">H</div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat occupied"></div>
              <div class="seat occupied"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
            </div>
            <div class="row">
              <div class="row-mark">I</div>
              <div class="seat-blank"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat occupied"></div>
              <div class="seat occupied"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat-blank"></div>
            </div>
            <div class="row">
              <div class="row-mark">J</div>
              <div class="seat-blank"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat occupied"></div>
              <div class="seat occupied"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat vip"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat-blank"></div>
            </div>
            <div class="row-container">
              <div class="row">
                <div class="seat-col">1</div>
                <div class="seat-col">2</div>
                <div class="seat-col">3</div>
                <div class="seat-col">4</div>
                <div class="seat-col">5</div>
                <div class="seat-col">6</div>
                <div class="seat-col">7</div>
                <div class="seat-col">8</div>
                <div class="seat-col">9</div>
                <div class="seat-col">10</div>
                <div class="seat-col">11</div>
                <div class="seat-col">12</div>
                <div class="seat-col">13</div>
                <div class="seat-col">14</div>
                <div class="seat-col">15</div>
                <div class="seat-col">16</div>
                <div class="seat-col">17</div>
                <div class="seat-col">18</div>
              </div>
            </div>
          </div>
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
              </span>
            </p>
            <p>
              <span>Number of ticket(s) booked:</span>
              <span id="count"> {count}</span>
            </p>
            <p class="text">
              Total: <span id="total">0</span>
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
