import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Save, Share, Heart, Camera, Tag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeatureShowcase = () => {
  const sectionRef = useRef(null);
  const featureRefs = useRef([]);
  featureRefs.current = [];

  const addToRefs = (el) => {
    if (el && !featureRefs.current.includes(el)) {
      featureRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        featureRefs.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: Save, title: 'Save', description: 'Store images in your personal collection' },
    { icon: Download, title: 'Download', description: 'Get high-quality images on your device' },
    { icon: Share, title: 'Share', description: 'Easily share images with friends and family' },
    { icon: Heart, title: 'Like', description: 'Show appreciation for your favorite images' },
    { icon: Camera, title: 'Capture', description: 'Take and edit photos directly in the app' },
    { icon: Tag, title: 'Tag', description: 'Organize your images with custom tags' },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-[#121212] text-white py-20 px-4 md:px-8 rounded-b-3xl mb-2 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-[#1D1D1D]" />
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
          Unleash Your Creativity
        </h2>
        <p className="text-xl md:text-2xl text-center mb-12 text-gray-300">
          Discover a world of possibilities with our feature-rich platform
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="flex flex-col items-center bg-zinc-700/50 p-6 rounded-xl backdrop-blur-sm"
            >
              <div 
                className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-full mb-4"
              >
                <feature.icon size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-center text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button
            className="bg-gradient-to-r from-purple-500 to-indigo-500 px-8 py-3 rounded-full font-semibold text-lg hover:from-purple-600 hover:to-indigo-600 transition duration-300 shadow-lg"
          >
            Start Creating Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
