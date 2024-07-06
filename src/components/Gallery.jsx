import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const API_KEY = 'YOUR_UNSPLASH_API_KEY'; // Replace with your actual Unsplash API key
const API_URL = 'https://api.unsplash.com/photos/random';
const SEARCH_URL = 'https://api.unsplash.com/search/photos';

const categories = [
  'Nature', 'Travel', 'Architecture', 'Food', 'Animals', 'Technology', 'Art', 'Fashion'
];

export default function Gallery() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const fetchInitialImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          count: 20,
          client_id: API_KEY,
        },
      });
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching initial images:', error);
    }
    setLoading(false);
  };

  const searchImages = async (searchQuery, newSearch = false) => {
    setLoading(true);
    try {
      const response = await axios.get(SEARCH_URL, {
        params: {
          query: searchQuery,
          page: newSearch ? 1 : page,
          per_page: 20,
          client_id: API_KEY,
        },
      });
      if (newSearch) {
        setImages(response.data.results);
        setPage(2);
      } else {
        setImages(prevImages => [...prevImages, ...response.data.results]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInitialImages();
  }, []);

  useEffect(() => {
    if (activeCategory) {
      searchImages(activeCategory, true);
    }
  }, [activeCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setActiveCategory(null);
      searchImages(query, true);
    }
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setQuery('');
  };

  const handleLoadMore = () => {
    if (activeCategory || query) {
      searchImages(activeCategory || query, false);
    } else {
      fetchInitialImages();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Image Gallery</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-full ${
                activeCategory === category
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              } transition-colors duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex max-w-md mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for images..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-r-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300"
          >
            Search
          </button>
        </div>
      </form>

      <AnimatePresence>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {images.map((image) => (
            <motion.div
              key={image.id}
              className="relative group overflow-hidden rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={image.urls.small}
                alt={image.alt_description}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <p className="text-white text-center p-4">{image.description || image.alt_description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {images.length > 0 && (
        <div className="mt-8 text-center">
          <motion.button
            onClick={handleLoadMore}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? 'Loading...' : 'Load More'}
          </motion.button>
        </div>
      )}
    </div>
  );
}