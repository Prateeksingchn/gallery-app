import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Import your local images
import image1 from '/images/bg8.jpg';
import image2 from '/images/marq16.png';
import image3 from '/images/bg11.jpg';
import image4 from '/images/gal10.png';

const featuredImages = [
  { id: 1, src: image1, alt: "Description of image 1" },
  { id: 2, src: image2, alt: "Description of image 2" },
  { id: 3, src: image3, alt: "Description of image 3" },
  { id: 4, src: image4, alt: "Description of image 4" },
];

const GalleryIntroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const imageTransforms = [
    useTransform(scrollYProgress, [0, 1], [0, -100]),
    useTransform(scrollYProgress, [0, 1], [0, 100]),
    useTransform(scrollYProgress, [0, 1], [0, -100]),
    useTransform(scrollYProgress, [0, 1], [0, 100])
  ];

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

        {featuredImages.map((image, index) => (
          <motion.div
            key={image.id}
            className="absolute"
            style={{
              top: `${[20, 10, 72, 43][index]}%`,
              left: `${[3, 54, 39, 82][index]}%`,
              width: `${[20, 20, 17, 15][index]}%`,
              height: `${[65, 25, 20, 40][index]}%`,
              zIndex: index === 0 ? 5 : index + 10,
              y: imageTransforms[index],
              scale: imageScales[index],
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-sm shadow-xl"
            />
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default GalleryIntroSection;