import React, { useState, Suspense, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Spline from '@splinetool/react-spline';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const CustomAlert = ({ message, type = 'error' }) => (
  <div className={`bg-${type === 'error' ? 'red' : 'yellow'}-100 border border-${type === 'error' ? 'red' : 'yellow'}-400 text-${type === 'error' ? 'red' : 'yellow'}-700 px-4 py-3 rounded relative mt-4`} role="alert">
    <strong className="font-bold">{type === 'error' ? 'Error!' : 'Warning!'}</strong>
    <span className="block sm:inline"> {message}</span>
  </div>
);

const AIPage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, isMobile]);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesConfig = {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
      size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1, sync: false } },
      line_linked: { enable: false },
      move: { enable: true, speed: 1, direction: "none", random: true, straight: false, out_mode: "out", bounce: false },
    },
  };

  const SplineComponent = ({ scene, splineRef }) => (
    <Suspense fallback={<div className="w-full h-full bg-zinc-800 rounded-lg animate-pulse" />}>
      <Spline 
        scene={scene}
        ref={splineRef}
        style={{
          width: '100%',
          height: '100%',
          transform: isMobile ? 'none' : `perspective(1000px) rotateY(${springX.get() * 20 - 10}deg) rotateX(${springY.get() * -20 + 10}deg)`,
        }}
      />
    </Suspense>
  );

  const generateImage = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer my-api-key",
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to generate image: ${response.status} ${response.statusText}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [prompt]);

  return (
    <section className="relative min-h-screen overflow-x-hidden bg-[#121212]">
      <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Spline Scene */}
          <div className="w-[90%] lg:w-[37%] h-[300px] sm:h-[400px] lg:h-[550px] mb-8 lg:mb-0 hidden lg:block ">
            <SplineComponent 
              scene="https://prod.spline.design/ELjGuoCIJhgY6VJv/scene.splinecode"
              splineRef={leftSplineRef}
            />
          </div>

          {/* Center Content */}
          <div className="w-full lg:w-[30%] px-4 mb-8 lg:mb-0">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h2 className="text-5xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                AI-Powered Image Creation
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">
                Elevate your gallery with AI-generated masterpieces. Create unique,
                stunning visuals to complement your curated collection.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/ai-image-generation")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg transition duration-300 shadow-lg"
                >
                  Start Creating
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/explore")}
                  className="bg-transparent border-2 border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg transition duration-300 shadow-lg"
                >
                  Explore AI Gallery
                </motion.button>
              </div>
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

        {/* AI Image Generation Component */}
        <motion.div
          className="max-w-4xl mx-auto mt-12 lg:-mt-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-gray-800 rounded-xl p-6 shadow-2xl backdrop-blur-sm bg-opacity-80">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">AI Image Generation</h2>
            <textarea
              className="w-full p-2 border rounded bg-gray-700 text-white"
              rows="4"
              placeholder="Enter your image description..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full transition-colors disabled:from-purple-400 disabled:to-pink-400"
              onClick={generateImage}
              disabled={loading || !prompt.trim()}
            >
              {loading ? 'Generating...' : 'Generate Image'}
            </motion.button>
            
            {error && <CustomAlert message={error} type="error" />}
            
            <div className="mt-6 w-full h-64 bg-gray-700 rounded-lg overflow-hidden">
              {generatedImage ? (
                <img src={generatedImage} alt="Generated" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Your generated image will appear here
                </div>
              )}
            </div>
            
            {generatedImage && (
              <div className="mt-4 flex space-x-2">
                <a 
                  href={generatedImage} 
                  download="generated-image.png"
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
                >
                  Save
                </a>
                <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors">
                  Share
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Additional features section */}
        <div className="mt-16 sm:mt-24 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Enhance Your Gallery Experience
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "AI Style Transfer",
                description: "Apply the style of famous artworks to your photos using AI.",
                icon: "🎨",
              },
              {
                title: "Virtual Exhibitions",
                description: "Create and explore 3D virtual galleries featuring AI and human-made art.",
                icon: "🖼️",
              },
              {
                title: "Collaborative AI Art",
                description: "Collaborate with AI to create unique pieces in real-time.",
                icon: "🤖",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 sm:p-8 rounded-xl backdrop-blur-sm bg-opacity-80 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-3xl sm:text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-3 sm:mb-4">
                  {feature.title}
                </h4>
                <p className="text-gray-300 text-base sm:text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPage;