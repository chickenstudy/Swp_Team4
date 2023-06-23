import React, { Link } from "react-router-dom";

import "./Booking.css";

export default function Booking() {
  return (
     <>
        <Link
          to="/booking/subbooking"
          style={{ textDecoration: "none", color: "#000000" }}
        >
          Booking
        </Link>
        <Link
          to="/booking/showtimes"
          style={{ textDecoration: "none", color: "#000000" }}
        >
          SHOWTIMES
        </Link>
     </>
  );
}
