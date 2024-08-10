import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutIntroSection = ({ backgroundImageUrl, scrollToAbout }) => {
  return (
    <div
      className="h-[550px] md:h-[850px] lg:h-[900px] xl:h-screen bg-cover bg-center flex flex-col justify-center items-start px-4 md:px-7 lg:px-16 pt-32 md:pt-[100px] lg:pt-0"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-16 max-w-2xl"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl mb-4 font-bold text-zinc-700 font-[Kalnia]">
          PixelPerfect
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-6xl mb-8 text-zinc-700 opacity-90 font-[pacifico]">
          Gallery
        </h2>
        <p className="text-xl mb-8 text-black opacity-80 font-[roboto] hidden md:block lg:block xl:block">
          Welcome to PixelPerfect Gallery, where art meets technology. We’re
          reimagining how you experience photography online, bringing together a
          world of visual inspiration from the vast Unsplash library. Embark on
          a journey that will transform your perception of digital imagery.
        </p>
        <p className="text-lg mb-8 text-black opacity-80 font-[roboto] block md:hidden lg:hidden xl:hidden">
          Welcome to PixelPerfect Gallery, where art meets technology. We're
          reimagining the way you experience photography online.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/gallery"
            className="bg-white text-black px-3 md:px-5 lg:px-8 py-2 lg:py-3 text-[14px] md:text-lg lg:text-lg font-normal md:font-semibold lg:font-semibold rounded-md hover:bg-gray-200 transition-colors duration-300 hover:bg-transparent hover:border-2 hover:border-white hover:text-white font-[Kalnia]"
          >
            EXPLORE NOW
          </Link>
          <button
            onClick={scrollToAbout}
            className="border-2 border-white text-white px-3 md:px-5 lg:px-8 py-2 lg:py-3 text-[14px] md:text-lg lg:text-lg font-normal md:font-semibold lg:font-semibold rounded-md hover:bg-white hover:text-black transition-colors duration-300 font-[Kalnia]"
          >
            LEARN MORE
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutIntroSection;
