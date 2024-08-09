import React from "react";
import { motion } from "framer-motion";

const CollectionIntro = ({ scrollToSection }) => {
  const backgroundImageUrl = "/images/colb12.jpg";

  return (
    <div className="bg-black text-white h-[370px] md:h-[680px] lg:min-h-screen font-serif">
      <div
        className="h-[370px] md:h-[680px] lg:h-screen bg-cover bg-center flex flex-col justify-center items-start px-10 md:px-20 lg:px-20 py-2"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-16 max-w-2xl mt-[120px] md:mt-[180px] lg:mt-[155px]"
        >
          <h1 className="text-4xl md:text-7xl lg:text-8xl mb-3 font-bold text-zinc-700 font-[kalnia]">
            Curated
          </h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl mb-4 text-zinc-700 opacity-90 font-[pacifico]">
            Collections
          </h2>
          <p className="text-sm md:text-lg lg:text-xl mb-2 hidden md:block lg:block xl:block text-black opacity-80 w-[250px] md:w-[450px] lg:w-[710px] font-[roboto]">
            Discover our carefully curated collections, each telling a unique
            visual story. From breathtaking landscapes to cutting-edge digital
            art, our collections showcase the diversity and beauty of visual
            creativity. Immerse yourself in these thematic galleries, expertly
            crafted to inspire, challenge, and delight your senses.
          </p>
          <p className="text-sm md:text-lg lg:text-xl mb-2 block md:hidden lg:hidden xl:hidden text-black opacity-80 w-[250px] md:w-[450px] lg:w-[710px] font-[roboto]">
            Discover our carefully curated collections, each telling a unique
            visual story.
          </p>
          <div className="flex space-x-8">
            <button
              onClick={() => scrollToSection("about-curation")}
              className="bg-white text-black border-2 border-zinc-400 px-2 py-1 md:px-4 md:py-2 lg:px-8 lg:py-3 text-sm md:text-[16px] lg:text-lg font-semibold rounded-md transition-colors duration-300 hover:bg-transparent hover:border-2 hover:border-white hover:text-white font-[Kalnia] "
            >
              View Collections
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CollectionIntro;