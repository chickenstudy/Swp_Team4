import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/SignIn.css";
import DefaultTemplate from "../layouts/UserLayout";

import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [role, setRole] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("http://localhost:9999/role");

        if (!response.ok) {
          throw new Error("Error fetching roles");
        }

        const data = await response.json();
        setRole(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRoles();
  }, []);

  const getUserRole = (roleId) => {
    const userRole = role.find((r) => r.id === roleId);
    return userRole ? userRole.name : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9999/account");

      if (!response.ok) {
        throw new Error("Error fetching user data");
      }

      const account = await response.json();
      const user = account.find(
        (user) => user.email === email && user.password === password
      );

      if (!user) {
        setError("Incorrect email or password");
        return;
      }

      const userRole = getUserRole(user.rid);

      switch (userRole) {
        case "admin":
          navigate("/admin");
          break;
        case "user":
          navigate("/");
          break;
        case "staff":
          navigate("/staff");
          break;
        default:
          //handle other role or errors
          break;
      }
    } catch (error) {
      console.log(error.message);
      setError("Error signing in");
    }
  };

  return (
    <DefaultTemplate>
      <h1 style={{ textAlign: "center" }}>Sign In</h1>
      <div className="d-flex justify-content-center align-items-center vh-50">
        <div className="signin-block">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {error && <div className="alert alert-danger">{error}</div>}

            <Button variant="primary" type="submit">
              Sign In
            </Button>
          </Form>
        </div>
      </div>
    </DefaultTemplate>
  );
}
