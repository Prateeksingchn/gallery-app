// src/pages/Gallery/Gallery.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import GalleryIntroSection from "./GalleryIntroSection";
import ImageCard from "./ImageCard";
import CategoryButtons from "./CategoryButtons";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import LoadingIndicator from "./LoadingIndicator";

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const API_URL = "https://api.unsplash.com/photos";
const SEARCH_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 22;

const categories = [
  "Nature",
  "Travel",
  "Architecture",
  "People",
  "Wallpapers",
  "Food",
  "Animals",
  "Technology",
  "Art",
  "Fashion",
  "Sports",
  "Business",
  "Music",
  "Film",
];

const Gallery = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [featuredImages, setFeaturedImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const fetchImages = async (searchQuery = "", pageNum = 1) => {
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
      console.error("Error fetching images:", error);
    }
    setLoading(false);
  };

  const fetchFeaturedImages = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          order_by: "random",
          per_page: 4,
          client_id: API_KEY,
        },
      });
      setFeaturedImages(response.data);
    } catch (error) {
      console.error("Error fetching featured images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
    fetchFeaturedImages();
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
    setQuery("");
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchImages(activeCategory || query, newPage);
    window.scrollTo(0, 0);
  };

  const getBentoGridSpan = (index) => {
    const spans = [
      "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
      "col-span-1 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-1 lg:row-span-1",
      "col-span-2 row-span-1 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-1",
      "col-span-1 row-span-1 md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2",
      "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
      "col-span-2 row-span-1 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2",
      "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
      "col-span-1 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1",
      "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
      "col-span-1 row-span-1 md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2",
      "col-span-2 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1",
      "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
      "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
      "col-span-2 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1",
      "col-span-1 row-span-2 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
    ];
    return spans[index % spans.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-[#ECE8E2] rounded-b-[50px] border-b-2 border-zinc-300"
    >
      <div className="container mx-auto px-4 py-2">
        {/* Full-screen Gallery Intro Section */}
        <GalleryIntroSection featuredImages={featuredImages} />

        {/* Combined Categories and Search Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="px-8 py-12 bg-[#ece8e2d1] rounded-sm shadow-lg mb-12 -mt-10"
        >
          <CategoryButtons
            categories={categories}
            activeCategory={activeCategory}
            handleCategoryClick={handleCategoryClick}
          />
          <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />
        </motion.div>

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
          <Pagination
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        )}

        {/* Loading Indicator */}
        {loading && <LoadingIndicator />}
      </div>
    </motion.div>
  );
};

export default Gallery;
