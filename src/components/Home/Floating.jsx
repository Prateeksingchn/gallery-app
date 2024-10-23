import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useAnimationFrame,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const FloatingImage = ({ src, alt, className }) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, { stiffness: 50, damping: 10 });
  const y = useSpring(mouseY, { stiffness: 50, damping: 10 });

  useAnimationFrame(() => {
    if (ref.current && window.mouseX !== undefined && window.mouseY !== undefined) {
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = (window.mouseX - centerX) / 20;
      const distanceY = (window.mouseY - centerY) / 20;

      mouseX.set(distanceX);
      mouseY.set(distanceY);
    }
  });

  return (
    <motion.div ref={ref} className={`absolute ${className}`} style={{ x, y }}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        loading="lazy"
      />
    </motion.div>
  );
};

const Floating = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const inspirationRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  // Comment out the scrollYProgress and y variables
  // const { scrollYProgress } = useScroll({
  //   target: sectionRef,
  //   offset: ["start start", "end start"],
  // });
  // const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Connect lenis to RAF (request animation frame)
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    setIsClient(true);
    let rafId;
    const updateMousePosition = (ev) => {
      window.mouseX = ev.clientX;
      window.mouseY = ev.clientY;
    };

    const throttledUpdateMousePosition = (ev) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => updateMousePosition(ev));
    };

    window.addEventListener("mousemove", throttledUpdateMousePosition, { passive: true });

    // Comment out the scrolling effect setup
    // const ctx = gsap.context(() => {
    //   ScrollTrigger.create({
    //     trigger: sectionRef.current,
    //     start: "top top",
    //     end: "bottom top",
    //     pin: true,
    //     pinSpacing: false,
    //   });

    //   ScrollTrigger.create({
    //     trigger: contentRef.current,
    //     start: "top top",
    //     end: "bottom bottom",
    //     scrub: true,
    //   });
    // }, sectionRef);

    return () => {
      window.removeEventListener("mousemove", throttledUpdateMousePosition);
      cancelAnimationFrame(rafId);
      // ctx.revert();
      lenis.destroy();
    };
  }, []);

  const floatingImages = [
    { src: "https://i.pinimg.com/236x/3d/18/21/3d182196300ee640b486dc88b3f09bb7.jpg", alt: "Placeholder", className: "top-[7%] left-[2%] right-[2%] bottom-[2%] w-[60px] h-[60px] lg:top-[5%] lg:left-[5%] lg:right-[5%] lg:bottom-[5%] md:top-[14.5%] md:left-[2%] md:right-[2%] md:bottom-[2%] w-[60px] h-[60px] lg:w-[130px] lg:h-[150px] md:w-[110px] md:h-[120px] sm:top-[5%] sm:left-[5%] sm:right-[10%] sm:bottom-[10%] sm:w-[80px] sm:h-[80px]" },
    { src: "https://i.pinimg.com/236x/0e/42/7f/0e427fefb82a8f6326dbcce6e4468a56.jpg", alt: "Placeholder", className: "top-[7%] right-[10%] md:top-[10%] md:right-[8%] lg:top-[7%] lg:right-[10%] w-[55px] h-[60px] lg:w-[100px] lg:h-[100px] md:w-[110px] md:h-[110px] sm:top-[8%] sm:right-[2%] sm:w-[90px] sm:h-[90px]" },
    { src: "https://i.pinimg.com/236x/33/12/c4/3312c4eea018181a4de435c44bdb8f30.jpg", alt: "Placeholder", className: "bottom-[32%] left-[7%] lg:bottom-[15%] lg:left-[7%] md:bottom-[30%] md:left-[7%] w-[60px] h-[60px] lg:w-[130px] lg:h-[140px] md:w-[120px] md:h-[110px] sm:bottom-[30%] sm:left-[1%] sm:w-[100px] sm:h-[100px]" },
    { src: "https://i.pinimg.com/236x/98/8b/0d/988b0d2faafc1156acd8ea0b28009985.jpg", alt: "Placeholder", className: "bottom-[25%] right-[10%] md:bottom-[20%] md:right-[6%] lg:bottom-[20%] lg:right-[13%] w-[60px] h-[50px] lg:w-[140px] lg:h-[130px] md:w-[140px] md:h-[110px] sm:bottom-[12%] sm:right-[5%] sm:w-[120px] sm:h-[100px]" },
    { src: "https://i.pinimg.com/236x/a4/e2/02/a4e202ba80d3a9a0b8db24d75c73ff40.jpg", alt: "Placeholder", className: "top-[25%] left-[24%] lg:top-[22%] lg:left-[23%] md:top-[30%] md:left-[25%] w-[60px] h-[60px] md:w-[110px] md:h-[110px] lg:w-[120px] lg:h-[130px] sm:top-[23%] sm:left-[22%] sm:w-[100px] sm:h-[100px]" },
    { src: "https://i.pinimg.com/236x/4a/cf/77/4acf771a623bb6acacf51b832374028f.jpg", alt: "Placeholder", className: "top-[15%] right-[35%] lg:top-[14%] lg:right-[23.7%] md:top-[23%] md:right-[27%] w-[50px] h-[60px]  lg:w-[160px] lg:h-[150px] md:w-[130px] md:h-[110px] sm:top-[17%] sm:right-[27%] sm:w-[130px] sm:h-[110px]" },
    { src: "https://i.pinimg.com/236x/4d/92/aa/4d92aa15d703b6f5619953a62876e9f9.jpg", alt: "Placeholder", className: "bottom-[6%] right-[22%] md:bottom-[5%] md:right-[25%] lg:bottom-[10%] lg:right-[30%] w-[60px] h-[45px] lg:w-[120px] lg:h-[120px] md:w-[120px] md:h-[100px] block md:block lg:block sm:bottom-[2%] sm:right-[27%] sm:w-[100px] sm:h-[100px]" },
    { src: "https://i.pinimg.com/236x/10/f3/c0/10f3c0375d6afc939af6f854b333bba1.jpg", alt: "Placeholder", className: "top-[41%] right-[3%] md:top-[39%] md:right-[4%] lg:top-[41%] lg:right-[3%] w-[55px] h-[60px] lg:w-[120px] lg:h-[120px] md:w-[110px] md:h-[140px] block md:block lg:block sm:top-[38%] sm:right-[1%] sm:w-[110px] sm:h-[140px]" },
    { src: "https://i.pinimg.com/236x/c9/dd/59/c9dd590d03ea0cc26c8bdb94c53d92cb.jpg", alt: "Placeholder", className: "bottom-[8%] left-[16%] lg:bottom-[5%] lg:left-[25%] md:bottom-[9%] md:left-[20%] w-[60px] h-[40px] md:w-[110px] md:h-[90px] lg:w-[125px] lg:h-[140px] sm:bottom-[10%] sm:left-[16%] sm:w-[110px] sm:h-[90px]" },
    { src: "https://i.pinimg.com/236x/db/92/3a/db923ae921d9807793f5abac42320647.jpg", alt: "Placeholder", className: "bottom-[20%] left-[35%] md:bottom-[25%] md:left-[40%] lg:bottom-[20%] lg:left-[45%] w-[60px] h-[40px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[110px]  md:block lg:block sm:bottom-[20%] sm:left-[40%] sm:w-[100px] sm:h-[100px]" },
    { src: "https://i.pinimg.com/236x/3d/63/90/3d639037ba61d2f2548226940b360db5.jpg", alt: "Placeholder", className: "top-[45%] left-[50%] lg:top-[11%] lg:left-[42%] md:top-[6%] md:left-[37%] w-[40px] h-[40px] lg:w-[120px] lg:h-[110px] md:w-[100px] md:h-[110px] hidden md:block lg:block sm:top-[6%] sm:left-[37%] sm:w-[100px] sm:h-[110px]" },
  ];

  return (
    <section ref={sectionRef} className="relative w-full h-[500px] sm:h-[600px] md:h-[850px] lg:h-screen overflow-hidden">
      <div ref={contentRef} className="absolute inset-0 bg-[#ECE8E2]">
        <div
          ref={inspirationRef}
          // Remove the motion.div and its style prop
          className="h-[450px] sm:h-[550px] md:h-[850px] lg:h-screen w-full overflow-hidden font-serif mt-4 sm:mt-7 lg:mt-0 relative"
        >
          {isClient && (
            <div className="absolute inset-0">
              {floatingImages.map((img, index) => (
                <FloatingImage key={index} {...img} />
              ))}
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-4xl px-4">
              <motion.h1
                className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-normal mb-4 leading-tight font-[kalnia]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Find Inspiration{" "}
                <br />
                <span className="text-3xl sm:text-4xl md:text-6xl font-[kalnia]">
                  Wherever You Are
                </span>
              </motion.h1>
              <motion.div
                className="mt-2"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <div className="h-0.5 bg-red-500 mx-auto" style={{ width: "80px" }}></div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Floating;
