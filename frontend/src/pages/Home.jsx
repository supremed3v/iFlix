import React from 'react'
import { useMovies } from '../context/MoviesContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const { movies } = useMovies();

  return (
    <header className="App-header">
      {movies && movies.map((movie)=>(
        <div key={movie._id}>
          <h1>{movie.title}</h1>
          <p>{movie.genre}</p>
          <p>{movie.year}</p>
            <Link to={`/player/${movie._id}`}>Watch</Link>
        </div>
      ))}
      </header>
  )
}

export default Home