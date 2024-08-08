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
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
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

    // Set up the scrolling effect
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });

      // Add a new ScrollTrigger for the content
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      });
    }, sectionRef);

    return () => {
      window.removeEventListener("mousemove", throttledUpdateMousePosition);
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, []);


  const floatingImages = [
    { src: "https://i.pinimg.com/236x/3d/18/21/3d182196300ee640b486dc88b3f09bb7.jpg", alt: "Placeholder", className: "top-[5%] left-[5%] lg: w-[80px] lg:w-[130px] lg:h-[150px] w-[80px] h-[100px] md:w-[130px] md:h-[150px]" },
    { src: "https://i.pinimg.com/236x/0e/42/7f/0e427fefb82a8f6326dbcce6e4468a56.jpg", alt: "Placeholder", className: "top-[7%] right-[10%] w-[70px] h-[70px] lg:w-[100px] lg:h-[100px] md:w-[110px] md:h-[110px]" },
    { src: "https://i.pinimg.com/236x/33/12/c4/3312c4eea018181a4de435c44bdb8f30.jpg", alt: "Placeholder", className: "bottom-[15%] left-[7%] lg: w-[80px] lg:h-[100px] w-[80px] h-[100px] md:w-[120px] md:h-[140px]" },
    { src: "https://i.pinimg.com/236x/98/8b/0d/988b0d2faafc1156acd8ea0b28009985.jpg", alt: "Placeholder", className: "bottom-[20%] right-[10%] w-[90px] h-[70px] md:w-[140px] md:h-[110px]" },
    { src: "https://i.pinimg.com/236x/a4/e2/02/a4e202ba80d3a9a0b8db24d75c73ff40.jpg", alt: "Placeholder", className: "lg:top-[22%] lg:left-[23%] top-[27%] left-[17%] md:top-[27%] md:left-[25%] w-[80px] h-[80px] md:w-[130px] md:h-[130px] lg:w-[120px] lg:h-[130px]" },
    { src: "https://i.pinimg.com/236x/4a/cf/77/4acf771a623bb6acacf51b832374028f.jpg", alt: "Placeholder", className: "lg:top-[14%] lg:right-[23.7%] top-[17%] right-[25%] md:top-[17%] md:right-[30%] w-[100px] h-[120px] lg:w-[160px] lg:h-[130px] md:w-[150px] md:h-[150px] " },
    { src: "https://i.pinimg.com/236x/4d/92/aa/4d92aa15d703b6f5619953a62876e9f9.jpg", alt: "Placeholder", className: "bottom-[7%] md:bottom-[10%] right-[30%] w-[80px] h-[80px] md:w-[120px] md:h-[120px] hidden md:block lg:block" },
    { src: "https://i.pinimg.com/236x/10/f3/c0/10f3c0375d6afc939af6f854b333bba1.jpg", alt: "Placeholder", className: "top-[40%] right-[5%] w-[70px] h-[90px] lg:w-[120px] lg:h-[120px] md:w-[110px] md:h-[140px] hidden md:block lg:block" },
    { src: "https://i.pinimg.com/236x/c9/dd/59/c9dd590d03ea0cc26c8bdb94c53d92cb.jpg", alt: "Placeholder", className: "bottom-[5%] left-[25%] w-[80px] h-[60px] md:w-[130px] md:h-[100px]" },
    { src: "https://i.pinimg.com/236x/db/92/3a/db923ae921d9807793f5abac42320647.jpg", alt: "Placeholder", className: "bottom-[15%] left-[45%] w-[80px] h-[60px] md:w-[130px] md:h-[100px] block md:hidden lg:block" },
    { src: "https://i.pinimg.com/236x/3d/63/90/3d639037ba61d2f2548226940b360db5.jpg", alt: "Placeholder", className: "lg:top-[15%] lg:left-[45%] top-[35%] left-[45%] lg:w-[120px] lg:h-[110px] w-[80px] h-[100px] md:w-[120px] md:h-[150px] hidden md:hidden lg:block" },
  ];

  return (
    <section ref={sectionRef} className="relative w-full lg:h-screen h-[500px] md:h-[850px] overflow-hidden ">
      <div ref={contentRef} className="absolute inset-0 bg-[#ECE8E2]">
        <motion.div
          ref={inspirationRef}
          style={{ y }}
          className="lg:h-screen md:h-[800px] h-[550px] w-full overflow-hidden font-serif lg:mt-0 mt-7 relative"
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
                className="text-[45px] md:text-6xl lg:text-8xl font-normal mb-4 leading-tight font-[kalnia]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Find Inspiration{" "}
                <span className="text-[45px] md:text-6xl font-[kalnia]">
                  Wherever You Are
                </span>
              </motion.h1>
              <motion.div
                className="mt-4"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <div className="h-0.5 bg-red-500 mx-auto" style={{ width: "80px" }}></div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Floating;