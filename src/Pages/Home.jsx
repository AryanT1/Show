import React, { useEffect, useState } from "react";
import herobg from "../assets/hero-bg.png";
import Search from "../components/search.jsx";
import { Spinner } from "flowbite-react";
import MovieCard from "../components/MovieCard.jsx";
import { getTrendingMovies, udateSearchCount } from "../appwrite.js";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
 const Home = ()=> {
    const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [trendingMovies, setTrendingMovies] = useState("");

  const fetchMovies = async (query = "") => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("failed to fetch movies");
      }
      const data = await response.json();
      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
      if (query && data.results.length > 0) {
        await udateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.log(`Error fetching movies: ${error} `);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.log(`Error fatching trending movies ${error}`);
    }
  };

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 800);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm !== "") {
      fetchMovies(debouncedSearchTerm);
    } else {
      fetchMovies();
    }
  }, [debouncedSearchTerm]);
  return (
    <main>
      <div className="pattern">
        <img src={herobg} alt="Herro Banner" />
      </div>

      <div className="wrapper">
        <header>
        
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        {trendingMovies.length > 0 && (
          <section  className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img className="cursor-pointer" onClick={()=>navigate(`/movie/${movie.movie_id}`)} src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies  p-4">
          <h2>Popular Movies </h2>
          {isLoading ? (
            <Spinner color="purple" aria-label="Default status example" />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard  key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default Home;
