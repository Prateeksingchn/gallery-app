// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import Gallery from "./pages/Gallery/Gallery";
import About from "./pages/About/About";
import Details from "./pages/Details/Details"; // Corrected path
import CollectionPage from "./pages/CollectionPage/CollectionPage";
import CollectionDetail from "./pages/CollectionDetail/CollectionDetail"; // Corrected path
import AIPage from "./pages/AIPage/AIPage";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#ECE8E2]">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/collections" element={<CollectionPage />} />
            <Route path="/collection/:id" element={<CollectionDetail />} />
            <Route path="/ai-image-generation" element={<AIPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
