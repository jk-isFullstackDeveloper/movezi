import React from "react";
import './index.css';
 



import { useState, useEffect } from "react";


export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies("Avengers"); // Default movies on load
  }, []);

  const fetchMovies = async (query) => {
    const searchQuery = query || searchTerm;
    if (!searchQuery) return;
    const response = await fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=7a80609d`);
    const data = await response.json();
    setMovies(data.Search || []);
  };

  const fetchMovieDetails = async (imdbID) => {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=7a80609d`);
    const data = await response.json();
    setSelectedMovie(data);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <nav className="bg-gray-800 text-white text-center py-4  text-sm flex items-center justify-between px-4">
        <p>Home</p>
        <div className="flex items-center justify-between gap-4">
          <p>Movie</p>
          <p>About</p>
          <p>Contact</p>
        </div>

      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow p-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Search for a Movie</h2>
          <input
            type="text"
            placeholder="Enter movie name..."
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => fetchMovies()}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 w-full max-w-5xl">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-white shadow-md rounded-lg p-3 cursor-pointer transform hover:scale-105 transition"
              onClick={() => fetchMovieDetails(movie.imdbID)}
            >
              <img src={movie.Poster} alt={movie.Title} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-sm font-semibold mt-2 text-center">{movie.Title} ({movie.Year})</h3>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-2 mt-6 text-sm">
        &copy; {new Date().getFullYear()} Movie Search App | Developed by Jitendra Kumar
      </footer>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-2">{selectedMovie.Title}</h2>
            <p><strong>Year:</strong> {selectedMovie.Year}</p>
            <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
            <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
            <button
              onClick={() => setSelectedMovie(null)}
              className="mt-4 bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
