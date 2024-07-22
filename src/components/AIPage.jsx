import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars, Box } from '@react-three/drei';

const AIPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 to-pink-400 flex flex-col justify-center items-center p-10">
      <h1 className="text-4xl font-bold text-white mb-4">AI Image Generation</h1>
      <p className="text-xl text-white mb-8">Coming Soon! We're working on something amazing.</p>
      
      <div className="w-full max-w-md h-64 bg-white rounded-lg shadow-lg p-4 mb-8">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-md h-64 bg-gray-800 rounded-lg overflow-hidden">
        <Canvas>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Sphere args={[1, 100, 200]} scale={2.5}>
              <MeshDistortMaterial
                color="#8B5CF6"
                attach="material"
                distort={0.5}
                speed={2}
              />
            </Sphere>
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>
      
      <p className="text-white mt-8 text-center">
        Our team is hard at work bringing the power of AI to image generation. 
        Stay tuned for updates!
      </p>
    </div>
  );
};

export default AIPage;