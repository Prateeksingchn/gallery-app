import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Instagram, Twitter, Github, Linkedin, Mail } from "lucide-react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const API_URL = "https://api.unsplash.com/photos/random";

const FeatureCard = ({ title, description, icon }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center space-x-4 pb-2">
      <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const MarqueeImages = ({ direction = "left" }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            count: 8,
            client_id: API_KEY,
          },
        });
        setImages(response.data.map((img) => img.urls.regular));
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div
      className={`flex overflow-hidden ${
        direction === "left" ? "" : "flex-row-reverse"
      } transform rotate-[3deg] `}
    >
      <motion.div
        className="flex space-x-4 py-3 "
        animate={{
          x: direction === "left" ? [0, -1920] : [0, 1920],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          },
        }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Gallery image ${i}`}
            className="w-[200px] h-[200px] object-cover rounded-lg shadow-md"
          />
        ))}
      </motion.div>
    </div>
  );
};

const SocialLink = ({ Icon, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
  >
    <Icon size={24} aria-label={label} />
  </a>
);

export default function About() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start({ rotate: 6, transition: { duration: 1 } });
    } else {
      controls.start({ rotate: 0, transition: { duration: 1 } });
    }
  }, [controls, inView]);

  const features = [
    {
      title: "Powered by Unsplash",
      description:
        "Access millions of high-quality images from talented photographers worldwide.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "AI Image Generation",
      description:
        "Create unique, AI-generated images with our cutting-edge technology.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Easy Sharing",
      description:
        "Share your favorite images across social media with just a click.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="px-4 py-16 bg-gray-100 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl font-bold mb-6 text-gray-800">
          PixelPerfect Gallery
        </h1>
        <p className="text-2xl font-semibold text-blue-600 mb-8">
          Bringing visions to life, one image at a time
        </p>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          PixelPerfect Gallery is your gateway to a world of stunning visuals.
          We curate and showcase the best photography from around the globe,
          inspiring creativity and connection.
        </p>
      </motion.div>

      <motion.div ref={ref} animate={controls} className="space-y-8">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-transparent z-10"></div>
          <MarqueeImages direction="left" />
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-100 to-transparent z-10"></div>
          <MarqueeImages direction="right" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16"
      >
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="bg-white p-8 rounded-lg shadow-xl text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Our Mission</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          We aim to inspire creativity and connect people through the power of
          visual imagery. Our platform is designed to make discovering,
          appreciating, and creating great photography accessible to everyone,
          fostering a global community of art enthusiasts and creators.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300">
          Start Exploring
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="bg-white p-8 rounded-lg shadow-xl"
      >
        <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">
          About the Creator
        </h2>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
          <img
            src="https://images.unsplash.com/photo-1548013146-72479768bada?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGluZGlhfGVufDB8fDB8fHww"
            alt="Prateek Singh Chouhan"
            className="w-48 h-48 rounded-full object-cover shadow-lg"
          />
          <div>
            <h3 className="text-2xl font-semibold mb-2">
              Prateek Singh Chouhan
            </h3>
            <p className="text-xl text-blue-600 mb-4">
              4th Year Engineering Student | Bhopal, India
            </p>
            <p className="text-gray-600 mb-4">
              Hello! I'm Prateek, the creator of PixelPerfect Gallery. As a
              passionate engineering student, I've combined my love for
              technology and visual arts to create this platform. My goal is to
              provide a space where people can explore, share, and create
              beautiful imagery, including AI-generated art. I believe in the
              power of images to inspire and connect people across the globe.
            </p>
            <div className="flex justify-center space-x-4 mb-4">
              <SocialLink
                Icon={Instagram}
                href="https://instagram.com/your_instagram"
                label="Instagram"
              />
              <SocialLink
                Icon={Twitter}
                href="https://twitter.com/your_twitter"
                label="Twitter"
              />
              <SocialLink
                Icon={Github}
                href="https://github.com/your_github"
                label="GitHub"
              />
              <SocialLink
                Icon={Linkedin}
                href="https://linkedin.com/in/your_linkedin"
                label="LinkedIn"
              />
              <SocialLink
                Icon={Mail}
                href="mailto:your.email@example.com"
                label="Email"
              />
            </div>
            <p className="text-gray-600 italic">
              "The art challenges the technology, and the technology inspires
              the art." - John Lasseter
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}