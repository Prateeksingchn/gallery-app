import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Github, Linkedin } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const API_URL = "https://api.unsplash.com/photos/random";

const SocialLink = ({ Icon, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition-colors duration-300"
  >
    <Icon size={24} aria-label={label} />
  </a>
);

const MarqueeImages = ({ direction = "left" }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            count: 20, // Increased number of images
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
    <div className="overflow-hidden my-12">
      <motion.div
        className="flex"
        animate={{
          x: direction === "left" ? [0, -3840] : [0, 3840],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 80, // Slower animation for smoother effect
            ease: "linear",
          },
        }}
      >
        {[...images, ...images].map((img, i) => ( // Duplicate images for seamless loop
          <img
            key={i}
            src={img}
            alt={`Gallery image ${i}`}
            className="w-[300px] h-[200px] object-cover" // Removed rounded corners and shadow
          />
        ))}
      </motion.div>
    </div>
  );
};

const AboutUs = () => {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            count: 3,
            client_id: API_KEY,
          },
        });
        setGalleryImages(response.data.map((img) => img.urls.regular));
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      }
    };

    fetchGalleryImages();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <h1 className="text-8xl font-serif mb-4">PixelPerfect</h1>
          <h2 className="text-6xl font-serif mb-8">Gallery</h2>
          <Link to={"/gallery"} className="bg-white text-black px-6 py-2 text-lg font-semibold">
            EXPLORE NOW
          </Link>
        </motion.div>
        
        <MarqueeImages direction="left" />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-16"
        >
          <h2 className="text-5xl font-serif mb-8">About exhibition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-300 mb-4">
                PixelPerfect Gallery is your gateway to a world of stunning visuals. We curate and showcase the best photography from around the globe, inspiring creativity and connection.
              </p>
              <p className="text-gray-300">
                Powered by the Unsplash API, our gallery offers an ever-changing array of high-quality images from talented photographers worldwide. Explore, discover, and get inspired by the beauty captured through their lenses.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {galleryImages.map((img, index) => (
                <img key={index} src={img} alt={`Gallery showcase ${index + 1}`} className="w-full h-full object-cover" />
              ))}
            </div>
          </div>
        </motion.div>
        
        <MarqueeImages direction="right" />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16"
        >
          <h2 className="text-4xl font-serif mb-4">Connect with the Creator</h2>
          <div className="flex space-x-4">
            <SocialLink Icon={Instagram} href="https://instagram.com/your_handle" label="Instagram" />
            <SocialLink Icon={Twitter} href="https://twitter.com/your_handle" label="Twitter" />
            <SocialLink Icon={Github} href="https://github.com/your_handle" label="GitHub" />
            <SocialLink Icon={Linkedin} href="https://linkedin.com/in/your_profile" label="LinkedIn" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;