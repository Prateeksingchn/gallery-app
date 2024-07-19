import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';

import GalleryLoader from './GalleryLoader';

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const IMAGES_PER_PAGE = 15;

const FloatingImage = ({ src, alt, className }) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={`absolute object-cover rounded-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    />
  );
};

export default function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const controls = useAnimation();

  const inspirationRef = useRef(null);
  const bentoGridRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: inspirationRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const yPos = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const InspirationSection = () => (
    <motion.div 
      ref={inspirationRef}
      style={{ opacity, y: yPos }}
      className="h-screen w-full bg-[#f5f5f5] relative overflow-hidden font-serif"
    >
      <div className="absolute inset-0">
        <FloatingImage src="https://i.pinimg.com/236x/3d/18/21/3d182196300ee640b486dc88b3f09bb7.jpg" alt="Placeholder" className="top-[5%] left-[5%] w-[150px] h-[170px]" />
        <FloatingImage src="https://i.pinimg.com/236x/0e/42/7f/0e427fefb82a8f6326dbcce6e4468a56.jpg" alt="Placeholder" className="top-[10%] right-[10%] w-[130px] h-[130px]" />
        <FloatingImage src="https://i.pinimg.com/236x/33/12/c4/3312c4eea018181a4de435c44bdb8f30.jpg" alt="Placeholder" className="bottom-[15%] left-[15%] w-[140px] h-[160px]" />
        <FloatingImage src="https://i.pinimg.com/236x/98/8b/0d/988b0d2faafc1156acd8ea0b28009985.jpg" alt="Placeholder" className="bottom-[10%] right-[20%] w-[160px] h-[130px]" />
        <FloatingImage src="https://i.pinimg.com/236x/a4/e2/02/a4e202ba80d3a9a0b8db24d75c73ff40.jpg" alt="Placeholder" className="top-[30%] left-[30%] w-[150px] h-[150px]" />
        <FloatingImage src="https://i.pinimg.com/236x/4a/cf/77/4acf771a623bb6acacf51b832374028f.jpg" alt="Placeholder" className="top-[25%] right-[25%] w-[170px] h-[210px]" />
        <FloatingImage src="https://i.pinimg.com/236x/4d/92/aa/4d92aa15d703b6f5619953a62876e9f9.jpg" alt="Placeholder" className="bottom-[30%] left-[40%] w-[140px] h-[140px]" />
        <FloatingImage src="https://i.pinimg.com/236x/10/f3/c0/10f3c0375d6afc939af6f854b333bba1.jpg" alt="Placeholder" className="top-[40%] right-[5%] w-[130px] h-[160px]" />
        <FloatingImage src="https://i.pinimg.com/236x/c9/dd/59/c9dd590d03ea0cc26c8bdb94c53d92cb.jpg" alt="Placeholder" className="bottom-[5%] left-[25%] w-[150px] h-[120px]" />
        <FloatingImage src="https://i.pinimg.com/236x/3d/63/90/3d639037ba61d2f2548226940b360db5.jpg" alt="Placeholder" className="top-[15%] left-[45%] w-[140px] h-[170px]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            Find Inspiration Wherever You Are
          </h1>
          <motion.div
            className="mt-4"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <div className="h-0.5 bg-red-500 mx-auto" style={{ width: "80px" }}></div>
          </motion.div>
        </div>
      </div>
      <div className="absolute top-4 left-4 text-sm text-gray-500">
        MOODJOURNAL
      </div>
      <div className="absolute bottom-4 right-4 text-sm text-gray-500">
        SEE YOUR OWN MUSE
      </div>
    </motion.div>
  );

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
    <div className="relative">
      <InspirationSection />

      <div ref={bentoGridRef} className="min-h-screen pt-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Inspiration Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-7xl auto-rows-[200px]">
            {images.map((image, index) => (
              <ImageCard key={image.id} image={image} span={getBentoGridSpan(index)} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            {loading ? (
              <p className="text-center text-gray-600">Loading more images...</p>
            ) : (
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors duration-300"
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