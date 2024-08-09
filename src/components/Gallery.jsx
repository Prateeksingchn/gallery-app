import React, { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { motion } from "framer-motion";
import GalleryIntroSection from "./Gallery/GalleryIntroSection";
import CategoriesAndSearch from "./Gallery/CategoriesAndSearch";
import ImageGridAndPagination from "./Gallery/ImageGridAndPagination";

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const API_URL = "https://api.unsplash.com/photos";
const SEARCH_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 30;

const Gallery = () => {
  const location = useLocation();
  const gridRef = useRef(null);
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
    // Add this line to scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (activeCategory) {
      fetchImages(activeCategory, 1);
    }
  }, [activeCategory]);

  useEffect(() => {
    if (location.state && location.state.scrollToGrid && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-b from-zinc-200 to-sky-600 rounded-b-[50px] border-b-2 border-zinc-300 "
    >
      <div className="max-w-8xl mx-auto">
        <GalleryIntroSection featuredImages={featuredImages} />

        <CategoriesAndSearch
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          activeCategory={activeCategory}
          handleCategoryClick={handleCategoryClick}
        />

        <div ref={gridRef}>
          <ImageGridAndPagination
            images={images}
            loading={loading}
            totalPages={totalPages}
            page={page}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Gallery;