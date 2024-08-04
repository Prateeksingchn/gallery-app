import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Details from "./components/Details";
import CollectionPage from "./components/CollectionPage";
import CollectionDetail from "./components/CollectionDetail";
import AIGallery from "./components/AIGallery";


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
            <Route path="/ai-gallery" element={<AIGallery />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
