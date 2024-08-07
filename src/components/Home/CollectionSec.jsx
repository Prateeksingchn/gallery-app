import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const collections = [
  {
    id: 1,
    title: "Modern Abstracts",
    description: "A curated selection of contemporary abstract artworks",
    image: "https://plus.unsplash.com/premium_photo-1681400089379-f137f62e66a4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fE1vZGVybiUyMEFic3RyYWN0c3xlbnwwfDB8MHx8fDA%3D",
    category: "abstract art"
  },
  {
    id: 2,
    title: "Nature's Beauty",
    description: "Stunning landscape photography from around the world",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlfGVufDB8fDB8fHww",
    category: "landscape photography"
  },
  {
    id: 3,
    title: "Digital Art Revolution",
    description: "Cutting-edge digital artworks pushing the boundaries of creativity",
    image: "https://plus.unsplash.com/premium_photo-1706430433607-48f37bdd71b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8RGlnaXRhbCUyMEFydCUyMFJldm9sdXRpb258ZW58MHwwfDB8fHww",
    category: "digital art"
  },
  {
    id: 4,
    title: "Urban Exploration",
    description: "Captivating images of city life and architecture",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXJiYW58ZW58MHx8MHx8fDA%3D",
    category: "urban photography"
  },
  {
    id: 5,
    title: "Pop Art Classics",
    description: "Iconic works from the Pop Art movement of the 20th century",
    image: "https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFBvcCUyMEFydCUyMENsYXNzaWNzfGVufDB8MXwwfHx8MA%3D%3D",
    category: "pop art"
  },
  {
    id: 6,
    title: "Wildlife Wonders",
    description: "Breathtaking photographs of animals in their natural habitats",
    image: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2lsZGxpZmV8ZW58MHx8MHx8fDA%3D",
    category: "wildlife photography"
  },
  {
    id: 7,
    title: "Contemporary Photography",
    description: "Thought-provoking images from modern photographers",
    image: "https://images.unsplash.com/photo-1649325897907-10fc87d1b6e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fENvbnRlbXBvcmFyeSUyMFBob3RvZ3JhcGh5fGVufDB8MXwwfHx8MA%3D%3D",
    category: "contemporary photography"
  },
  {
    id: 8,
    title: "Surrealist Dreams",
    description: "Mind-bending artworks from the Surrealist movement",
    image: "https://plus.unsplash.com/premium_photo-1694412513842-b053c834b02c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8U3VycmVhbGlzdCUyMERyZWFtc3xlbnwwfDF8MHx8fDA%3D",
    category: "surrealism"
  },
  {
    id: 9,
    title: "Abstract Expressionism",
    description: "Powerful works from the Abstract Expressionist movement",
    image: "https://images.unsplash.com/photo-1705055241490-82a5b65e2af4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QWJzdHJhY3QlMjBFeHByZXNzaW9uaXNtfGVufDB8MXwwfHx8MA%3D%3D",
    category: "abstract expressionism"
  },
  {
    id: 10,
    title: "Street Life",
    description: "Candid moments captured in the hustle and bustle of city streets",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyZWV0JTIwbGlmZXxlbnwwfHwwfHx8MA%3D",
    category: "street photography"
  }
];

const CollectionCard = ({ collection, index }) => {
  return (
    <div 
      className="relative overflow-hidden cursor-pointer w-[200px] h-[200px] lg:w-[250px] lg:h-[250px] mx-2 my-1"
      style={{
        top: `${(index % 2) * 30}px`,
      }}
    >
      <img
        src={collection.image}
        alt={collection.title}
        className="w-full h-full object-cover absolute"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
        <h3 className="text-white text-base font-bold">{collection.title}</h3>
        <p className="text-gray-300 text-xs">{collection.category}</p>
      </div>
    </div>
  );
};

const MarqueeContainer = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let animationId;

    const animate = () => {
      if (container) {
        container.scrollLeft += 1;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden whitespace-nowrap"
      style={{ width: '100%', height: '300px' }}
    >
      <div className="inline-block">
        {children}
      </div>
      <div className="inline-block">
        {children}
      </div>
    </div>
  );
};

const CollectionSec = () => {
  return (
    <div className="w-full lg:h-screen h-[600px] bg-[#1D1D1D] overflow-hidden rounded-t-[10px]">
      <div className="bg-[#1D1D1D] text-[#f0f0f0] py-8 px-4 md:py-12 md:px-6 lg:pt-14 lg:pb-44 lg:px-10">
        <div className="container mx-auto">
          <motion.h1
            className="text-5xl md:text-5xl lg:text-[5rem] font-bold mb-4 md:mb-6 lg:mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center flex-wrap">
              <span className="mr-2">COLL</span>
              <div className="w-24 h-8 md:w-32 md:h-10 lg:w-40 lg:h-[58px] overflow-hidden rounded">
                <img
                  src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D"
                  alt="Nature"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="block mt-1">—ECTION</span>
          </motion.h1>
          <p className="mb-6 md:mb-8 max-w-2xl text-sm md:text-base">
            Explore our vast collection of stunning photographs from talented artists around the world. From breathtaking landscapes to candid street scenes, our gallery showcases the beauty and diversity of visual storytelling through the lens.
          </p>
          <MarqueeContainer>
            <div className="flex h-[400px] ">
              {collections.map((collection, index) => (
                <CollectionCard key={collection.id} collection={collection} index={index} />
              ))}
            </div>
          </MarqueeContainer>
          <motion.div
            className="flex justify-center lg:mt-10 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link to="/collections">
              <motion.button
                className="flex flex-col items-center transition-colors text-base md:text-lg"
                whileHover={{ y: 3 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore More Collections 
                <ChevronDown className="ml-1" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CollectionSec;