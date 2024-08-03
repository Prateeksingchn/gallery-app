// File: src/components/Robot.jsx

import React, { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Text, Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";

const Robot = () => {
  const group = useRef();
  const bodyRef = useRef();
  const headRef = useRef();
  const eyeL = useRef();
  const eyeR = useRef();
  const brushRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();

  const [mouseX, setMouseX] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouseX((event.clientX / window.innerWidth) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const bodyMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color("#1E293B") },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normal;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vec3 light = normalize(vec3(1.0, 1.0, 1.0));
          float dProd = max(0.0, dot(vNormal, light));
          vec3 finalColor = color + 0.2 * sin(vUv.y * 20.0 + time);
          finalColor *= (0.5 + 0.5 * dProd);
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    bodyMaterial.uniforms.time.value = t;
    group.current.rotation.y = Math.sin(t / 4) / 4;
    group.current.position.y = Math.sin(t / 1.5) / 10 + 0.1;
    headRef.current.rotation.z = Math.sin(t / 2) / 8;
    headRef.current.rotation.y = mouseX * 0.5; // Rotate head based on mouse x-axis
    brushRef.current.rotation.z = Math.sin(t * 2) / 4;
    eyeL.current.scale.setScalar(0.9 + Math.sin(t * 3) * 0.1);
    eyeR.current.scale.setScalar(0.9 + Math.cos(t * 3) * 0.1);
    leftArmRef.current.rotation.x = Math.sin(t) / 4;
    rightArmRef.current.rotation.x = Math.cos(t) / 4;
    leftLegRef.current.rotation.x = Math.cos(t) / 6;
    rightLegRef.current.rotation.x = Math.sin(t) / 6;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={group}>
        <mesh ref={bodyRef}>
          <capsuleGeometry args={[0.4, 1.2, 4, 32]} />
          <primitive object={bodyMaterial} />
        </mesh>

        <mesh ref={headRef} position={[0, 1.35, 0]}>
          <sphereGeometry args={[0.4, 64, 64]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            resolution={512}
            transmission={0.95}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            thickness={0.5}
            chromaticAberration={5}
            anisotropy={1}
            color="#2563EB"
            distortion={0.5}
            distortionScale={0.5}
            temporalDistortion={0.1}
          />
        </mesh>

        <mesh ref={eyeL} position={[-0.15, 1.45, 0.3]}>
          <sphereGeometry args={[0.06, 32, 32]} />
          <meshPhongMaterial
            color="#22D3EE"
            emissive="#22D3EE"
            shininess={100}
            specular="#FFFFFF"
          />
        </mesh>
        <mesh ref={eyeR} position={[0.15, 1.45, 0.3]}>
          <sphereGeometry args={[0.06, 32, 32]} />
          <meshPhongMaterial
            color="#22D3EE"
            emissive="#22D3EE"
            shininess={100}
            specular="#FFFFFF"
          />
        </mesh>

        <group ref={brushRef} position={[0.7, 0.5, 0.5]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.03, 0.03, 0.4, 32]} />
            <meshStandardMaterial
              color="#8B5CF6"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0, 0.25, 0]}>
            <sphereGeometry args={[0.06, 32, 32]} />
            <meshStandardMaterial
              color="#A78BFA"
              emissive="#A78BFA"
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.5, 0.8, 0]}>
          <mesh>
            <capsuleGeometry args={[0.08, 0.6, 4, 16]} />
            <meshStandardMaterial color="#4B5563" metalness={0.6} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.4, 0]}>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshStandardMaterial color="#22D3EE" emissive="#22D3EE" emissiveIntensity={0.5} />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.5, 0.8, 0]}>
          <mesh>
            <capsuleGeometry args={[0.08, 0.6, 4, 16]} />
            <meshStandardMaterial color="#4B5563" metalness={0.6} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.4, 0]}>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshStandardMaterial color="#22D3EE" emissive="#22D3EE" emissiveIntensity={0.5} />
          </mesh>
        </group>

        {/* Left Leg */}
        <group ref={leftLegRef} position={[-0.25, -0.7, 0]}>
          <mesh>
            <capsuleGeometry args={[0.1, 0.8, 4, 16]} />
            <meshStandardMaterial color="#4B5563" metalness={0.6} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.5, 0.1]} rotation={[-Math.PI / 6, 0, 0]}>
            <boxGeometry args={[0.2, 0.1, 0.3]} />
            <meshStandardMaterial color="#22D3EE" emissive="#22D3EE" emissiveIntensity={0.5} />
          </mesh>
        </group>

        {/* Right Leg */}
        <group ref={rightLegRef} position={[0.25, -0.7, 0]}>
          <mesh>
            <capsuleGeometry args={[0.1, 0.8, 4, 16]} />
            <meshStandardMaterial color="#4B5563" metalness={0.6} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.5, 0.1]} rotation={[-Math.PI / 6, 0, 0]}>
            <boxGeometry args={[0.2, 0.1, 0.3]} />
            <meshStandardMaterial color="#22D3EE" emissive="#22D3EE" emissiveIntensity={0.5} />
          </mesh>
        </group>

        <mesh position={[0, 0.5, 0.4]}>
          <sphereGeometry args={[0.15, 64, 64]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            resolution={512}
            transmission={0.95}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            thickness={0.5}
            chromaticAberration={5}
            anisotropy={1}
            color="#8B5CF6"
            emissive="#8B5CF6"
            emissiveIntensity={2}
            distortion={1}
            distortionScale={0.5}
            temporalDistortion={0.2}
          />
        </mesh>

        <Text
          position={[0.7, 0.9, 0.5]}
          rotation={[0, -Math.PI / 4, 0]}
          fontSize={0.05}
          color="#22D3EE"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.005}
          outlineColor="#0F172A"
        >
          AI.ART
        </Text>

        <Sparkles
          count={100}
          scale={3}
          size={2}
          speed={0.5}
          color="#22D3EE"
        />
      </group>
    </Float>
  );
};

export default Robot;
