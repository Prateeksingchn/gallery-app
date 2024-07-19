import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const API_URL = 'https://api.unsplash.com/photos';
const SEARCH_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 24;

const categories = [
  'Nature', 'Travel', 'Architecture', 'Food', 'Animals', 'Technology', 'Art', 'Fashion'
];

export default function Gallery() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const fetchImages = async (searchQuery = '', pageNum = 1) => {
    setLoading(true);
    try {
      let response;
      if (searchQuery) {
        response = await axios.get(SEARCH_URL, {
          params: {
            query: searchQuery,
            page: pageNum,
            per_page: IMAGES_PER_PAGE,
            client_id: API_KEY,
          },
        });
        setImages(response.data.results);
        setTotalPages(Math.ceil(response.data.total / IMAGES_PER_PAGE));
      } else {
        response = await axios.get(API_URL, {
          params: {
            page: pageNum,
            per_page: IMAGES_PER_PAGE,
            client_id: API_KEY,
          },
        });
        setImages(response.data);
        setTotalPages(10);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (activeCategory) {
      fetchImages(activeCategory, 1);
    }
  }, [activeCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setActiveCategory(null);
      setPage(1);
      fetchImages(query, 1);
    }
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setQuery('');
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchImages(activeCategory || query, newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          Inspirational Image Gallery
        </h1>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Explore Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                } transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex max-w-lg mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for images..."
              className="flex-grow px-5 py-3 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-r-full hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300 flex items-center"
            >
              <Search size={20} className="mr-2" />
              Search
            </button>
          </div>
        </form>

        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {images.map((image) => (
              <motion.div
                key={image.id}
                className="relative group overflow-hidden rounded-xl shadow-md bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              >
                <img
                  src={image.urls.small}
                  alt={image.alt_description}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                  <p className="text-white text-sm font-medium line-clamp-2">
                    {image.description || image.alt_description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center space-x-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-white text-purple-500 rounded-full disabled:opacity-50 flex items-center border border-purple-500 hover:bg-purple-50 transition-colors duration-300"
            >
              <ChevronLeft size={20} className="mr-2" />
              Previous
            </button>
            <span className="text-gray-700 font-medium">Page {page} of {totalPages}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-white text-purple-500 rounded-full disabled:opacity-50 flex items-center border border-purple-500 hover:bg-purple-50 transition-colors duration-300"
            >
              Next
              <ChevronRight size={20} className="ml-2" />
            </button>
          </div>
        )}

        {loading && (
          <div className="mt-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            <p className="mt-2 text-gray-600">Loading amazing images...</p>
          </div>
        )}
      </div>
    </div>
  );
}