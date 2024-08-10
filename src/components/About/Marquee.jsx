import React from "react";
import { motion } from "framer-motion";

const Marquee = ({ direction = "left" }) => {
  const localImages = [
    "/images/marq1.png",
    "/images/marq2.png",
    "/images/marq3.png",
    "/images/marq4.png",
    "/images/marq5.png",
    "/images/marq6.png",
    "/images/marq7.png",
    "/images/marq8.png",
    "/images/marq9.png",
    "/images/marq10.png",
    "/images/marq11.png",
    "/images/marq12.png",
    "/images/marq13.png",
    "/images/marq14.png",
    "/images/marq15.png",
    "/images/marq16.png",
    "/images/marq17.png",
  ];

  return (
    <div className="overflow-hidden my-0 md:my-12 lg:my-20 w-full">
      <motion.div
        className="flex"
        animate={{
          x: direction === "left" ? [0, -1920] : [-1920, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 60,
            ease: "linear",
          },
        }}
      >
        {[...localImages, ...localImages].map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Gallery image ${i}`}
            className="w-[250px] h-[180px] md:w-[270px] md:h-[270px] lg:w-[300px] lg:h-[225px] object-cover"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;