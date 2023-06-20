import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Default.css";

export default function Menu() {
  return (
    <div className="row justify-content-md-center" id="container">
      <div className="col-md-2"></div>
      <div className="menu col-md-auto">
        <span>
          <Link to="/giftshop">GIFT SHOP</Link>
        </span>
        <span>
          <Link to="/booking">BOOKING</Link>
        </span>
        <span>
          <Link to="/">MOVIES</Link>
        </span>
        <span>
          <Link to="/cinemas">CINEMAS</Link>
        </span>
        <span>
          <Link to="/promotion">PROMOTION</Link>
        </span>
      </div>

      <div className="col-md-2 justify-content-end">
        <span>
          <Link to="/signin">SignIn</Link>
        </span>
        <span>
          <Link to="/signup">SignUp</Link>
        </span>
      </div>
    </div>
  );
}
