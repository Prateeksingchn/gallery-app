import React from "react";
import { motion } from "framer-motion";

const AboutContent = ({ aboutRef }) => {
  const topImages = [
    "/images/gal14.png",
    "/images/gal12.png",
    "/images/gal13.png",
  ];
  const bottomImages = [
    "/images/gal4.png",
    "/images/gal5.png",
    "/images/gal15.png",
  ];

  return (
    <motion.div
      ref={aboutRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="mb-16 relative pt-16 md:pt-20"
      id="about"
    >
      <h2 className="text-5xl md:text-5xl lg:text-7xl mb-8 md:mb-14 italic pl-4 font-[Pacifico] text-center md:text-left">
        About Us
      </h2>

      <div className="flex flex-col-reverse gap-0 md:gap-10 lg:gap-0 lg:flex-row mb-12 md:mb-0 px-4 md:px-8">
        <div className="w-full lg:w-1/2 pr-0 lg:pr-12 xl:pr-24 mt-8 lg:mt-0">
          <p className="text-gray-300 mb-6 text-lg md:text-xl font-[Roboto]">
            At PixelPerfect Gallery, we've crafted a unique space where
            technology and creativity converge. Our platform harnesses the
            power of the Unsplash API to curate an ever-evolving collection
            of exceptional photographs. From awe-inspiring landscapes and
            candid street scenes to abstract art and intimate portraits, our
            gallery spans the full spectrum of photographic expression.
          </p>
          <p className="text-gray-300 mb-6 text-lg md:text-xl font-[Roboto]">
            What sets us apart is our commitment to showcasing both
            established masters and emerging talents. Our AI-driven curation
            ensures that each visit to PixelPerfect offers a fresh
            perspective, adapting to current trends and personal
            preferences.
          </p>
        </div>
        <div className="w-full lg:w-1/2 relative h-[300px] md:h-[400px] lg:h-[470px] ">
          {topImages.map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt={`Gallery showcase ${index + 1}`}
              className="absolute object-cover rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.2 }}
              style={{
                ...(index === 0 && {
                  top: "0%",
                  left: "0%",
                  width: "60%",
                  height: "70%",
                }),
                ...(index === 1 && {
                  top: "10%",
                  right: "0%",
                  width: "50%",
                  height: "60%",
                }),
                ...(index === 2 && {
                  bottom: "0%",
                  left: "16%",
                  width: "60%",
                  height: "65%",
                }),
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col  gap-0 md:gap-10 lg:gap-0 lg:flex-row pt-12 md:pt-20 px-4 md:px-8">
        <div className="w-full lg:w-1/2 relative h-[300px] md:h-[400px] lg:h-[470px] mb-8 lg:mb-0">
          {bottomImages.map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt={`Gallery showcase ${index + 4}`}
              className="absolute object-cover rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 + index * 0.2 }}
              style={{
                ...(index === 0 && {
                  top: "0%",
                  left: "0%",
                  width: "60%",
                  height: "60%",
                }),
                ...(index === 1 && {
                  top: "20%",
                  right: "0%",
                  width: "50%",
                  height: "70%",
                }),
                ...(index === 2 && {
                  bottom: "0%",
                  left: "16%",
                  width: "60%",
                  height: "63%",
                }),
              }}
            />
          ))}
        </div>
        <div className="w-full lg:w-1/2 pl-0 lg:pl-12 xl:pl-24">
          <p className="text-gray-300 mb-6 text-lg md:text-xl font-[Roboto]">
            We're thrilled to announce that we're pushing the boundaries of
            creativity even further. Currently in development is our
            groundbreaking AI image generation feature. This innovative tool
            will allow users to create unique, stunning visuals based on
            textual descriptions or style preferences.
          </p>
          <p className="text-gray-300 mb-6 text-lg md:text-xl font-[Roboto]">
            Join us in celebrating the democratization of photography and
            the future of digital art. At PixelPerfect, every frame tells a
            story, every image opens a window to new worlds, and soon, your
            imagination will be the only limit to the visuals you can
            create.
          </p>
          <p className="text-gray-300 mb-6 text-lg md:text-xl font-[Roboto]">
            Step into our gallery and rediscover the power of visual
            storytelling in the digital age, where curation meets creation.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutContent;