import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Floating from './Floating';
import ImageSlider from './ImageSlider';
import CollectionPage from './CollectionSec';
import { ChevronDown } from 'lucide-react';

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const IMAGES_TO_SHOW = 12; // Number of images to show in the bento grid

export default function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.unsplash.com/photos/random?count=${IMAGES_TO_SHOW}&client_id=${API_KEY}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Failed to fetch images. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleImageClick = (imageId) => {
    navigate(`/details/${imageId}`);
  };

  const handleGoToGallery = () => {
    navigate('/gallery');
  };

  return (
    <div className="relative z-10">
      <Floating />
      <ImageSlider />
      <CollectionPage />

      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Inspiration Gallery</h2>
          {loading ? (
            <p className="text-center text-gray-600">Loading images...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : (
            <div className="grid grid-cols-3 gap-4 mb-8">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={`relative overflow-hidden rounded-lg shadow-lg cursor-pointer ${
                    index === 0 ? 'col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1' : ''
                  }`}
                  onClick={() => handleImageClick(image.id)}
                >
                  <img
                    src={image.urls.regular}
                    alt={image.alt_description}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                    <p className="text-white text-xs">Photo by {image.user.name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="my-8  flex justify-center">
            <button
              onClick={handleGoToGallery}
              className="flex items-center text-gray-800 hover:text-gray-600 transition-colors"
            >
              Go to Gallery
              <ChevronDown className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}