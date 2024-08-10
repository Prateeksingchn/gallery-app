import React from "react";
import { motion } from "framer-motion";
import { Instagram, Twitter, Github, Linkedin } from "lucide-react";

const SocialLink = ({ Icon, href, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition-colors duration-300"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon size={28} aria-label={label} />
  </motion.a>
);

const AboutCreator = ({ creatorImagePlaceholder }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full mt-10 lg:mt-32 px-4 flex flex-col lg:flex-row items-center lg:items-start space-y-12 lg:space-y-10 pb-2 md:pb-10 lg:pb-10 lg:space-x-16"
    >
      <motion.div
        className="lg:w-2/5 flex justify-center"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <img
          src={creatorImagePlaceholder}
          alt="Prateek Singh Chouhan"
          className="w-[370px] h-[370px] md:w-[400px] md:h-[400px] lg:w-[370px] lg:h-[370px] object-cover object-center rounded-[50px] shadow-2xl mt-14"
        />
      </motion.div>

      <motion.div
        className="lg:w-3/5"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2 className="text-5xl font-bold mb-8 text-white font-[Pacifico]">
          About the Creator
        </h2>
        <motion.p
          className="text-gray-300 text-lg md:text-xl lg:text-xl mb-6 leading-relaxed font-[Roboto]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Hello! I'm Prateek Singh Chouhan, a 4th year B.Tech student from
          Bhopal, India. As a passionate digital designer and developer,
          I've created PixelPerfect Gallery to showcase the beauty of visual
          storytelling.
        </motion.p>
        <motion.p
          className="text-gray-300 text-xl mb-6 leading-relaxed font-[Roboto]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          My expertise lies in crafting distinctive visual identities for
          digital products. Through this gallery, I aim to blend my
          technical skills with my love for aesthetics, creating an
          immersive experience for art enthusiasts and casual browsers
          alike.
        </motion.p>
        <motion.p
          className="text-gray-300 text-xl mb-8 leading-relaxed font-[Roboto]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          As a digital designer, my goal is to push the boundaries of what's
          possible in web design, always striving to create interfaces that
          are both beautiful and functional. PixelPerfect Gallery is a
          testament to this vision, offering a seamless blend of technology
          and art.
        </motion.p>
        <motion.div
          className="flex space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <SocialLink
            Icon={Instagram}
            href="https://www.instagram.com/__.prateeeeek.__/"
            label="Instagram"
          />
          <SocialLink
            Icon={Twitter}
            href="https://x.com/Prateeeeek_"
            label="Twitter"
          />
          <SocialLink
            Icon={Github}
            href="https://github.com/Prateeksingchn"
            label="GitHub"
          />
          <SocialLink
            Icon={Linkedin}
            href="https://www.linkedin.com/in/prateek-singh-chouhan-654486243/"
            label="LinkedIn"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AboutCreator;