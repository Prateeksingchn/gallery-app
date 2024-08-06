import React from 'react';
import { motion } from 'framer-motion';
import { photographyTips } from '../data/photographyTips';

const FeaturedArtists = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-[#f5f5f5] to-[#ece8e2] rounded-b-[50px]">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-extrabold mb-12 text-center text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Photography Tips
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photographyTips.map((tip, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                {tip.image && (
                  <img src={tip.image} alt={tip.title} className="w-full h-56 object-cover"/>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-2xl font-semibold">{tip.title}</h3>
                  <p className="text-gray-300">{tip.category}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-6">{tip.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;
