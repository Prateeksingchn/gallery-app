import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const API_URL = "https://api.unsplash.com/photos";
const IMAGES_PER_PAGE = 15;

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
        hidden: { opacity: 0, scale: 0.9 },
      }}
      className={`${span} relative overflow-hidden rounded-lg shadow-lg`}
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

const TopImagesGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          order_by: "popular",
          per_page: IMAGES_PER_PAGE,
          client_id: API_KEY,
        },
      });
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-[#ECE8E2] px-2 sm:px-4 lg:py-20 md:py-12"
    >
      <div className="max-w-[1350px] mx-auto">
        <Link
          to="/"
          className="text-black text-lg font-semibold mb-4 inline-flex items-center ml-14"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back to Home
        </Link>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl ml-14 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 font-[anton] tracking-wider mb-4">
          Top Images of Today
        </h1>

        <p className="text-base sm:text-lg text-gray-700 mb-6 mx-14">
          Explore a curated collection of today's most captivating images from around the world. From breathtaking landscapes to powerful portraits, immerse yourself in this visual journey showcasing the best of photography and digital artistry.
        </p>

        <AnimatePresence>
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
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
          ) : (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 px-4 md:px-8 lg:px-4 mx-auto max-w-7xl auto-rows-[200px] z-50"
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
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TopImagesGallery;