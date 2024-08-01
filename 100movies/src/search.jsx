import React, { useState } from 'react';
import MovieService from '../backend/controllers/movieServices';

const SearchMovies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const data = await MovieService.searchMovies(query);
      const sortedMovies = data.results.sort((a, b) => b.popularity - a.popularity);
      setMovies(sortedMovies);
      setError('');
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Error fetching movies');
    }
  };

  const handleAddMovie = async (movieId, title) => {
    try {
      const response = await fetch('http://localhost:5050/api/addMovies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movieId, title }),
        credentials: 'include'
      });
  
      // Check if the response is not  OK
      if (!response.ok) {
        throw new Error('Network response was not ok, could not add movie');
      }
  
      // Check if response has a body
      const text = await response.text();
      if (text) {
        const data = JSON.parse(text); // Parse JSON
        if (data.success) {
          alert('Movie added successfully');
        } else {
          alert('Failed to add movie');
        }
      } else {
        alert('No response from server');
      }
    } catch (error) {
      console.error('Error adding movie to list:', error);
    }
  };
  

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      <div className='list-container'>
        <ul className='list'>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h2>{movie.title}</h2>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.overview}</p>
              <span className='p'>Popularity: {movie.popularity}</span>
              <button onClick={() => handleAddMovie(movie.id, movie.title)} className='rank'>
                Add to list
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchMovies;
