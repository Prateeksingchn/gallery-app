import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const API_URL = "https://api.unsplash.com/photos";
const IMAGES_PER_PAGE = 15;

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
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-[#ECE8E2] px-8 py-24"
    >
      <div className="max-w-[1350px] mx-auto">
        <Link
          to="/"
          className="text-black text-lg font-semibold mb-8 inline-block"
        >
          ← Back to Home
        </Link>
        <h1 className="text-4xl text-gradient-to-r from-blue-600 to-purple-600 font-[anton] tracking-wider mb-8">
          Top Images of Today
        </h1>

        <p className="text-lg text-gray-700 mb-12">
          Discover the most popular images of today, curated from a selection of amazing AI and 3D renders. Immerse yourself in the creativity and innovation of these stunning visuals.
        </p>

        {loading ? (
          <div className="text-black text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                className={`overflow-hidden rounded-lg shadow-lg ${getBentoSize(index)}`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative h-full group">
                  <img
                    src={image.urls.regular}
                    alt={image.alt_description}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                    <p className="font-semibold">{image.user.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const getBentoSize = (index) => {
  const sizes = [
    "row-span-2 col-span-2",
    "row-span-2 col-span-1",
    "row-span-1 col-span-1",
    "row-span-2 col-span-1",
    "row-span-2 col-span-1",
    "row-span-2 col-span-2",
    "row-span-1 col-span-1",
    "row-span-2 col-span-2",
    "row-span-1 col-span-1",
    "row-span-1 col-span-1",
    "row-span-2 col-span-2",
    "row-span-2 col-span-1",
    "row-span-1 col-span-1",
    "row-span-1 col-span-2",
    "row-span-1 col-span-1",
  ];
  return sizes[index % sizes.length];
};

export default TopImagesGallery;
