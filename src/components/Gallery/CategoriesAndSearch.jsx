import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  "Nature", "Travel", "Architecture", "People", "Wallpapers",
  "Food", "Animals", "Technology", "Art", "Fashion",
  "Sports", "Business", "Music", "Film",
];

const CategoriesAndSearch = ({
  query,
  setQuery,
  handleSearch,
  activeCategory,
  handleCategoryClick,
}) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="mx-auto max-w-7xl md:py-14 lg:py-8 px-4 md:px-16 lg:px-8 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg my-12"
    >
      {/* Search */}
      <div className="mb-8 relative">
        <motion.div 
          className={`flex items-center w-full max-w-3xl mx-auto bg-white rounded-full transition-all duration-300 ${
            isFocused ? 'shadow-lg ring-2 ring-blue-300' : 'shadow'
          }`}
          animate={{ scale: isFocused ? 1.02 : 1 }}
        >
          <Search size={20} className="ml-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search for images..."
            className="w-full px-4 py-3 rounded-full focus:outline-none text-gray-700 bg-transparent"
          />
          <motion.button
            type="button"
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-300 mr-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Search
          </motion.button>
        </motion.div>
      </div>

      {/* Categories */}
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Categories</h3>
        <motion.div 
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          <AnimatePresence>
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryClick(category)}
                onMouseEnter={() => setHoveredCategory(category)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-white bg-opacity-70 text-gray-700 hover:bg-opacity-100 border border-blue-200"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
                {hoveredCategory === category && (
                  <motion.span
                    className="absolute inset-0 bg-blue-100 rounded-full -z-10"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.button>
            ))}
          </AnimatePresence>
          <Link to="/collections">
            <motion.button
              className="px-4 py-2 rounded-full text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CategoriesAndSearch;