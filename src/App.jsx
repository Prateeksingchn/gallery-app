import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Gallery from './components/Gallery';
import About from './components/About';

function Navigation() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
        <li><Link to="/gallery" className="text-white hover:text-gray-300">Gallery</Link></li>
        <li><Link to="/about" className="text-white hover:text-gray-300">About</Link></li>
      </ul>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white text-center p-4">
          © 2024 Image Gallery App. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

