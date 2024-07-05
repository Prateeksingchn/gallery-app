import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const features = [
    { title: 'Powered by Unsplash', description: 'Access millions of high-quality images from talented photographers worldwide.' },
    { title: 'React-based', description: 'Built with React for a fast and responsive user experience.' },
    { title: 'User-friendly Interface', description: 'Easy-to-use search and navigation for seamless browsing.' },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-800">About ImageGallery</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          ImageGallery is your gateway to a world of stunning visuals. We bring together the best of 
          photography and technology to provide an immersive image browsing experience.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h2>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-16 text-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Mission</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We aim to inspire creativity and connect people through the power of visual imagery. 
          Our platform is designed to make discovering and appreciating great photography 
          accessible to everyone.
        </p>
      </motion.div>
    </div>
  );
}