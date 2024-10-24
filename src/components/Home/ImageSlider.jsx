import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";


// ... (the images array of objects) ...
const images = [
  {
    src: "https://images.unsplash.com/photo-1716220902614-cbe6d1d9af09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fENpdHlzY2FwZXxlbnwwfDF8MHx8fDA%3D",
    alt: "Urban Landscape",
    title: "Cityscape",
    subtitle: "by John Doe",
  },
  {
    src: "https://images.unsplash.com/photo-1655821685343-24e8bc18a472?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGFydCUyMGdhbGxlcnl8ZW58MHwxfDB8fHww",
    alt: "Nature Close-up",
    title: "Macro Beauty",
    subtitle: "by Jane Smith",
  },
  {
    src: "https://images.unsplash.com/photo-1610589672715-28289f2165d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGFydCUyMGdhbGxlcnl8ZW58MHwxfDB8fHww",
    alt: "Abstract Art",
    title: "Colors in Motion",
    subtitle: "by Alex Johnson",
  },
  {
    src: "https://images.unsplash.com/photo-1534759846116-5799c33ce22a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U2FmYXJpJTIwTW9tZW50c3xlbnwwfDF8MHx8fDA%3D",
    alt: "Wildlife Photography",
    title: "Safari Moments",
    subtitle: "by Emily Brown",
  },
  {
    src: "https://images.unsplash.com/photo-1650835222564-c869b03803ac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFydCUyMGdhbGxlcnl8ZW58MHwxfDB8fHww",
    alt: "Travel Photography",
    title: "Wanderlust",
    subtitle: "by Mike Wilson",
  },
  {
    src: "https://images.unsplash.com/photo-1701887138421-0245712e17e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fEN1bGluYXJ5JTIwRGVsaWdodHN8ZW58MHwxfDB8fHww",
    alt: "Food Photography",
    title: "Culinary Delights",
    subtitle: "by Sarah Lee",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1706571538368-4704e56ceba9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGFydCUyMGdhbGxlcnl8ZW58MHwxfDB8fHww",
    alt: "Street Photography",
    title: "Urban Stories",
    subtitle: "by Chris Taylor",
  },
  {
    src: "https://images.unsplash.com/photo-1579473755852-abe535c52ff0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFN0eWxlJTIwaW4lMjBGb2N1c3xlbnwwfDF8MHx8fDA%3D",
    alt: "Fashion Photography",
    title: "Style in Focus",
    subtitle: "by Olivia Green",
  },
  {
    src: "https://images.unsplash.com/photo-1518866586318-bbe74635b749?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE5hdHVyYWwlMjBXb25kZXJzfGVufDB8MXwwfHx8MA%3D%3D",
    alt: "Landscape Photography",
    title: "Natural Wonders",
    subtitle: "by David Clark",
  },
  {
    src: "https://images.unsplash.com/photo-1602655437679-72db5aa284d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXJ0JTIwZ2FsbGVyeXxlbnwwfDF8MHx8fDA%3D",
    alt: "Paintings and Drawings",
    title: "Abstract Artwork",
    subtitle: "by Laura White",
  },
  {
    src: "https://images.unsplash.com/photo-1515733392795-4fbb2be3d1dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8QXJjaGl0ZWN0dXJhbCUyMFBob3RvZ3JhcGh5fGVufDB8MXwwfHx8MA%3D%3D",
    alt: "Architectural Photography",
    title: "Modern Structures",
    subtitle: "by James Adams",
  },
  {
    src: "https://images.unsplash.com/photo-1682687982141-0143020ed57a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VW5kZXJ3YXRlciUyMFBob3RvZ3JhcGh5fGVufDB8MXwwfHx8MA%3D%3D",
    alt: "Underwater Photography",
    title: "Ocean Life",
    subtitle: "by Megan Carter",
  },
  {
    src: "https://images.unsplash.com/photo-1554743847-2604e27f3dd9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fE5pZ2h0JTIwUGhvdG9ncmFwaHl8ZW58MHwxfDB8fHww",
    alt: "Night Photography",
    title: "Starry Skies",
    subtitle: "by Lisa Brown",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1664369473396-15d857cf5e4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fFBvcnRyYWl0JTIwUGhvdG9ncmFwaHl8ZW58MHwxfDB8fHww",
    alt: "Portrait Photography",
    title: "Faces of the World",
    subtitle: "by Tom Harris",
  },
  {
    src: "https://images.unsplash.com/photo-1659984247582-7c342fc35203?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fERyb25lJTIwUGhvdG9ncmFwaHl8ZW58MHwxfDB8fHww",
    alt: "Drone Photography",
    title: "Aerial Views",
    subtitle: "by Sophia Davis",
  }
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextImage = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const currentImage = images[currentIndex];
  const nextImageIndex = (currentIndex + 1) % images.length;

  return (
    <div className="w-full lg:h-[100vh] sm:h-[870px] h-[850px] md:h-[900px] relative bg-[#f0f0f0] rounded-b-[10px]">
      <div className="w-full h-screen flex flex-col px-2 sm:px-6 lg:px-10 md:px-10">
        <div className="flex-1 flex lg:flex-row flex-row py-10 relative">
          {/* Left Side: Image Info */}
          <motion.div 
          className="lg:w-[35%] absolute left-0 top-10 lg:left-8 lg:top-44 md:left-0 md:top-10 lg:pl-10 pl-1 lg:pr-0 pr-1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl lg:text-4xl font-sans font-bold text-gray-800">{currentImage.title}</h2>
                <h3 className="text-lg lg:text-xl font-sans mt-0 lg:mt-2 text-gray-600">{currentImage.subtitle}</h3>
                <p className="mt-2 lg:mt-4 text-sm text-gray-500">Powered by Unsplash API</p>
                <div className="mt-4 lg:mt-6 space-y-4">
                  <p className="text-sm lg:text-lg text-gray-700">
                    Explore our curated collection of stunning images from talented photographers around the world. Each photo tells a unique story and captures a moment in time.
                  </p>
                  <p className="text-sm lg:text-lg text-gray-700">
                    Whether you're looking for inspiration, searching for the perfect image for your project, or just browsing beautiful photography, our gallery has something for everyone.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          
          {/* Right Side: Image Slider */}
          <div className="lg:w-[70%] md:w-[100%] w-[100%] lg:h-full h-[900px]  relative flex items-center justify-center lg:space-x-4 space-x-0  overflow-hidden ml-auto">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentIndex}
                src={currentImage.src}
                alt={currentImage.alt}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="lg:w-[45%] lg:h-[95%] md:w-[55%] md:h-[60%] sm:w-[55%] sm:h-[55%] w-[80%] h-[40%] object-cover absolute lg:bottom-4 lg:left-[30%] md:bottom-24 md:right-64 sm:bottom-36 sm:right-64 bottom-44 left-0 shadow-lg rounded-lg"
              />
            </AnimatePresence>
            <motion.img
              src={images[nextImageIndex].src}
              alt={images[nextImageIndex].alt}
              className="lg:w-[40%] lg:h-[80%] md:w-[55%] md:h-[53%] sm:w-[55%] sm:h-[51%] w-[55%] h-[35%] object-cover filter grayscale absolute lg:top-16 lg:right-0 md:right-10 md:bottom-32 sm:bottom-40 sm:right-0 bottom-48 right-0 rounded-lg"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute lg:bottom-3 lg:right-20 md:bottom-[5rem] md:right-24 sm:bottom-28 sm:right-12 bottom-32 right-14 flex items-center space-x-4 lg:scale-100 md:scale-125 scale-125">
              <button
                onClick={prevImage}
                className="bg-transparent text-gray-800 hover:text-gray-600 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="text-lg text-gray-600">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </div>
              <button
                onClick={nextImage}
                className="bg-transparent text-gray-800 hover:text-gray-600 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
