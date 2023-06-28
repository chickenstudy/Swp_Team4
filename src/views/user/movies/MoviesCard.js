import React from "react";
import "./movies.css";

export default function MovieCard({ title, image, times,date }) {
  return (
    <div className="movie_box">
      <div className="text">
        <h3>Đặt vé</h3>
      </div>
      <span class="poster">
        <a href="/listmovie">
          <img style={{ width: "100%" }} src={image} alt="Movie Poster" />
        </a>
      </span>
      <div class="list_text">
        <dt style={{ borderBottom: "1px solid #ddd" }}>{title}</dt>
        <dd>{times}{date}</dd>
      </div>
    </div>
  );
}
