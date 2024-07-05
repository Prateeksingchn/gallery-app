import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-6 text-gray-800">Welcome to ImageGallery</h1>
        <p className="text-xl mb-8 text-gray-600">Explore beautiful images from around the world.</p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/gallery"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            Explore Gallery
          </Link>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {[
          { title: 'Diverse Collection', description: 'Access millions of high-quality images.' },
          { title: 'Easy Search', description: 'Find the perfect image with our powerful search.' },
          { title: 'Regular Updates', description: 'New images added daily for fresh content.' }
        ].map((feature, index) => (
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
    </div>
  );
}