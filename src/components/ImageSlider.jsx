import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    {
      src: "https://images.unsplash.com/photo-1512540452972-baac55d40ef1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXJ0JTIwZ2FsbGVyeXxlbnwwfDF8MHx8fDA%3D",
      alt: "Art Gallery 1",
      title: "Federico Cina",
      subtitle: "A Emilia",
    },
    {
      src: "https://images.unsplash.com/photo-1655821685343-24e8bc18a472?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGFydCUyMGdhbGxlcnl8ZW58MHwxfDB8fHww",
      alt: "Art Gallery 2",
      title: "Another Artist",
      subtitle: "Another Work",
    },
    {
      src: "https://images.unsplash.com/photo-1610589672715-28289f2165d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGFydCUyMGdhbGxlcnl8ZW58MHwxfDB8fHww",
      alt: "Art Gallery 3",
      title: "Third Exhibition",
      subtitle: "Artwork Title",
    },
    {
      src: "https://images.unsplash.com/photo-1641766860997-53f4b4a68d23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFydCUyMGdhbGxlcnl8ZW58MHwxfDB8fHww",
      alt: "Modern Art Installation",
      title: "Emma Johnson",
      subtitle: "Reflections in Time",
    },
    {
      src: "https://images.unsplash.com/photo-1650835222564-c869b03803ac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFydCUyMGdhbGxlcnl8ZW58MHwxfDB8fHww",
      alt: "Abstract Sculpture",
      title: "Michael Chen",
      subtitle: "Echoes of Eternity",
    },
    {
      src: "https://images.unsplash.com/photo-1602655437679-72db5aa284d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXJ0JTIwZ2FsbGVyeXxlbnwwfDF8MHx8fDA%3D",
      alt: "Digital Art Display",
      title: "Sophia Rodriguez",
      subtitle: "Virtual Visions",
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1706571538368-4704e56ceba9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGFydCUyMGdhbGxlcnl8ZW58MHwxfDB8fHww",
      alt: "Photography Exhibition",
      title: "David Lee",
      subtitle: "Moments in Motion",
    },
    {
      src: "https://images.unsplash.com/photo-1608526555031-114086e4fcdf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGFydCUyMGdhbGxlcnl8ZW58MHwxfDB8fHww",
      alt: "Interactive Art Installation",
      title: "Olivia Taylor",
      subtitle: "Touch of Imagination",
    },
    {
      src: "https://images.unsplash.com/photo-1675540827981-17f83ae8bc3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGFydCUyMGdhbGxlcnl8ZW58MHwxfDB8fHww",
      alt: "Surrealist Painting Collection",
      title: "Alexandre Dupont",
      subtitle: "Dreams Unbound",
    },
    {
      src: "https://images.unsplash.com/photo-1541861534-9ec15bf2c1c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGFydCUyMGdhbGxlcnl8ZW58MHwxfDB8fHww",
      alt: "Minimalist Sculpture Garden",
      title: "Yuki Tanaka",
      subtitle: "Essence of Form",
    },
  ];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 500 : -500,
    opacity: 0,
    scale: 0.8,
  }),
};

const ImageSlider = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = Math.abs(page % images.length);
  const nextImageIndex = (imageIndex + 1) % images.length;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="w-full h-[95vh] bg-[#afada9] flex flex-col px-10">
      <div className="flex-1 flex">
        <motion.div 
          className="w-[30%] relative p-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-40">
            <motion.h2 
              className="text-6xl font-serif"
              key={images[imageIndex].title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {images[imageIndex].title}
            </motion.h2>
            <motion.h3 
              className="text-2xl font-serif mt-2"
              key={images[imageIndex].subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {images[imageIndex].subtitle}
            </motion.h3>
          </div>
        </motion.div>
        
        <div className="w-[70%] relative flex items-center justify-center space-x-4 overflow-hidden px-20">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={page}
              src={images[imageIndex].src}
              alt={images[imageIndex].alt}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.6 },
                scale: { duration: 0.5 },
              }}
              className="w-[40%] h-[85%] object-cover absolute "
            />
          </AnimatePresence>
          <motion.img
            src={images[nextImageIndex].src}
            alt={images[nextImageIndex].alt}
            className="w-[35%] h-[60%] object-cover filter grayscale absolute right-0"
            initial={{ x: 500, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          <div className="absolute bottom-8 right-8 flex items-center space-x-4">
            <button
              onClick={() => paginate(-1)}
              className="bg-transparent text-black hover:text-gray-700 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="text-sm">
              {String(imageIndex + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </div>
            <button
              onClick={() => paginate(1)}
              className="bg-transparent text-black hover:text-gray-700 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;