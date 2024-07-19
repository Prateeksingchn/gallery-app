import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import GalleryLoader from './GalleryLoader'; // Uncommented this import

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
// Removed console.log for API_KEY

const IMAGES_PER_PAGE = 15;

const ImagePlaceholder = ({ controls }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={controls}
    style={{
      position: 'absolute',
      width: '80px',
      height: '80px',
      backgroundColor: 'rgba(221, 221, 221, 0.5)',
      borderRadius: '4px',
    }}
  />
);

export default function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const controls = useAnimation(); // Added missing controls

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.unsplash.com/photos/random?count=${IMAGES_PER_PAGE}&client_id=${API_KEY}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setImages(prevImages => [...prevImages, ...data]);
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Failed to fetch images. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages, page]);

  const createImagePlaceholder = useCallback(async () => {
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 80 + 10;

    await controls.start({
      opacity: [0, 1, 1, 0],
      x: `${x}%`,
      y: `${y}%`,
      transition: { duration: 2.5, times: [0, 0.1, 0.9, 1] },
    });
  }, [controls]);

  useEffect(() => {
    const interval = setInterval(createImagePlaceholder, 500);
    return () => clearInterval(interval);
  }, [createImagePlaceholder]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = (imageId) => {
    navigate(`/details/${imageId}`);
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
        onClick={() => handleImageClick(image.id)}
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

  if (loading && images.length === 0) {
    return <GalleryLoader onLoadingComplete={() => setLoading(false)} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(10)].map((_, index) => (
          <ImagePlaceholder key={index} controls={controls} />
        ))}
      </div>
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-800">Welcome to ImageGallery</h1>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-gray-600">Explore beautiful images in a bento grid style.</p>
          <Link
            to="/gallery"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 md:px-8 md:py-3 rounded-full text-base md:text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            Explore Gallery
          </Link>
        </motion.div>
        
        <div className="mt-8 md:mt-12 lg:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-gray-800">Featured Images</h2>
          {error && <p className="text-center text-red-500">{error}</p>}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4 mx-auto max-w-7xl auto-rows-[100px] sm:auto-rows-[150px] md:auto-rows-[200px]">
            {images.map((image, index) => (
              <ImageCard key={image.id} image={image} span={getBentoGridSpan(index)} />
            ))}
          </div>
          <div className="mt-6 md:mt-8 flex justify-center">
            {loading ? (
              <p className="text-center text-gray-600">Loading more images...</p>
            ) : (
              <button
                onClick={handleLoadMore}
                className="px-4 py-2 md:px-6 md:py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors duration-300 text-sm md:text-base"
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}