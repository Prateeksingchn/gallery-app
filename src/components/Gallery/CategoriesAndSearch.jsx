import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const categories = [
  "Nature", "Travel", "Architecture", "People", "Wallpapers", "Food",
  "Animals", "Technology", "Art", "Fashion", "Sports", "Business", "Music", "Film",
];

const CategoriesAndSearch = ({ query, setQuery, handleSearch, activeCategory, handleCategoryClick }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="px-5 py-12 mx-32 bg-[#ece8e2d1] rounded-sm shadow-lg mb-12 -mt-10"
    >
      {/* Categories */}
      <div className="mb-10">
        <h3 className="text-xl font-medium mb-4 text-gray-700">Categories</h3>
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
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
              } transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col items-center justify-center">
        <form onSubmit={handleSearch} className="flex w-[50%] ">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for images..."
            className="flex-grow px-5 py-3 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-r-full hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300 flex items-center"
          >
            <Search size={20} className="mr-2" />
            Search
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default CategoriesAndSearch;