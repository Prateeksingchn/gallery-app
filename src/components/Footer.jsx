import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Footer = () => {
  const [email, setEmail] = useState('');
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed with email:', email);
    setEmail('');
  };

  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  return (
    <footer className="bg-white text-black w-full">
      {/* Contact Section */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-10 w-full h-auto pb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ... (rest of the footer content) ... */}
        </div>
      </motion.div>

      {/* Bottom Footer */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: 0.2,
          },
        }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-[#F8D347] pt-12 w-full h-[350px] overflow-hidden flex items-end justify-center"
      >
        <div className="container mx-auto px-4 flex items-end justify-center overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: 0.4,
              },
            }}
            exit={{ opacity: 0, y: 100 }}
            className="text-[70px] md:text-[16rem] lg:text-[20rem] lg:leading-[14rem] md:leading-[210px] mt-4 lg:tracking-[-0.07em] font-bold font-[roboto]"
          >
            PixelPerfect
          </motion.h1>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;