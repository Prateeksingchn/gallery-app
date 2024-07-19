import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ImagePlaceholder = ({ controls }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={controls}
    style={{
      position: 'absolute',
      width: '80px',
      height: '80px',
      backgroundColor: '#ddd',
      borderRadius: '4px',
    }}
  />
);

const GalleryLoader = ({ onLoadingComplete }) => {
  const controls = useAnimation();

  const createImagePlaceholder = async () => {
    const x = Math.random() * 80 + 10; // 10-90% of container width
    const y = Math.random() * 80 + 10; // 10-90% of container height

    await controls.start({
      opacity: [0, 1, 1, 0],
      x: `${x}%`,
      y: `${y}%`,
      transition: { duration: 2.5, times: [0, 0.1, 0.9, 1] },
    });
  };

  useEffect(() => {
    const interval = setInterval(createImagePlaceholder, 500);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      onLoadingComplete();
    }, 5000); // Simulate loading for 5 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onLoadingComplete]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative w-[80vw] h-[60vh] bg-white overflow-hidden rounded-lg shadow-lg">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold mb-2">
            Find Inspiration <span className="text-red-500">Everywhere</span>
          </h1>
          <p className="text-gray-600">Your creative journey begins here</p>
        </div>
        {[...Array(10)].map((_, index) => (
          <ImagePlaceholder key={index} controls={controls} />
        ))}
      </div>
    </div>
  );
};

export default GalleryLoader;