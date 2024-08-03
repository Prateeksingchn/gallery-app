import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Particles = () => {
  const particlesRef = useRef();
  const particlesCount = 2000;
  const posArray = useMemo(() => {
    const array = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      array[i] = (Math.random() - 0.5) * 5;
    }
    return array;
  }, []);

  useFrame((state) => {
    particlesRef.current.rotation.x += 0.001;
    particlesRef.current.rotation.y += 0.001;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={particlesCount}
          itemSize={3}
          array={posArray}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        color="#8B5CF6"
        transparent={true}
        opacity={0.5}
      />
    </points>
  );
};

export default Particles;