import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Camera, Aperture, Sun, Clock, Mountain, Droplet } from "lucide-react";
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const photographyTips = [
  {
    title: "Rule of Thirds",
    description: "Divide your frame into a 3x3 grid and place key elements along the lines or at their intersections.",
    icon: <Camera className="w-6 h-6" />,
  },
  {
    title: "Use Leading Lines",
    description: "Incorporate natural lines to guide the viewer's eye towards the main subject of your photograph.",
    icon: <Mountain className="w-6 h-6" />,
  },
  {
    title: "Play with Perspective",
    description: "Change your shooting angle or position to create unique and compelling viewpoints.",
    icon: <Aperture className="w-6 h-6" />,
  },
  {
    title: "Golden Hour Lighting",
    description: "Shoot during the first and last hour of sunlight for warm, soft lighting in your photos.",
    icon: <Sun className="w-6 h-6" />,
  },
  {
    title: "Experiment with Shutter Speed",
    description: "Use slow shutter speeds for motion blur or fast speeds to freeze action.",
    icon: <Clock className="w-6 h-6" />,
  },
  {
    title: "Master Manual Mode",
    description: "Learn to control aperture, shutter speed, and ISO for complete creative control.",
    icon: <Droplet className="w-6 h-6" />,
  },
];

const PhotographyTips = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const tipRefs = useRef([]);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    let ctx;
    if (isLargeScreen) {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top top",
            scrub: true,
          },
        });

        tl.fromTo(
          contentRef.current,
          { 
            backgroundColor: "rgba(255, 255, 255, 0)",
            y: '100%'
          },
          { 
            backgroundColor: "rgba(255, 255, 255, 1)", 
            y: '0%',
            duration: 1
          }
        );
      }, sectionRef);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (ctx) {
        ctx.revert();
      }
    };
  }, [isLargeScreen]);

  const addToRefs = (el) => {
    if (el && !tipRefs.current.includes(el)) {
      tipRefs.current.push(el);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="w-full mx-auto min-h-auto flex items-end justify-center"
    >
      <div 
        ref={contentRef}
        className="w-full h-[770px] md:h-[800px] lg:h-[700px] xl:h-[700px] bg-gradient-to-br from-indigo-100 to-pink-50 rounded-t-3xl p-4 lg:px-32 lg:py-8 md:p-8"
      >
        <h2 className="section-title text-3xl md:text-5xl font-bold mt-2 sm:mt-4 mb-6 md:mb-16 lg:mb-12 text-center text-gray-800">
          Photography Tips
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 md:mb-12 lg:mb-12">
          {photographyTips.map((tip, index) => (
            <motion.div
              key={index}
              ref={addToRefs}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6 transform transition duration-300 hover:scale-105"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="bg-indigo-100 rounded-full p-2 sm:p-3 mr-3 sm:mr-4">
                  {tip.icon}
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800">
                  {tip.title}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600">{tip.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Link
            to="/photography-tips"
            className="cta-button inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 sm:py-3 px-6 sm:px-8 rounded-full text-sm sm:text-base font-semibold hover:from-indigo-600 hover:to-purple-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            Explore All Tips
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PhotographyTips;