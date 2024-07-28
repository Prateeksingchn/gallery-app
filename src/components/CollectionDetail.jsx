import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { collections } from './CollectionPage';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const SEARCH_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 30;

const CollectionDetail = () => {
  const { id } = useParams();
  const collection = collections.find(c => c.id === parseInt(id));
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchImages = async (pageNum = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(SEARCH_URL, {
        params: {
          query: collection.category,
          page: pageNum,
          per_page: IMAGES_PER_PAGE,
          client_id: API_KEY,
        },
      });
      setImages(response.data.results);
      setTotalPages(Math.ceil(response.data.total / IMAGES_PER_PAGE));
    } catch (error) {
      console.error('Error fetching images:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (collection) {
      fetchImages();
    }
  }, [collection]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchImages(newPage);
    window.scrollTo(0, 0);
  };

  if (!collection) {
    return <div>Collection not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-black text-white py-20 px-4 sm:px-6 lg:px-8 rounded-b-[50px]">
      <div className="max-w-7xl mx-auto">
        <Link to="/collections" className="text-white text-lg font-semibold mb-8 inline-block">
          ← Back to Collections
        </Link>

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-serif mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {collection.title}
        </motion.h1>

        <p className="text-xl mb-8">{collection.description}</p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {images.map(image => (
                <motion.div
                  key={image.id}
                  className="relative overflow-hidden rounded-lg shadow-lg lg:w-[400px] xl:w-[400px] md:w-[300px] w-[380px] h-[255px] sm:h-80 lg:h-[380px] xl:h-[380px]"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={image.urls.regular} alt={image.alt_description} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <p className="text-sm font-medium mb-2">{image.user.name}</p>
                    {/* <h3 className="text-sm font-bold">{image.description || image.alt_description}</h3> */}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12 flex justify-center items-center space-x-4"
          >
            <motion.button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-white text-purple-500 rounded-full disabled:opacity-50 flex items-center border border-purple-500 hover:bg-purple-50 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={20} className="mr-2" />
              Previous
            </motion.button>
            <span className="text-gray-300 font-medium">Page {page} of {totalPages}</span>
            <motion.button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-white text-purple-500 rounded-full disabled:opacity-50 flex items-center border border-purple-500 hover:bg-purple-50 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next
              <ChevronRight size={20} className="ml-2" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CollectionDetail;