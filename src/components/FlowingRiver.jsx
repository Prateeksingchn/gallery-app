import React from "react";
import { motion } from "framer-motion";

const FlowingRiver = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-20 md:h-10 overflow-hidden block lg:hidden">
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,100 C100,80 200,120 300,100 S500,80 600,100 S800,120 900,100 S1100,80 1200,100 V200 H0 Z"
          fill="url(#waterGradient)"
          animate={{
            d: [
              "M0,100 C100,80 200,120 300,100 S500,80 600,100 S800,120 900,100 S1100,80 1200,100 V200 H0 Z",
              "M0,100 C100,120 200,80 300,100 S500,120 600,100 S800,80 900,100 S1100,120 1200,100 V200 H0 Z",
            ]
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 5,
            ease: "easeInOut"
          }}
        />
        <motion.path
          d="M0,160 C100,140 200,180 300,160 S500,140 600,160 S800,180 900,160 S1100,140 1200,160 V200 H0 Z"
          fill="rgba(255, 255, 255, 0.3)"
          animate={{
            d: [
              "M0,160 C100,140 200,180 300,160 S500,140 600,160 S800,180 900,160 S1100,140 1200,160 V200 H0 Z",
              "M0,160 C100,180 200,140 300,160 S500,180 600,160 S800,140 900,160 S1100,180 1200,160 V200 H0 Z",
            ]
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 4,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );
};

export default FlowingRiver;
