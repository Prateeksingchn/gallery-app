import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const collections = [
  {
    id: 1,
    title: "Modern Abstracts",
    description: "A curated selection of contemporary abstract artworks",
    image: "https://images.unsplash.com/photo-1527067829737-402993088e6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fE1vZGVybiUyMEFic3RyYWN0c3xlbnwwfDB8MHx8fDA%3D",
    items: 12
  },
  {
    id: 2,
    title: "Impressionist Landscapes",
    description: "Breathtaking landscapes inspired by the Impressionist movement",
    image: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fEltcHJlc3Npb25pc3QlMjBMYW5kc2NhcGVzfGVufDB8MHwwfHx8MA%3D%3D",
    items: 8
  },
  {
    id: 3,
    title: "Digital Art Revolution",
    description: "Cutting-edge digital artworks pushing the boundaries of creativity",
    image: "https://plus.unsplash.com/premium_photo-1710787193520-74df05ed7736?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGRpZ2l0YWwlMjBhcnR8ZW58MHwwfDB8fHww",
    items: 15
  },
  {
    id: 4,
    title: "Sculptural Wonders",
    description: "A diverse collection of contemporary sculptures",
    image: "https://images.unsplash.com/photo-1653685605513-fe65f8ae8dbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2N1bHB1dHJlfGVufDB8fDB8fHww",
    items: 10
  }
];

const CollectionCard = ({ collection, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.img
        src={collection.image}
        alt={collection.title}
        className="w-full h-64 object-cover"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-white text-2xl font-semibold mb-2">{collection.title}</h3>
        <p className="text-gray-300 mb-2">{collection.description}</p>
        <p className="text-gray-400">{collection.items} items</p>
      </motion.div>
    </motion.div>
  );
};

const CollectionSec = () => {
  return (
    <div className="min-h-screen bg-[#ECE8E2] py-16 px-8">
      <motion.h1
        className="text-5xl font-serif text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Collections
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {collections.slice(0, 4).map((collection, index) => (
          <CollectionCard key={collection.id} collection={collection} index={index} />
        ))}
      </div>
      <motion.div
        className="flex justify-center mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Link to="/collections">
          <motion.button
            className="flex items-center text-gray-800 hover:text-gray-600 transition-colors"
            whileHover={{ y: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore More
            <ChevronDown className="ml-2" />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default CollectionSec;