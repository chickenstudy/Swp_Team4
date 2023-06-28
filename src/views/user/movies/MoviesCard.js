import React from "react";
import "./movies.css";

export default function MovieCard({ title, image, times, date }) {
  return (
    <div className="movie_box">
      <span class=" img">
        <img style={{ width: "100%" }} src={image} alt="Movie Poster" />
      </span>
      <div class="list_text">
        <dt style={{ borderBottom: "1px solid #ddd", wordWrap: "break-word" }}>
          {title}
        </dt>
      </div>
    </div>
  );
}
