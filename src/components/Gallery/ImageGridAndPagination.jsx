import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ImageCard = ({ image, span }) => {
  const cardControls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const navigate = useNavigate();

  useEffect(() => {
    if (inView) {
      cardControls.start("visible");
    }
  }, [cardControls, inView]);

  const handleClick = () => {
    navigate(`/details/${image.id}`);
  };

  return (
    <motion.div
      ref={ref}
      animate={cardControls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        hidden: { opacity: 0, scale: 0.9 },
      }}
      className={`${span} relative overflow-hidden rounded-lg shadow-lg cursor-pointer`}
      onClick={handleClick}
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

const ImageGridAndPagination = ({ images, loading, totalPages, page, handlePageChange }) => {
  const getBentoGridSpan = (index) => {
    const spans = [
      "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
      "col-span-1 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-1 lg:row-span-2",
      "col-span-2 row-span-1 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-1",
      "col-span-1 row-span-1 md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2",
      "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
      "col-span-2 row-span-1 md:col-span-2 md:row-span-2 lg:col-span-1 lg:row-span-2",
      "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-2 lg:row-span-1",
      "col-span-1 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1",
      "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-2",
      "col-span-1 row-span-1 md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-1",
      "col-span-2 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-1 lg:row-span-2",
      "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-2",
      "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
      "col-span-2 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-1 lg:row-span-1",
      "col-span-2 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
    ];
    return spans[index % spans.length];
  };

  return (
    <>
      {/* Image Grid */}
      <AnimatePresence>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 px-4 mx-auto max-w-7xl auto-rows-[200px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {images.map((image, index) => (
            <ImageCard
              key={image.id}
              image={image}
              span={getBentoGridSpan(index)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
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
      )}

      {/* Loading Indicator */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-12 text-center"
        >
          <motion.div
            className="inline-block h-12 w-12 border-t-4 border-b-4 border-purple-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          ></motion.div>
          <p className="mt-4 text-lg text-gray-600">
            Loading amazing images...
          </p>
        </motion.div>
      )}
    </>
  );
};

export default ImageGridAndPagination;