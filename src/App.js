import React from "react";
import './index.css';

import { useState, useEffect } from "react";
import Chat from "./chat/Chat";

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
    setSelectedMovie("open");
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

      {/* <Chat/> */}

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow p-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Search for a Movie</h2>
          <input
            type="text"
            placeholder="Enter movie name..."
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value?.trim())}
          />
          <button
            onClick={() => fetchMovies()}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 w-full max-w-5xl">
          {movies.length > 0 ? movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-white shadow-md rounded-lg p-3 cursor-pointer transform hover:scale-105 transition"
              onClick={() => fetchMovieDetails(movie.imdbID)}
            >
              <img loading="lazy" src={movie.Poster} alt={movie.Title} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-sm font-semibold mt-2 text-center">{movie.Title} ({movie.Year})</h3>
            </div>
          )) : [1, 3, 4, 5, 4, 5, 6, 4, 3, 4, 3].map(() => <><div className="bg-gray-50 shadow-md rounded-lg p-3 cursor-pointer transform hover:scale-105 transition animate-pulse">
            <div className="w-full h-40 bg-gray-300 rounded-md"></div>
            <h3 className="text-sm font-semibold mt-2 text-center bg-gray-300 h-4 w-3/4 mx-auto rounded"></h3>
          </div></>)}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-6 text-sm">
        &copy; {new Date().getFullYear()} Movie Search App | Developed by Jitendra Kumar | Contact +91 8340747194
      </footer>

      {/* Movie Details Modal */}
      {selectedMovie && (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 animate-fadeIn">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-lg relative">
            {/* Close Button on Top Right */}
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
            >
              ✕
            </button>

            {/* Movie Details Container */}
            {
              selectedMovie === "open" ? <div className="flex flex-col md:flex-row items-center md:items-start animate-pulse">
                {/* Movie Poster Skeleton */}
                <div className="w-40 h-56 bg-gray-300 rounded-lg shadow-md"></div>

                {/* Movie Details Skeleton */}
                <div className="md:ml-6 text-center md:text-left mt-4 md:mt-0 w-full">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto md:mx-0"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto md:mx-0 mt-2"></div>
                  <div className="mt-3 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto md:mx-0"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto md:mx-0"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto md:mx-0"></div>
                    <div className="h-20 bg-gray-300 rounded w-full mt-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto md:mx-0"></div>
                  </div>
                </div>
              </div>
                : <div className="flex flex-col md:flex-row items-center md:items-start">
                  {/* Movie Poster */}
                  <img
                    src={selectedMovie.Poster !== "N/A" ? selectedMovie.Poster : "https://via.placeholder.com/200"}
                    alt={selectedMovie.Title}
                    className="w-40 h-56 object-cover rounded-lg shadow-md"
                  />

                  {/* Movie Details */}
                  <div className="md:ml-6 text-center md:text-left mt-4 md:mt-0">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedMovie.Title}</h2>
                    <p className="text-gray-600 text-sm italic">{selectedMovie.Genre}</p>
                    <div className="mt-3">
                      <p className="text-gray-700">
                        <span className="font-semibold">Year:</span> {selectedMovie.Year}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Director:</span> {selectedMovie.Director}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Actors:</span> {selectedMovie.Actors}
                      </p>
                      <p className="text-gray-700 mt-2 text-justify leading-relaxed">
                        <span className="font-semibold">Plot:</span> {selectedMovie.Plot}
                      </p>
                      <p className="text-gray-700 mt-2">
                        <span className="font-semibold">IMDb Rating:</span> ⭐ {selectedMovie.imdbRating}/10
                      </p>
                    </div>
                  </div>
                </div>
            }


            {/* Close Button */}
            <button
              onClick={() => setSelectedMovie(null)}
              className="mt-6 w-full bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
