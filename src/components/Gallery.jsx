import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const API_URL = 'https://api.unsplash.com/photos';
const SEARCH_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 22;

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

  const getBentoGridSpan = (index) => {
    const spans = [
      'col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1',
      'col-span-1 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-1 lg:row-span-1',
      'col-span-2 row-span-1 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-1',
      'col-span-1 row-span-1 md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2',
      'col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1',
      'col-span-2 row-span-1 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2',
      'col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1',
      'col-span-1 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1',
      'col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1',
      'col-span-1 row-span-1 md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2',
      'col-span-2 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1',
      'col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1',
      'col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1',
      'col-span-2 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1',
      'col-span-1 row-span-2 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1',
    ];
    return spans[index % spans.length];
  };

  const ImageCard = ({ image, span }) => {
    const cardControls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
  
    useEffect(() => {
      if (inView) {
        cardControls.start("visible");
      }
    }, [cardControls, inView]);
  
    return (
      <motion.div
        ref={ref}
        animate={cardControls}
        initial="hidden"
        variants={{
          visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
          hidden: { opacity: 0, scale: 0.9 }
        }}
        className={`${span} relative overflow-hidden rounded-lg shadow-lg cursor-pointer`}
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
      </motion.div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-[#ECE8E2] rounded-b-[50px] border-b-2 boder-zinc-300 "
    >
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl font-bold mb-12 py-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 to-zinc-900"
        >
          Inspirational Image Gallery
        </motion.h1>
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Explore Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
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
        </motion.div>

        <motion.form 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          onSubmit={handleSearch} 
          className="mb-12"
        >
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
        </motion.form>

        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-7xl auto-rows-[200px]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {images.map((image, index) => (
              <ImageCard key={image.id} image={image} span={getBentoGridSpan(index)} />
            ))}
          </motion.div>
        </AnimatePresence>

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
            <span className="text-gray-700 font-medium">Page {page} of {totalPages}</span>
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

        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-12 text-center"
          >
            <motion.div
              className="inline-block h-8 w-8 border-t-2 border-b-2 border-purple-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            ></motion.div>
            <p className="mt-2 text-gray-600">Loading amazing images...</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}