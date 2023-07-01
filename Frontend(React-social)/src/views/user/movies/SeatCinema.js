import React from "react";
import "./seat.css";
import Seat from "./Seat";
import { Container } from "react-bootstrap";

export default function SeatCinema() {
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
        marginTop: "500px",
        margin: "0",
        boxSizing: "border-box",
      }}
    >
      <div class="space"></div>
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
      <Seat />
      <button class="open-button" onclick="openForm()">
        Pay Now
      </button>
    </div>
  );
}
