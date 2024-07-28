// src/pages/Gallery/CategoryButtons.jsx
import React from "react";
import { motion } from "framer-motion";

const CategoryButtons = ({ categories, activeCategory, handleCategoryClick }) => {
  return (
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
  );
};

export default CategoryButtons;
