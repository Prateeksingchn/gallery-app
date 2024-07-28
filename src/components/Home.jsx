import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Floating from "./Home/Floating";
import ImageSlider from "./Home/ImageSlider";
import CollectionPage from "./Home/CollectionSec";
import ImageGrid from "./Home/ImageGrid";
import FeaturedArtists from "./Home/FeaturedArtists";
import AIImageGenerationSection from "./AIImageGenerationSection";

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const IMAGES_TO_SHOW = 36;

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

  return (
    <div>
      <Floating />
      <ImageSlider images={images.slice(0, 5)} />
      <CollectionPage />
      <ImageGrid images={images} loading={loading} error={error} />
      <AIImageGenerationSection />
      <FeaturedArtists artists={[
        // Add some sample artist data here
        { name: "Artist 1", specialty: "Digital Art", bio: "A talented digital artist..." },
        { name: "Artist 2", specialty: "Photography", bio: "An award-winning photographer..." },
        // ... more artists
      ]} />
    </div>
  );
}