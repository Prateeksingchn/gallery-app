// src/pages/Gallery/ImageCard.jsx
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const ImageCard = ({ image, span }) => {
  const cardControls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      cardControls.start("visible");
    }
  }, [cardControls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={cardControls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        hidden: { opacity: 0, scale: 0.9 },
      }}
      className={`${span} relative overflow-hidden rounded-lg shadow-lg cursor-pointer`}
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
        <p className="text-white text-xs">Photo by {image.user.name}</p>
      </div>
    </motion.div>
  );
};

export default ImageCard;
