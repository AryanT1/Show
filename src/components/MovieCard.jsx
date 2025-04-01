import React from "react";
import star from "../assets/star.svg";
import noPoster from "../assets/No-Poster.png"
import { useNavigate } from "react-router-dom";
const MovieCard = ({
  movie: { vote_average, release_date, original_language, poster_path, title , id },
}) => {
     const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`/movie/${id}`)} className="movie-card cursor-pointer">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : {noPoster}
        }
        alt={title}
      />
      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src={star} alt="star icon" />
             <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
             <span>•</span>
             <p className="lang">{original_language}</p>
             <span>•</span>
             <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
