import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const collections = [
    {
      id: 1,
      title: "Modern Abstracts",
      description: "A curated selection of contemporary abstract artworks",
      image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWJzdHJhY3QlMjBhcnR8ZW58MHx8MHx8fDA%3D",
      items: 12
    },
    {
      id: 2,
      title: "Impressionist Landscapes",
      description: "Breathtaking landscapes inspired by the Impressionist movement",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1wcmVzc2lvbmlzdCUyMGxhbmRzY2FwZXxlbnwwfHwwfHx8MA%3D%3D",
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
    },
    {
      id: 5,
      title: "Photography Masters",
      description: "Stunning photographs from renowned artists",
      image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D",
      items: 20
    },
    {
      id: 6,
      title: "Pop Art Explosion",
      description: "Vibrant and bold pop art pieces",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wJTIwYXJ0fGVufDB8fDB8fHww",
      items: 18
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

const CollectionPage = () => {
  useEffect(() => {
    console.log("CollectionPage component mounted");
    console.log("Number of collections:", collections.length);
  }, []);

  if (collections.length === 0) {
    return <div>No collections available</div>;
  }

  return (
    <div className="min-h-screen bg-[#ECE8E2] py-16 px-8">
      <motion.h1
        className="text-5xl font-serif text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        All Collections
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {collections.map((collection, index) => (
          <CollectionCard key={collection.id} collection={collection} index={index} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;