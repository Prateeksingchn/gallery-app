import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Share, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeatureShowcase = () => {
  const sectionRef = useRef(null);
  const featureRefs = useRef([]);
  featureRefs.current = [];

  const backgroundImageUrl = "/images/fb1.png"; // Replace with your image path

  const addToRefs = (el) => {
    if (el && !featureRefs.current.includes(el)) {
      featureRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        featureRefs.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        ".feature-title",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
          },
        }
      );

      gsap.fromTo(
        ".cta-button",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".cta-button",
            start: 'top 90%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: Download, title: 'Download', description: 'Get high-quality images on your device' },
    { icon: Share, title: 'Share', description: 'Easily share images with friends and family' },
    { icon: Heart, title: 'Like', description: 'Show appreciation for your favorite images' },
  ];

  return (
    <section
      ref={sectionRef}
      className="text-gray-800 py-24 px-4 md:px-8 rounded-t-[50px] overflow-hidden relative z-30 lg:-mt-0 md:-mt-0 -mt-[100px]"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 mix-blend-overlay" />
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="feature-title text-5xl md:text-6xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          Unleash Your Creativity
        </h2>
        <p className="text-xl md:text-2xl text-center mb-16 text-white max-w-3xl mx-auto">
          Discover a world of possibilities with our feature-rich platform designed to inspire and empower your creative journey.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="flex flex-col items-center bg-white/10 px-6 py-5 rounded-2xl backdrop-blur-sm hover:bg-black/20 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div 
                className="bg-gradient-to-br from-pink-900 to-indigo-900 p-5 rounded-2xl mb-6 shadow-lg"
              >
                <feature.icon size={20} className="text-white" />
              </div>
              <h3 className="text-[20px] font-semibold mb-4 text-white">{feature.title}</h3>
              <p className="text-center text-sm text-white">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <button
            className="cta-button bg-gradient-to-r from-pink-500 to-indigo-500 px-10 py-4 rounded-full font-semibold text-xl text-white hover:from-pink-600 hover:to-indigo-600 transition duration-300 shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Start Creating Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;