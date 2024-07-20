import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const collections = [
  {
    id: 1,
    title: "Modern Abstracts",
    description: "A curated selection of contemporary abstract artworks",
    image: "https://plus.unsplash.com/premium_photo-1681400089379-f137f62e66a4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fE1vZGVybiUyMEFic3RyYWN0c3xlbnwwfDB8MHx8fDA%3D",
    items: 12,
    position: { top: 10, left: 20 }
  },
  {
    id: 2,
    title: "Impressionist Landscapes",
    description: "Breathtaking landscapes inspired by the Impressionist movement",
    image: "https://images.unsplash.com/photo-1620031618014-31ef64d42589?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SW1wcmVzc2lvbmlzdCUyMExhbmRzY2FwZXN8ZW58MHwwfDB8fHww",
    items: 8,
    position: { top: 50, left: 350 }
  },
  {
    id: 3,
    title: "Digital Art Revolution",
    description: "Cutting-edge digital artworks pushing the boundaries of creativity",
    image: "https://plus.unsplash.com/premium_photo-1706430433607-48f37bdd71b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8RGlnaXRhbCUyMEFydCUyMFJldm9sdXRpb258ZW58MHwwfDB8fHww",
    items: 15,
    position: { top: 100, left: 680 }
  },
  {
    id: 4,
    title: "Sculptural Wonders",
    description: "A diverse collection of contemporary sculptures",
    image: "https://images.unsplash.com/photo-1706185562887-471746737c50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFNjdWxwdHVyYWwlMjBXb25kZXJzfGVufDB8MHwwfHx8MA%3D%3D",
    items: 10,
    position: { top: 30, left: 1010 }
  },
  {
    id: 5,
    title: "Pop Art Classics",
    description: "Iconic works from the Pop Art movement of the 20th century",
    image: "https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFBvcCUyMEFydCUyMENsYXNzaWNzfGVufDB8MXwwfHx8MA%3D%3D",
    items: 18,
    position: { top: 150, left: 1340 }
  },
  {
    id: 6,
    title: "Renaissance Masterpieces",
    description: "Timeless works from the European Renaissance period",
    image: "https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UmVuYWlzc2FuY2UlMjBNYXN0ZXJwaWVjZXN8ZW58MHwxfDB8fHww",
    items: 14,
    position: { top: 80, left: 1670 }
  },
  {
    id: 7,
    title: "Contemporary Photography",
    description: "Thought-provoking images from modern photographers",
    image: "https://images.unsplash.com/photo-1649325897907-10fc87d1b6e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fENvbnRlbXBvcmFyeSUyMFBob3RvZ3JhcGh5fGVufDB8MXwwfHx8MA%3D%3D",
    items: 20,
    position: { top: 200, left: 2000 }
  },
  {
    id: 8,
    title: "Surrealist Dreams",
    description: "Mind-bending artworks from the Surrealist movement",
    image: "https://plus.unsplash.com/premium_photo-1694412513842-b053c834b02c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8U3VycmVhbGlzdCUyMERyZWFtc3xlbnwwfDF8MHx8fDA%3D",
    items: 11,
    position: { top: 120, left: 2330 }
  },
  {
    id: 9,
    title: "Abstract Expressionism",
    description: "Powerful works from the Abstract Expressionist movement",
    image: "https://images.unsplash.com/photo-1705055241490-82a5b65e2af4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QWJzdHJhY3QlMjBFeHByZXNzaW9uaXNtfGVufDB8MXwwfHx8MA%3D%3D",
    items: 16,
    position: { top: 170, left: 2660 }
  },
  {
    id: 10,
    title: "Street Art & Graffiti",
    description: "Urban art that challenges conventional artistic boundaries",
    image: "https://images.unsplash.com/photo-1496105463139-c6c6f14dedf7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8U3RyZWV0JTIwQXJ0JTIwJTI2JTIwR3JhZmZpdGl8ZW58MHwxfDB8fHww",
    items: 25,
    position: { top: 50, left: 2990 }
  }
];

const CollectionCard = ({ collection }) => {
  return (
    <div 
      className="absolute overflow-hidden cursor-pointer w-80 h-72"
      style={{
        top: `${collection.position.top}px`,
        left: `${collection.position.left}px`
      }}
    >
      <img
        src={collection.image}
        alt={collection.title}
        className="w-full h-full object-cover absolute"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <h3 className="text-white text-lg font-bold">{collection.title}</h3>
        <p className="text-gray-300 text-sm">{collection.items} items</p>
      </div>
    </div>
  );
};

const DraggableContainer = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setStartY(e.pageY - containerRef.current.offsetTop);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const y = e.pageY - containerRef.current.offsetTop;
    const walkX = (x - startX);
    const walkY = (y - startY);
    containerRef.current.scrollLeft -= walkX;
    containerRef.current.scrollTop -= walkY;
    setStartX(x);
    setStartY(y);
  };

  return (
    <div
      ref={containerRef}
      className="overflow-x-auto overflow-y-hidden scrollbar-hide cursor-grab"
      style={{ width: '100%', height: '480px' }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div style={{ width: '2000px', height: '400px', position: 'relative' }}>
        {children}
      </div>
    </div>
  );
};

const CollectionSec = () => {
  return (
    <div className="min-h-screen bg-[#1D1D1D] text-white py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-6xl lg:text-7xl font-bold mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center">
            <span className="mr-4">COLL</span>
            <div className="w-36 h-12 lg:w-52 lg:h-16 overflow-hidden rounded">
              <img
                src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D"
                alt="Nature"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <span className="block mt-2">—ECTIONS</span>
        </motion.h1>
        <p className="mb-12 max-w-2xl">
          The National Art Museum is a cultural house of Belarus. Its holdings are considered one of the biggest in Eastern Europe. Today it is not only a museum/art gallery but also a modern scientific and educational center and an art platform.
        </p>
        <DraggableContainer>
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </DraggableContainer>
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link to="/collections">
            <motion.button
              className="flex items-center transition-colors"
              whileHover={{ y: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore More
              <ChevronDown className="ml-2" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CollectionSec;