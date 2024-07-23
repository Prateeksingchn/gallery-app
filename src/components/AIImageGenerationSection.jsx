import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Robot from "../robot/Robot";
import Particles from "../robot/Particles";

const AIImageGenerationSection = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState(
    "a portrait of a young, elderly wizard in a cherry blossom garden"
  );

  const generatedImages = [
    "https://th.bing.com/th/id/OIG1.WJ3VVrQ6Y0vKwMuxKpZJ?pid=ImgGn",
    "https://th.bing.com/th/id/OIG1.nPNRNmn5VIfK24DDJVpm?pid=ImgGn",
    "https://th.bing.com/th/id/OIG4.ybc1Fy_Br.akuzmexQ00?pid=ImgGn",
    "https://th.bing.com/th/id/OIG1.X0GIOhnIg1GdQ7oxGFQw?pid=ImgGn",
    "https://th.bing.com/th/id/OIG4.bBVEwOBEZGx5YD5CcGeT?pid=ImgGn",
    "https://th.bing.com/th/id/OIG1.8tmux1hcyp0VjwoSBOqw?pid=ImgGn",
  ];

  return (
    <section className="bg-gradient-to-r from-gray-800 to-blue-900 min-h-screen py-20 rounded-b-[50px] relative overflow-hidden">
      <div className="absolute left-0 top-0 w-1/3 h-full">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <Robot />
          <Particles />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            AI-Powered Image Creation
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Elevate your gallery with AI-generated masterpieces. Create unique,
            stunning visuals to complement your curated collection.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/ai-image-generation")}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full text-lg transition duration-300"
            >
              Start Creating
            </button>
            <button
              onClick={() => navigate("/explore")}
              className="bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold py-2 px-6 rounded-full text-lg transition duration-300"
            >
              Explore AI Gallery
            </button>
            <button
              onClick={() => navigate("/tutorials")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full text-lg transition duration-300"
            >
              AI Art Tutorials
            </button>
          </div>
        </motion.div>
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Laptop-like container */}
          <div className="bg-gray-800 rounded-t-xl p-2 pb-0 shadow-xl">
            <div className="bg-gray-700 rounded-t-lg p-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-b-lg">
              <div className="flex items-center mb-4">
                <input
                  type="text"
                  className="flex-grow px-4 py-2 bg-white border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate..."
                />
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-r-full transition duration-300">
                  Generate
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {generatedImages.map((src, idx) => (
                  <motion.div
                    key={idx}
                    className="relative group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <img
                      src={src}
                      alt={`Generated ${idx + 1}`}
                      className="w-full h-40 object-cover rounded-lg shadow-md"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          {/* Laptop stand */}
          <div
            className="bg-gray-700 h-4 mx-auto rounded-b-3xl"
            style={{ width: "70%" }}
          ></div>
        </motion.div>
        {/* Additional features section */}
        <div className="mt-10 text-center">
          <h3 className="text-3xl font-bold text-white mb-8">
            Enhance Your Gallery Experience
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-purple-400 mb-4">
                AI Style Transfer
              </h4>
              <p className="text-gray-300">
                Apply the style of famous artworks to your photos using AI.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-purple-400 mb-4">
                Virtual Exhibitions
              </h4>
              <p className="text-gray-300">
                Create and explore 3D virtual galleries featuring AI and
                human-made art.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-purple-400 mb-4">
                Collaborative AI Art
              </h4>
              <p className="text-gray-300">
                Collaborate with AI to create unique pieces in real-time.
              </p>
            </div>
          </div>
        </div>
        ;
      </div>
      ;
    </section>
  );
};

export default AIImageGenerationSection;
