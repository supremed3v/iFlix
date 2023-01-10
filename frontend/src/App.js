import logo from './logo.svg';
import './App.css';
import { MoviesProvider, useMovies } from './context/MoviesContext';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Player from './pages/Player';

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player/:id" element={<Player/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
