import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Floating from "./Floating";
import ImageSlider from "./ImageSlider";
import CollectionPage from "./CollectionSec";
import ImageGrid from "./ImageGrid";

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const IMAGES_TO_SHOW = 36; // Increased for smoother vertical scrolling

export default function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?count=${IMAGES_TO_SHOW}&client_id=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Failed to fetch images. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleExploreClick = () => {
    navigate("/gallery");
  };

  return (
    <div className="relative z-10 bg-[#ECE8E2]">
      <Floating />
      <ImageSlider />
      <CollectionPage />
      
      <div className="min-h-screen">
        <ImageGrid
          images={images}
          loading={loading}
          error={error}
          onExploreClick={handleExploreClick}
        />
      </div>
    </div>
  );
}