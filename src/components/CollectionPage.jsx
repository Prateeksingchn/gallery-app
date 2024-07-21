import React, { useState } from 'react';
import { motion } from 'framer-motion';

const collections = [
  {
    id: 1,
    title: "Astronaut",
    category: "Photography",
    image: "https://plus.unsplash.com/premium_photo-1681400089379-f137f62e66a4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fE1vZGVybiUyMEFic3RyYWN0c3xlbnwwfDB8MHx8fDA%3D",
    width: 400,
    height: 600
  },
  {
    id: 2,
    title: "The Dance",
    category: "Art",
    image: "https://images.unsplash.com/photo-1620031618014-31ef64d42589?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SW1wcmVzc2lvbmlzdCUyMExhbmRzY2FwZXN8ZW58MHwwfDB8fHww",
    width: 400,
    height: 300
  },
  {
    id: 3,
    title: "Melanin Goddess",
    category: "Branding",
    image: "https://plus.unsplash.com/premium_photo-1706430433607-48f37bdd71b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8RGlnaXRhbCUyMEFydCUyMFJldm9sdXRpb258ZW58MHwwfDB8fHww",
    width: 400,
    height: 300
  },
  {
    id: 4,
    title: "Blue denim",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1706185562887-471746737c50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFNjdWxwdHVyYWwlMjBXb25kZXJzfGVufDB8MHwwfHx8MA%3D%3D",
    width: 400,
    height: 300
  },
  {
    id: 5,
    title: "Ferris Wheel",
    category: "Print",
    image: "https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFBvcCUyMEFydCUyMENsYXNzaWNzfGVufDB8MXwwfHx8MA%3D%3D",
    width: 400,
    height: 300
  },
  {
    id: 6,
    title: "Negative space",
    category: "Art",
    image: "https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UmVuYWlzc2FuY2UlMjBNYXN0ZXJwaWVjZXN8ZW58MHwxfDB8fHww",
    width: 400,
    height: 600
  },
  {
    id: 7,
    title: "Contemporary Photography",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1649325897907-10fc87d1b6e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fENvbnRlbXBvcmFyeSUyMFBob3RvZ3JhcGh5fGVufDB8MXwwfHx8MA%3D%3D",
    width: 400,
    height: 300
  },
  {
    id: 8,
    title: "Surrealist Dreams",
    category: "Art",
    image: "https://plus.unsplash.com/premium_photo-1694412513842-b053c834b02c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8U3VycmVhbGlzdCUyMERyZWFtc3xlbnwwfDF8MHx8fDA%3D",
    width: 400,
    height: 300
  },
  {
    id: 9,
    title: "Abstract Expressionism",
    category: "Art",
    image: "https://images.unsplash.com/photo-1705055241490-82a5b65e2af4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QWJzdHJhY3QlMjBFeHByZXNzaW9uaXNtfGVufDB8MXwwfHx8MA%3D%3D",
    width: 400,
    height: 300
  },
  {
    id: 10,
    title: "Street Art & Graffiti",
    category: "Art",
    image: "https://images.unsplash.com/photo-1496105463139-c6c6f14dedf7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8U3RyZWV0JTIwQXJ0JTIwJTI2JTIwR3JhZmZpdGl8ZW58MHwxfDB8fHww",
    width: 400,
    height: 300
  }
];

const categories = ['All', 'Photography', 'Art', 'Branding', 'Print'];

const CollectionCard = ({ collection }) => (
  <motion.div
    className="relative overflow-hidden"
    style={{
      width: `${collection.width}px`,
      height: `${collection.height}px`,
    }}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <img src={collection.image} alt={collection.title} className="w-full h-full object-cover" />
    <div className="absolute bottom-0 left-0 p-4 text-white bg-gradient-to-t from-black to-transparent">
      <p className="text-xs opacity-75">{collection.category}</p>
      <h3 className="text-sm font-semibold">{collection.title}</h3>
    </div>
  </motion.div>
);

const CollectionPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCollections = selectedCategory === 'All'
    ? collections
    : collections.filter(collection => collection.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#171719] text-white py-20 px-6 ">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            className="text-3xl font-serif"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Projects
          </motion.h1>
          <nav>
            <ul className="flex space-x-4">
              {categories.map(category => (
                <li key={category}>
                  <button
                    className={`text-xs ${selectedCategory === category ? 'text-white' : 'text-gray-500'}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <motion.div 
          className="grid grid-cols-2 gap-4 items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredCollections.map(collection => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CollectionPage;