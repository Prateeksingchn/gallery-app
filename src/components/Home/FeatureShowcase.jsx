import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Share, Heart, Image, Search, Tag } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FeatureShowcase = () => {
  const sectionRef = useRef(null);
  const featureCardRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Image,
      title: "High-Quality Images",
      description: "Access a vast library of stunning, high-resolution images",
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Find the perfect image with our AI-powered search engine",
    },
    {
      icon: Download,
      title: "Easy Downloads",
      description: "Download images in various sizes and formats with one click",
    },
    {
      icon: Share,
      title: "Instant Sharing",
      description: "Share your favorite images across social media platforms",
    },
    {
      icon: Tag,
      title: "Custom Collections",
      description: "Organize and tag images to create personalized collections",
    },
    {
      icon: Heart,
      title: "Favorites",
      description: "Save and like images to curate your personal inspiration board",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.to(featureCardRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => {
        gsap.to(featureCardRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
        });
      },
    });
  }, [activeFeature]);

  useEffect(() => {
    const svgs = document.querySelectorAll('.floating-svg');
    svgs.forEach((svg) => {
      gsap.to(svg, {
        x: "random(-50, 50)",
        y: "random(-50, 50)",
        rotation: "random(-30, 30)",
        duration: "random(5, 10)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#121212] text-white py-20 px-4 sm:px-6 md:px-12 overflow-hidden relative"
    >
      {/* Animated SVG backgrounds */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <svg 
            key={i} 
            className="floating-svg absolute" 
            viewBox="0 0 100 100" 
            width={`${Math.random() * 40 + 10}px`} 
            height={`${Math.random() * 40 + 10}px`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <circle cx="50" cy="50" r="30" fill={`url(#grad-${i})`} />
            <defs>
              <radialGradient id={`grad-${i}`}>
                <stop offset="0%" stopColor={`hsl(${Math.random() * 60 + 240}, 100%, 50%)`} />
                <stop offset="100%" stopColor={`hsl(${Math.random() * 60 + 300}, 100%, 50%)`} />
              </radialGradient>
            </defs>
          </svg>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center">
          Elevate Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Visual Experience</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-center mb-12 text-gray-300 max-w-3xl mx-auto">
          Discover powerful features designed to inspire your creativity.
        </p>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="w-full lg:w-1/2" ref={featureCardRef}>
            <div className="bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-2xl p-6 sm:p-8 transform transition-all duration-500 hover:bg-opacity-10 hover:scale-105 border border-white border-opacity-10">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-lg mr-4">
                  {React.createElement(features[activeFeature].icon, { size: 24, className: "text-white" })}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold">{features[activeFeature].title}</h3>
              </div>
              <p className="text-gray-300">{features[activeFeature].description}</p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 grid grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <button
                key={index}
                className={`p-4 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                  index === activeFeature
                    ? "bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg"
                    : "bg-white bg-opacity-5 hover:bg-opacity-10 border border-white border-opacity-10"
                }`}
                onClick={() => setActiveFeature(index)}
              >
                {React.createElement(feature.icon, { size: 24, className: "text-white mx-auto" })}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <button className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:from-purple-600 hover:to-pink-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 shadow-lg">
            Explore Gallery
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
