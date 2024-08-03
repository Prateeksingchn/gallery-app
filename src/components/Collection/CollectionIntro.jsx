import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CollectionIntro = ({ scrollToAbout }) => {
  const backgroundImageUrl = "/images/colb12.jpg";

  return (
    <div className="bg-black text-white min-h-screen font-serif">
      <div
        className="h-screen bg-cover bg-center flex flex-col justify-center items-start px-16 py-2"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-16 max-w-2xl"
        >
          <h1 className="text-8xl mb-4 font-bold text-zinc-700">
            Curated
          </h1>
          <h2 className="text-6xl mb-8 text-zinc-700 opacity-90">Collections</h2>
          <p className="text-xl mb-8 text-black opacity-80">
            Discover our carefully curated collections, each telling a unique visual story. 
            From breathtaking landscapes to cutting-edge digital art, our collections showcase 
            the diversity and beauty of visual creativity. Immerse yourself in these thematic 
            galleries, expertly crafted to inspire, challenge, and delight your senses.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/collections"
              className="bg-white text-black px-8 py-3 text-lg font-semibold rounded-md hover:bg-gray-200 transition-colors duration-300"
            >
              VIEW COLLECTIONS
            </Link>
            <button
              onClick={scrollToAbout}
              className="border-2 border-white text-white px-8 py-3 text-lg font-semibold rounded-md hover:bg-white hover:text-black transition-colors duration-300"
            >
              ABOUT OUR CURATION
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CollectionIntro;