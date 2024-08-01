// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './nav';
import HeroPage from './hero';
import Login from './login';
import Register from './register';
import SearchMovies from './search';

export default function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchMovies />} /> 
        </Routes>
      </div>
    </Router>
  );
}
