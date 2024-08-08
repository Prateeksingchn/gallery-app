import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Camera, Aperture, Sun, Clock, Mountain, Droplet } from "lucide-react";
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const photographyTips = [
  {
    title: "Rule of Thirds",
    description:
      "Divide your frame into a 3x3 grid and place key elements along the lines or at their intersections.",
    icon: <Camera className="w-6 h-6" />,
  },
  {
    title: "Use Leading Lines",
    description:
      "Incorporate natural lines to guide the viewer's eye towards the main subject of your photograph.",
    icon: <Mountain className="w-6 h-6" />,
  },
  {
    title: "Play with Perspective",
    description:
      "Change your shooting angle or position to create unique and compelling viewpoints.",
    icon: <Aperture className="w-6 h-6" />,
  },
  {
    title: "Golden Hour Lighting",
    description:
      "Shoot during the first and last hour of sunlight for warm, soft lighting in your photos.",
    icon: <Sun className="w-6 h-6" />,
  },
  {
    title: "Experiment with Shutter Speed",
    description:
      "Use slow shutter speeds for motion blur or fast speeds to freeze action.",
    icon: <Clock className="w-6 h-6" />,
  },
  {
    title: "Master Manual Mode",
    description:
      "Learn to control aperture, shutter speed, and ISO for complete creative control.",
    icon: <Droplet className="w-6 h-6" />,
  },
];

const PhotographyTips = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const tipRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline for the section animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          // markers: true,
          start: "top 70%",
          end: "top top",
          scrub: true,
        },
      });

      // Animate the content background and position
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

      // Animate the title
      // tl.fromTo(
      //   ".section-title",
      //   { opacity: 0, y: 50 },
      //   { opacity: 1, y: 0, duration: 0.5 },
      //   "-=0.5"
      // );

      // Animate the tips
      // tipRefs.current.forEach((tip, index) => {
      //   tl.fromTo(
      //     tip,
      //     { opacity: 0, y: 50 },
      //     { opacity: 1, y: 0, duration: 0.3 },
      //     "-=0.2"
      //   );
      // });

      // Animate the CTA button
      // tl.fromTo(
      //   ".cta-button",
      //   { opacity: 0, y: 50 },
      //   { opacity: 1, y: 0, duration: 0.3 },
      //   "-=0.2"
      // );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !tipRefs.current.includes(el)) {
      tipRefs.current.push(el);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="lg:w-[90%] w-[95%] mx-auto my-10 lg:h-[86vh] md:h-[80vh] md:py-10 flex items-end justify-center overflow-hidden"
    >
      <div 
        ref={contentRef}
        className="w-full bg-gradient-to-br from-indigo-100 to-pink-50 rounded-3xl p-8 md:p-4 overflow-y-auto"
      >
        <h2 className="section-title text-4xl font-bold mt-4 mb-12 text-center text-gray-800">
          Photography Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 lg:gap-8 md:gap-4 lg:mb-12 md:mb-8">
          {photographyTips.map((tip, index) => (
            <motion.div
              key={index}
              ref={addToRefs}
              className="bg-white rounded-xl shadow-lg p-6 transform transition duration-300 hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 rounded-full p-3 mr-4">
                  {tip.icon}
                </div>
                <h3 className="text-[18px] font-semibold text-gray-800">
                  {tip.title}
                </h3>
              </div>
              <p className="text-gray-600 md:text-[15px]">{tip.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Link
            to="/photography-tips"
            className="cta-button inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-8 rounded-full font-semibold hover:from-indigo-600 hover:to-purple-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            Explore All Tips
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PhotographyTips;