import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Floating from './Floating';
import ImageSlider from './ImageSlider';
import CollectionPage from './CollectionSec';

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const IMAGES_PER_PAGE = 16;

export default function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.unsplash.com/photos/random?count=${IMAGES_PER_PAGE}&client_id=${API_KEY}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setImages(prevImages => [...prevImages, ...data]);
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Failed to fetch images. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = (imageId) => {
    navigate(`/details/${imageId}`);
  };

  return (
    <div className="relative">
      <Floating />
      <ImageSlider />
      <CollectionPage />

      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Inspiration Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                onClick={() => handleImageClick(image.id)}
              >
                <img
                  src={image.urls.regular}
                  alt={image.alt_description}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                  <p className="text-white text-xs">Photo by {image.user.name}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            {loading ? (
              <p className="text-center text-gray-600">Loading more images...</p>
            ) : (
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 mb-4 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors duration-300"
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}