import React, { useState, useEffect } from "react";
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
import Cursor from "./components/Cursor";
import ErrorBoundary from "./components/ErrorBoundary";
import { useMediaQuery } from 'react-responsive';
import Loader from './components/Loader'; // Import the Loader component

export default function App() {
  const isLargeDevice = useMediaQuery({ minWidth: 1024 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // 3.5 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader setIsLoading={setIsLoading} />;
  }

  return (
    <Router>
      <ErrorBoundary>
        <div className="flex flex-col min-h-screen bg-transparent relative">
          {isLargeDevice && (
            <style jsx global>{`
              body, a, button {
                cursor: none;
              }
            `}</style>
          )}
          {isLargeDevice && <Cursor />}
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
      </ErrorBoundary>
    </Router>
  );
}
