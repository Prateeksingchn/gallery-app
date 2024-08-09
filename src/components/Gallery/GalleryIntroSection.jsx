import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Import your local images
import image1 from "/images/bg8.jpg";
import image2 from "/images/marq16.png";
import image3 from "/images/bg11.jpg";
import image4 from "/images/gal10.png";

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
    useTransform(scrollYProgress, [0, 1], [0, 100]),
  ];

  const imageScales = imageTransforms.map(() =>
    useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1])
  );

  const imageClasses = [
    "top-[5%] md:top-[40%] lg:top-[20%] left-[1%] md:left-[3.5%] w-[30%] md:w-[20%] lg:w-[20%] h-[40%] md:h-[34%] lg:h-[65%]",
    "top-[5%] md:top-[20%] lg:top-[10%] left-[35%] md:left-[55%] lg:left-[54%] w-[30%] md:w-[20%] lg:w-[20%] h-[15%] md:h-[17%] lg:h-[25%]",
    "top-[50%] md:top-[68%] lg:top-[72%] left-[20%] md:left-[37%] lg:left-[39%] w-[25%] md:w-[20%] lg:w-[17%] h-[15%] md:h-[14%] lg:h-[20%]",
    "top-[25%] md:top-[41%] lg:top-[43%] left-[60%] md:left-[82%] lg:left-[82%] w-[25%] md:w-[15%] lg:w-[15%] h-[25%] md:h-[20%] lg:h-[40%]",
  ];

  return (
    <div
      className="h-[600px] md:h-[600px] lg:min-h-screen w-full"
      ref={sectionRef}
    >
      <section className="h-screen md:h-[750px] lg:min-h-screen w-full bg-[#ECE8E2] relative overflow-hidden">
        <motion.h1
          style={{ opacity, scale }}
          className="absolute inset-0 flex items-center justify-center text-[8vw] md:text-[18vw] lg:text-[17vw] font-[kalnia] font-normal tracking-wide leading-none text-red-600 z-10"
        >
          Gallery
        </motion.h1>

        {featuredImages.map((image, index) => (
          <motion.div
            key={image.id}
            className={`absolute ${imageClasses[index]}`}
            style={{
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
