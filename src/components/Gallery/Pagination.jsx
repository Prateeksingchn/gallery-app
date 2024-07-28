// src/pages/Gallery/Pagination.jsx
import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, totalPages, handlePageChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="mt-16 mb-8 flex flex-col items-center space-y-4"
    >
      <div className="flex items-center space-x-2">
        <motion.button
          onClick={() => handlePageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-white text-purple-600 rounded-full disabled:opacity-50 flex items-center border border-purple-300 hover:bg-purple-50 transition-all duration-300 shadow-md disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={20} className="mr-1" />
          Prev
        </motion.button>

        {[...Array(Math.min(5, totalPages))].map((_, index) => {
          const pageNumber = page - 2 + index;
          return (
            pageNumber > 0 &&
            pageNumber <= totalPages && (
              <motion.button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  pageNumber === page
                    ? "bg-purple-600 text-white"
                    : "bg-white text-purple-600 border border-purple-300 hover:bg-purple-50"
                } transition-all duration-300 shadow-md`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {pageNumber}
              </motion.button>
            )
          );
        })}

        <motion.button
          onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-white text-purple-600 rounded-full disabled:opacity-50 flex items-center border border-purple-300 hover:bg-purple-50 transition-all duration-300 shadow-md disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next
          <ChevronRight size={20} className="ml-1" />
        </motion.button>
      </div>

      <span className="text-gray-600 font-medium">
        Page {page} of {totalPages}
      </span>
    </motion.div>
  );
};

export default Pagination;
