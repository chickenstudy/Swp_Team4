import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Default.css";
import { ApplicationContext } from "../../App";
import SignIn from "../../views/auth/SignIn";
import SignUp from "../../views/auth/SignUp";
import Account from "../../views/auth/Account";

export default function Menu() {
  const { user } = React.useContext(ApplicationContext);
  return (
    <div id="container" style={{ backgroundColor: "rgb(242, 196, 141)" }}>
      <div className="row">
        <div className="col" style={{ textAlign: "center" }}>
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
        <div class="col-4"></div>
        <div className="col-4" style={{ textAlign: "right" }}>
          {Array.isArray(user) && user.length == 0 ? (
            <div>
              <SignIn></SignIn>|<SignUp></SignUp>
            </div>
          ) : (
            <span>
              <Account></Account>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
