import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PerspectiveCamera, Trail } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AnimatedStars = () => {
  const starsRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    starsRef.current.rotation.y = time * 0.05;
    starsRef.current.rotation.x = time * 0.01;
  });

  return (
    <group ref={starsRef}>
      <Stars 
        radius={50}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <AnimatedStars />
      {/* <MeteorShower /> */}
    </>
  );
};

const ModernGallerySection = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div className="relative w-full h-[70vh]">
      {/* Three.js Canvas Background */}
      <div className="absolute inset-0 bg-black">
        <Canvas>
          <Scene />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-6"
              animate={{ 
                rotate: isHovered ? 360 : 0,
                scale: isHovered ? 1.2 : 1
              }}
              transition={{ duration: 0.8 }}
            >
              <Sparkles className="w-16 h-16 text-purple-400" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400">
                Top Images
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Explore today's most captivating masterpieces. 
              Join a community of creators pushing the boundaries of creativity.
            </p>

            <motion.button
              onClick={() => navigate('/ai-gallery')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium inline-flex items-center gap-2 shadow-lg shadow-purple-500/30 transition-colors duration-200"
            >
              Explore Gallery
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default ModernGallerySection;