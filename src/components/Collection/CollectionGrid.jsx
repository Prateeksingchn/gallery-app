import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import collections from '../Collection/collection'; // Update this path to match your project structure


const CollectionCard = ({ collection }) => (
  <Link to={`/collection/${collection.id}`}>
    <motion.div
      className="relative overflow-hidden rounded-lg shadow-lg h-64 sm:h-80 lg:h-[270px] xl:h-[270px] cursor-pointer"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <img src={collection.image} alt={collection.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <p className="text-sm font-medium mb-2 opacity-75">{collection.category}</p>
        <h3 className="text-xl font-bold">{collection.title}</h3>
      </div>
    </motion.div>
  </Link>
);

const CollectionGrid = () => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 bg-[#FAF7F2] "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {collections.map(collection => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </motion.div>
  );
};

export default CollectionGrid;