import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AIImageGenerationSection = () => {
  const navigate = useNavigate();

  const handleTryYourselfClick = () => {
    navigate('/ai-image-generation');
  };

  return (
    <section className="bg-gradient-to-r from-gray-700 to-pink-500 min-h-screen flex flex-col items-center py-10">
      <div className="container mx-auto px-4 pt-12 text-center">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="text-sm bg-white py-1 px-3 rounded-full font-semibold text-gray-800 inline-block mb-4">
            Best Generative Images
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            The new age of design art is AI Generation
          </h1>
          <p className="text-lg md:text-xl text-white mb-8">
            AI-first is a totally new way to deliver customer service. The entire Intercom platform is powered by AI—so customers get instant support with an AI agent, agents get instant answers with an AI copilot, and support leaders get instant AI insights.
          </p>
          <div>
            <button 
              onClick={handleTryYourselfClick}
              className="bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-full text-lg mx-2"
            >
              Start Free Trial!
            </button>
            <button 
              onClick={() => navigate('/explore')}
              className="bg-transparent border border-white hover:bg-white hover:text-gray-800 text-white font-bold py-2 px-4 rounded-full text-lg mx-2"
            >
              Explore Now
            </button>
          </div>
        </motion.div>
        <motion.div 
          className="bg-white rounded-lg shadow-lg w-full max-w-5xl mx-auto p-6 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ border: '10px solid #f0f0f0', borderRadius: '15px' }}
        >
          <div className="absolute top-0 left-0 w-full h-10 bg-gray-300 rounded-t-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mx-1"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full mx-1"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full mx-1"></div>
          </div>
          <div className="pt-10">
            <div className="flex items-center justify-between mb-4">
              <input 
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-full"
                value="a portrait of a young, elderly wizard in a cherry blossom garden"
                readOnly
              />
              <button className="ml-2 bg-purple-600 text-white px-4 py-2 rounded-full">
                Create
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                "https://th.bing.com/th/id/OIG1.WJ3VVrQ6Y0vKwMuxKpZJ?pid=ImgGn",
                "https://th.bing.com/th/id/OIG1.nPNRNmn5VIfK24DDJVpm?pid=ImgGn",
                "https://th.bing.com/th/id/OIG4.ybc1Fy_Br.akuzmexQ00?pid=ImgGn",
                "https://th.bing.com/th/id/OIG1.X0GIOhnIg1GdQ7oxGFQw?pid=ImgGn",
                "https://th.bing.com/th/id/OIG4.bBVEwOBEZGx5YD5CcGeT?pid=ImgGn",
                "https://th.bing.com/th/id/OIG1.8tmux1hcyp0VjwoSBOqw?pid=ImgGn"
              ].map((src, idx) => (
                <div key={idx} className="relative">
                  <img src={src} alt={`Generated ${idx + 1}`} className="w-full h-full object-cover rounded"/>
                  <div className="absolute top-2 right-2">
                    <button className="bg-white p-2 rounded-full">
                      <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 17l-5-5 1.414-1.414L10 14.172l7.293-7.293L18 8l-8 8z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-full">
                Download
              </button>
              <button className="bg-transparent border border-purple-600 text-purple-600 px-4 py-2 rounded-full">
                Copy Image
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIImageGenerationSection;
