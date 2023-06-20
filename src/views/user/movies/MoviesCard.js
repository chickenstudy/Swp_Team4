import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function MovieCard({ title, image, description }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div className="d-flex justify-content-between">
          <Button variant="primary">Trailer</Button>
          <Button variant="primary">Buy Ticket</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
