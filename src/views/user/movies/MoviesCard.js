import React from "react";
import "./movies.css";

export default function MovieCard({ title, image, times, date }) {
  return (
    <div className="movie_box">
      <div class="mydivouter">
        <img
          style={{ width: "100%", height: "350px" }}
          src={image}
          alt="Movie Poster"
        />
        <div class="mybuttonoverlap">
          <button type="button" class="btn btn-info">
            <a style={{ textDecoration: "none" }}>Detail</a>
          </button>
        </div>
      </div>

      <dt style={{ borderBottom: "1px solid #ddd", wordWrap: "break-word" }}>
        {title}
      </dt>
      <dd>
        {times}
        {date}
      </dd>
    </div>
  );
}
