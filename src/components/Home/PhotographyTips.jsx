import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Camera, Aperture, Sun, Clock, Mountain, Droplet } from "lucide-react";

const photographyTips = [
  {
    title: "Rule of Thirds",
    description: "Divide your frame into a 3x3 grid and place key elements along the lines or at their intersections.",
    icon: <Camera />,
    image: "https://images.unsplash.com/photo-1571661043951-31cde5616b38?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Leading Lines",
    description: "Incorporate natural lines to guide the viewer's eye towards the main subject of your photograph.",
    icon: <Mountain />,
    image: "https://images.unsplash.com/photo-1611552966394-4980980a17e4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Perspective",
    description: "Change your shooting angle or position to create unique and compelling viewpoints.",
    icon: <Aperture />,
    image: "https://images.pexels.com/photos/358499/pexels-photo-358499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    title: "Golden Hour",
    description: "Shoot during the first and last hour of sunlight for warm, soft lighting in your photos.",
    icon: <Sun />,
    image: "https://images.pexels.com/photos/2612045/pexels-photo-2612045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    title: "Shutter Speed",
    description: "Use slow shutter speeds for motion blur or fast speeds to freeze action.",
    icon: <Clock />,
    image: "https://images.unsplash.com/photo-1501281819477-eb42ada01d39?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Manual Mode",
    description: "Learn to control aperture, shutter speed, and ISO for complete creative control.",
    icon: <Droplet />,
    image: "https://images.pexels.com/photos/930029/pexels-photo-930029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
];

const PhotographyTips = () => {
  const [activeTip, setActiveTip] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.1, 1],
      transition: { duration: 7, repeat: Infinity, ease: "easeInOut" }
    });
  }, [controls]);

  const backgroundVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <motion.section 
      className="relative w-full py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-[#F0F0F0] to-[#E0E0E0] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-indigo-200 rounded-full opacity-20"
            style={{
              width: Math.random() * 60 + 20,
              height: Math.random() * 60 + 20,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={controls}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 lg:mb-16 text-center text-gray-800"
        >
          Master the Art of Photography
        </motion.h2>
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          <div className="w-full lg:w-2/3">
            <div className="relative aspect-[3/2] sm:aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={activeTip}
                  src={photographyTips[activeTip].image}
                  alt={photographyTips[activeTip].title}
                  className="absolute inset-0 w-full h-full object-cover"
                  variants={backgroundVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeTip}
                  className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">{photographyTips[activeTip].title}</h3>
                  <p className="text-sm sm:text-base lg:text-lg">{photographyTips[activeTip].description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <div className="overflow-x-auto pb-4 lg:pb-0">
              <div className="flex items-center justify-center lg:grid lg:grid-cols-2 gap-4 lg:gap-6" style={{ minWidth: 'max-content' }}>
                {photographyTips.map((tip, index) => (
                  <motion.button
                    key={index}
                    className={`p-3 sm:p-4 rounded-xl w-28 sm:w-28 md:w-36 lg:w-40 ${
                      index === activeTip ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'
                    } shadow-md hover:shadow-lg transition-all duration-300 flex-shrink-0`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTip(index)}
                    animate={index === activeTip ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col items-center text-center">
                      {React.cloneElement(tip.icon, { className: "w-6 h-6 sm:w-6 sm:h-6 md:w-8 md:h-8 mb-1 sm:mb-2" })}
                      <span className="text-xs sm:text-xs md:text-sm font-medium">{tip.title}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default PhotographyTips;
