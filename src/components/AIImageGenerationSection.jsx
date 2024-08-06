import React, { useState, Suspense, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Spline from "@splinetool/react-spline";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AIImageGenerationSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const leftSplineRef = useRef(null);
  const rightSplineRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 140 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 140 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    const handleMouseMove = (e) => {
      if (!isMobile) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Set up the scrolling effect
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });
    }, sectionRef);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, [mouseX, mouseY, isMobile]);

  const SplineComponent = ({ scene, splineRef }) => (
    <Suspense
      fallback={
        <div className="w-full h-full bg-zinc-800 rounded-lg animate-pulse" />
      }
    >
      <Spline
        scene={scene}
        ref={splineRef}
        style={{
          width: "100%",
          height: "100%",
          transform: isMobile
            ? "none"
            : `perspective(1000px) rotateY(${
                springX.get() * 20 - 10
              }deg) rotateX(${springY.get() * -20 + 10}deg)`,
        }}
      />
    </Suspense>
  );

  return (
    <section ref={sectionRef} className="relative w-full lg:h-screen h-[600px] overflow-hidden bg-[#121212] z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10 h-full flex items-center">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full">
          {/* Left Spline Scene */}
          <div className="w-[90%] lg:w-[37%] h-[300px] sm:h-[400px] lg:h-[550px] mb-8 lg:mb-0 hidden lg:block ">
            <SplineComponent
              scene="https://prod.spline.design/ELjGuoCIJhgY6VJv/scene.splinecode"
              splineRef={leftSplineRef}
            />
          </div>

          {/* Center Content */}
          <div className="w-full lg:w-[30%] px-4">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h2 className="text-5xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Top Images of Today
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">
                Explore the most popular images of today, curated for you. Discover amazing visuals from talented artists around the world.
              </p>
              <motion.div
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/ai-gallery"
                    className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg transition duration-300 shadow-lg"
                  >
                    Top Images of Today
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Spline Scene */}
          <div className="w-full lg:w-[37%] h-[300px] sm:h-[400px] lg:h-[500px] hidden lg:block">
            <SplineComponent
              scene="https://prod.spline.design/ELjGuoCIJhgY6VJv/scene.splinecode"
              splineRef={rightSplineRef}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIImageGenerationSection;