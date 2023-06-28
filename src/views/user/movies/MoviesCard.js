import React from "react";
import "./movies.css";

export default function MovieCard({ title, image, times, date }) {
  return (
    <div className="movie_box">
      <div class="mydivouter">
        <img style={{ width: "100%" }} src={image} alt="Movie Poster" />
        <div class="mybuttonoverlap">
          <button type="button" class="btn btn-info">
            <a style={{ textDecoration: "none" }}>
              Detail
            </a>
          </button>
        </div>
      </div>
      <div class="list_text">
        <dt style={{ borderBottom: "1px solid #ddd" }}>{title}</dt>
        <dd>
          {times}
          {date}
        </dd>
      </div>
    </div>
  );
}
