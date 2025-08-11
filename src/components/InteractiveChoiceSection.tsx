"use client";

import React, { Suspense, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRouter } from 'next/navigation';
import MagicalParticles from './MagicalParticles';
import { Text, useDepthBuffer } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const choices = [
  { label: "運命の一本をみつける。", path: "/post/destiny-movie-to-light-up-your-heart" },
  { label: "映画の裏側へ。", path: "/category/deep-think" },
];

// --- Helper Components from TwoLightsChoice ---


interface FloatingTextProps {
  children: React.ReactNode;
  position: [number, number, number];
  isSelected: boolean;
  letterSpacing?: number; // Optional letterSpacing prop
}

const FloatingText: React.FC<FloatingTextProps> = ({ children, position, isSelected, letterSpacing: propLetterSpacing }) => {
  const [opacity, setOpacity] = useState(0);
  const { viewport } = useThree();
  // Adjust font size based on viewport width, with min/max caps
  const fontSize = Math.max(0.25, Math.min(0.5, viewport.width / 12));
  const finalLetterSpacing = propLetterSpacing !== undefined ? propLetterSpacing : 0.1;

  useFrame(() => {
    setOpacity(THREE.MathUtils.lerp(opacity, isSelected ? 1 : 0.6, 0.1));
  });

  return (
    <Text
      position={position}
      fontSize={fontSize}
      letterSpacing={finalLetterSpacing}
      color="white"
      fillOpacity={opacity}
      emissive="white"
      emissiveIntensity={1}
      whiteSpace="normal"
      textAlign="center"
      anchorX="center"
      anchorY="middle"
      maxWidth={viewport.width * 0.4} // Ensure text wraps within a portion of the screen
    >
      {children}
    </Text>
  );
};

// --- Main Scene Component from TwoLightsChoice ---
const Scene = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { viewport } = useThree();
  useDepthBuffer({ frames: 1 });

  // Calculate horizontal spread based on viewport width to ensure it's responsive
  const horizontalSpread = viewport.width * 0.35;
  const lightHorizontalSpread = viewport.width * 0.4;

  return (
    <>
      <color attach="background" args={['black']} />
      <fog attach="fog" args={['black', 10, 25]} />
      <ambientLight intensity={0} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.4} />
      </mesh>

      <Suspense fallback={null}>
        {choices.map((choice, index) => {
          console.log(`Rendering choice: ${choice.label} at index: ${index}`);
          const textPositionY = index === 0 ? 1 : -1; // Fixed Y positions for clear separation

          return (
            <group key={choice.path} onPointerDown={() => router.push(choice.path)} onPointerOver={() => setSelectedIndex(index)}>
              
              <FloatingText position={[0, textPositionY, 0]} isSelected={selectedIndex === index}>
                {choice.label}
              </FloatingText>
            </group>
          );
        })}
        
      </Suspense>
    </>
  );
};


const InteractiveChoiceSection: React.FC = () => {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <Suspense fallback={null}>
          <MagicalParticles />
          <EffectComposer>
            <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
            <Scene />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default InteractiveChoiceSection;