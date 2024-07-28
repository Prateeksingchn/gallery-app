import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
  },
  {
    id: 11,
    title: "Minimalist Aesthetics",
    description: "Exploring the beauty of simplicity in art and design",
    image: "https://images.unsplash.com/photo-1605106702734-205df224ecce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWluaW1hbGlzdCUyMEFlc3RoZXRpY3N8ZW58MHwxfDB8fHww",
    category: "minimalism"
  },
  {
    id: 12,
    title: "Aerial Perspectives",
    description: "Stunning bird's-eye view photographs of landscapes and cityscapes",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWVyaWFsJTIwcGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D",
    category: "aerial photography"
  },
  {
    id: 13,
    title: "Majestic Mountains",
    description: "Breathtaking views of towering peaks and rugged landscapes",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW91bnRhaW5zfGVufDB8fDB8fHww",
    category: "mountains"
  },
  {
    id: 14,
    title: "Scenic Wallpapers",
    description: "High-resolution images perfect for desktop and mobile backgrounds",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbHBhcGVyfGVufDB8fDB8fHww",
    category: "wallpaper"
  },
  {
    id: 15,
    title: "Travel Adventures",
    description: "Inspiring images from exotic locations around the world",
    image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhdmVsfGVufDB8fDB8fHww",
    category: "travel"
  },
  {
    id: 16,
    title: "3D Rendered Art",
    description: "Stunning digital creations and abstract 3D artwork",
    image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8M2QlMjByZW5kZXJ8ZW58MHx8MHx8fDA%3D",
    category: "3d render"
  },
  {
    id: 17,
    title: "Cinematic Stills",
    description: "Captivating images inspired by film and cinema",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmlsbXxlbnwwfHwwfHx8MA%3D%3D",
    category: "film"
  },
  {
    id: 18,
    title: "Wildlife Wonders",
    description: "Fascinating portraits and scenes of animals in their natural habitats",
    image: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5pbWFsfGVufDB8fDB8fHww",
    category: "animal"
  },
  {
    id: 19,
    title: "People & Portraits",
    description: "Compelling images capturing the diversity and essence of humanity",
    image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    category: "people"
  },
  {
    id: 20,
    title: "Architectural Marvels",
    description: "Stunning structures and innovative designs from around the world",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXJjaGl0ZWN0dXJlfGVufDB8fDB8fHww",
    category: "architecture"
  },
  {
    id: 21,
    title: "Culinary Delights",
    description: "Mouthwatering images of food and beverages from various cuisines",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZCUyMGFuZCUyMGRyaW5rc3xlbnwwfHwwfHx8MA%3D%3D",
    category: "food and drinks"
  },
  {
    id: 22,
    title: "Natural Wonders",
    description: "Awe-inspiring landscapes and natural phenomena",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlfGVufDB8fDB8fHww",
    category: "nature"
  },
  {
    id: 23,
    title: "Cubist Perspectives",
    description: "Revolutionary artworks that redefined visual representation",
    image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q3ViaXN0JTIwQXJ0fGVufDB8MXwwfHx8MA%3D%3D",
    category: "cubism"
  },
  {
    id: 24,
    title: "Macro Marvels",
    description: "Up-close and personal with the tiny wonders of our world",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjcm8lMjBwaG90b2dyYXBoeXxlbnwwfHwwfHx8MA%3D",
    category: "macro photography"
  },
  {
    id: 25,
    title: "Night Sky Wonders",
    description: "Captivating astrophotography showcasing the beauty of the cosmos",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXN0cm9waG90b2dyYXBoeXxlbnwwfHwwfHx8MA%3D",
    category: "astrophotography"
  },
  {
    id: 26,
    title: "Art Deco Glamour",
    description: "Sleek and sophisticated designs from the Art Deco era",
    image: "https://images.unsplash.com/photo-1579541814924-49fef17c5be5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QXJ0JTIwRGVjbyUyMEdsYW1vdXJ8ZW58MHx8MHx8fDA%3D",
    category: "art deco"
  },
  {
    id: 27,
    title: "Underwater Realm",
    description: "Mesmerizing photographs of marine life and underwater landscapes",
    image: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dW5kZXJ3YXRlciUyMHBob3RvZ3JhcGh5fGVufDB8fDB8fHww",
    category: "underwater photography"
  },
  {
    id: 28,
    title: "Op Art Illusions",
    description: "Visual art that creates optical illusions and movement",
    image: "https://images.unsplash.com/photo-1577083165350-16c9f88b4a25?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fE9wJTIwQXJ0JTIwSWxsdXNpb25zfGVufDB8fDB8fHww",
    category: "op art"
  },
  {
    id: 29,
    title: "Culinary Delights",
    description: "Mouth-watering food photography that's a feast for the eyes",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZCUyMHBob3RvZ3JhcGh5fGVufDB8fDB8fHww",
    category: "food photography"
  },
  {
    id: 30,
    title: "Fauvism's Bold Colors",
    description: "Vivid and expressive use of color in early 20th-century art",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RmF1dmlzbXxlbnwwfDF8MHx8fDA%3D",
    category: "fauvism"
  },
  {
    id: 31,
    title: "Fashion Forward",
    description: "Striking fashion photography showcasing style and creativity",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZhc2hpb24lMjBwaG90b2dyYXBoeXxlbnwwfHwwfHx8MA%3D",
    category: "fashion photography"
  },
  {
    id: 32,
    title: "Impressionist Landscapes",
    description: "Breathtaking landscapes inspired by the Impressionist movement",
    image: "https://images.unsplash.com/photo-1620031618014-31ef64d42589?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SW1wcmVzc2lvbmlzdCUyMExhbmRzY2FwZXN8ZW58MHx8MHx8fDA%3D",
    category: "impressionism"
  },
  {
    id: 33,
    title: "Rococo Elegance",
    description: "Ornate and playful artworks from the Rococo period",
    image: "https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Um9jb2NvfGVufDB8MXwwfHx8MA%3D%3D",
    category: "rococo art"
  },
  {
    id: 34,
    title: "Architectural Marvels",
    description: "Stunning photographs showcasing remarkable buildings and structures",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJjaGl0ZWN0dXJhbCUyMHBob3RvZ3JhcGh5fGVufDB8fDB8fHww",
    category: "architectural photography"
  },
  {
    id: 35,
    title: "Pointillism Precision",
    description: "Intricate artworks created through the technique of pointillism",
    image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UG9pbnRpbGxpc218ZW58MHwxfDB8fHww",
    category: "pointillism"
  },
  {
    id: 36,
    title: "Drone Perspectives",
    description: "Breathtaking aerial photographs captured by drones",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJvbmUlMjBwaG90b2dyYXBoeXxlbnwwfHwwfHx8MA%3D",
    category: "drone photography"
  },
  {
    id: 37,
    title: "Art Nouveau Curves",
    description: "Graceful and organic designs from the Art Nouveau movement",
    image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEFydCUyME5vdXZlYXUlMjBDdXJ2ZXN8ZW58MHx8MHx8fDA%3D",
    category: "art nouveau"
  },
  {
    id: 38,
    title: "Black and White Elegance",
    description: "Powerful monochrome photographs capturing light and shadow",
    image: "https://images.unsplash.com/photo-1502872364588-894d7d6ddfab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxhY2slMjBhbmQlMjB3aGl0ZSUyMHBob3RvZ3JhcGh5fGVufDB8fDB8fHww",
    category: "black and white photography"
  },
  {
    id: 39,
    title: "Bauhaus Design",
    description: "Influential works from the Bauhaus school of design",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmF1aGF1c3xlbnwwfDF8MHx8fDA%3D",
    category: "bauhaus"
  },
  {
    id: 40,
    title: "Long Exposure Magic",
    description: "Captivating photographs using long exposure techniques",
    image: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9uZyUyMGV4cG9zdXJlfGVufDB8fDB8fHww",
    category: "long exposure photography"
  },
  {
    id: 41,
    title: "Tilt-Shift Miniatures",
    description: "Photographs using tilt-shift technique to create miniature-like scenes",
    image: "https://images.unsplash.com/photo-1508766206392-8bd5cf550d1c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGlsdCUyMHNoaWZ0fGVufDB8fDB8fHww",
    category: "tilt-shift photography"
  },
];

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

const CollectionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[bg-[#ECE8E2]] to-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-serif mb-12 text-center text-red-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Collections
        </motion.h1>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {collections.map(collection => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export { collections };
export default CollectionPage;