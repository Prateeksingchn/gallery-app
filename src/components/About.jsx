import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center space-x-4 pb-2">
      <div className="bg-purple-100 p-3 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StatItem = ({ value, label }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 100, delay: 0.5 }}
      className="text-4xl font-bold text-purple-600 mb-2"
    >
      {value}
    </motion.div>
    <div className="text-gray-600">{label}</div>
  </div>
);

export default function About() {
  const features = [
    { 
      title: 'Powered by Unsplash', 
      description: 'Access millions of high-quality images from talented photographers worldwide.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    },
    { 
      title: 'React-based', 
      description: 'Built with React for a fast and responsive user experience.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    },
    { 
      title: 'User-friendly Interface', 
      description: 'Easy-to-use search and navigation for seamless browsing.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl font-bold mb-6 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">About ImageGallery</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          ImageGallery is your gateway to a world of stunning visuals. We bring together the best of 
          photography and technology to provide an immersive image browsing experience.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
      >
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Our Mission</h2>
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-8 rounded-lg shadow-xl">
          <p className="text-lg max-w-3xl mx-auto text-center">
            We aim to inspire creativity and connect people through the power of visual imagery. 
            Our platform is designed to make discovering and appreciating great photography 
            accessible to everyone, fostering a global community of art enthusiasts and creators.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">ImageGallery in Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatItem value="10M+" label="Images" />
          <StatItem value="1M+" label="Users" />
          <StatItem value="100K+" label="Photographers" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="text-center bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Join Our Community</h2>
        <p className="text-xl text-gray-600 mb-8">
          Be part of our growing community of photography enthusiasts and creators.
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300">
          Sign Up Now
        </button>
      </motion.div>
    </div>
  );
}