import React from 'react';
import { motion } from 'framer-motion';
import { Download, Save, Share, Heart, Camera, Tag } from 'lucide-react';

const FeatureShowcase = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const features = [
    { icon: Save, title: 'Save', description: 'Store images in your personal collection' },
    { icon: Download, title: 'Download', description: 'Get high-quality images on your device' },
    { icon: Share, title: 'Share', description: 'Easily share images with friends and family' },
    { icon: Heart, title: 'Like', description: 'Show appreciation for your favorite images' },
    { icon: Camera, title: 'Capture', description: 'Take and edit photos directly in the app' },
    { icon: Tag, title: 'Tag', description: 'Organize your images with custom tags' },
  ];

  return (
    <motion.section
      className="bg-[#121212] text-white py-20 px-4 md:px-8 rounded-b-3xl mb-2 overflow-hidden relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      variants={containerVariants}
    >
      <div className="absolute inset-0 bg-[#1D1D1D]" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400"
          variants={itemVariants}
        >
          Unleash Your Creativity
        </motion.h2>
        <motion.p 
          className="text-xl md:text-2xl text-center mb-12 text-gray-300"
          variants={itemVariants}
        >
          Discover a world of possibilities with our feature-rich platform
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center bg-zinc-700/50 p-6 rounded-xl backdrop-blur-sm"
              variants={itemVariants}
            >
              <motion.div 
                className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-full mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <feature.icon size={32} />
              </motion.div>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-center text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <motion.button
            className="bg-gradient-to-r from-purple-500 to-indigo-500 px-8 py-3 rounded-full font-semibold text-lg hover:from-purple-600 hover:to-indigo-600 transition duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Creating Now
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeatureShowcase;