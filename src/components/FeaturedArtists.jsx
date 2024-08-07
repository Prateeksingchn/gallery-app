import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Camera, Aperture, Sun, Clock, Mountain, Droplet } from "lucide-react";

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
  return (
    <section className="w-full min-h-screen bg-red-400 py-16 flex items-center justify-center mt-[80px] ">
      <div className="w-[90%] max-w-7xl bg-gradient-to-br from-indigo-100 to-pink-50 rounded-[50px] p-8 md:p-16">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Photography Tips
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {photographyTips.map((tip, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 transform transition duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 rounded-full p-3 mr-4">
                  {tip.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {tip.title}
                </h3>
              </div>
              <p className="text-gray-600">{tip.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Link
            to="/photography-tips"
            className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-8 rounded-full font-semibold hover:from-indigo-600 hover:to-purple-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            Explore All Tips
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PhotographyTips;