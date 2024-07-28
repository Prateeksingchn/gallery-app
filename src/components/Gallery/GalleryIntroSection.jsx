// src/pages/Gallery/GalleryIntroSection.jsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const GalleryIntroSection = ({ featuredImages }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const imageTransforms = featuredImages.map((_, index) =>
    useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -100 : 100])
  );

  const imageScales = imageTransforms.map(() =>
    useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1])
  );

  return (
    <div className="min-h-screen w-full" ref={sectionRef}>
      <section className="h-screen w-full bg-[#ECE8E2] relative overflow-hidden">
        <motion.h1
          style={{ opacity, scale }}
          className="absolute inset-0 flex items-center justify-center text-[17vw] font-[kalnia] font-normal tracking-wide leading-none text-red-600 z-10"
        >
          Gallery
        </motion.h1>

        {featuredImages.slice(0, 4).map((image, index) => (
          <motion.div
            key={image.id}
            className="absolute"
            style={{
              top: `${[20, 10, 73, 48][index]}%`,
              left: `${[3.5, 55, 40, 80][index]}%`,
              width: `${[23, 20, 17, 15][index]}%`,
              height: `${[65, 25, 20, 40][index]}%`,
              zIndex: index === 0 ? 5 : index + 10,
              y: imageTransforms[index],
              scale: imageScales[index],
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={image.urls.regular}
              alt={image.alt_description}
              className="w-full h-full object-cover rounded-sm shadow-xl"
            />
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default GalleryIntroSection;
