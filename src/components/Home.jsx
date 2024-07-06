import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const API_KEY = 'vD54gyJ0BpARfHy4OIfqTg1p7LUJBPChX10EZr3X48M';
const IMAGES_PER_PAGE = 21;

export default function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.unsplash.com/photos/random?count=${IMAGES_PER_PAGE}&client_id=${API_KEY}`);
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
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-6 text-gray-800">Welcome to ImageGallery</h1>
        <p className="text-xl mb-8 text-gray-600">Explore beautiful images from around the world.</p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/gallery"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            Explore Gallery
          </Link>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {[
          { title: 'Diverse Collection', description: 'Access millions of high-quality images.' },
          { title: 'Easy Search', description: 'Find the perfect image with our powerful search.' },
          { title: 'Regular Updates', description: 'New images added daily for fresh content.' }
        ].map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h2>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Featured Images</h2>
        {loading && <p className="text-center text-gray-600">Loading images...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-12">
              {images.map((image) => (
                <motion.div
                  key={image.id}
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-lg shadow-lg"
                >
                  <img
                    src={image.urls.regular}
                    alt={image.alt_description}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                    <p className="text-white text-xs">Photo by {image.user.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 flex justify-center items-center space-x-4">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className="px-4 py-2 bg-purple-500 text-white rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-700">Page {page}</span>
              <button
                onClick={handleNextPage}
                className="px-4 py-2 bg-purple-500 text-white rounded-md"
              >
                Next
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}