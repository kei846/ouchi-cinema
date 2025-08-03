
"use client";

import React, { useState, useEffect, useCallback, Suspense, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, SpotLight, useDepthBuffer } from '@react-three/drei';
import * as THREE from 'three';

const choices = [
  { label: "今夜、最高の映画を。", path: "/category/just-watch" },
  { label: "ある映画について、もっと深く。", path: "/category/deep-think" },
];

// --- Helper Components (unchanged, but kept here for context) ---
interface MovingSpotLightProps {
  position: [number, number, number];
  targetPosition: [number, number, number];
  isSelected: boolean;
}

const MovingSpotLight: React.FC<MovingSpotLightProps> = ({ position, targetPosition, isSelected }) => {
  const light = useRef<THREE.SpotLight>(null!);
  const target = useMemo(() => new THREE.Object3D(), []);
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    target.position.set(...targetPosition);
    if (light.current) {
      light.current.target = target;
    }
  }, [target, targetPosition]);

  useFrame(() => {
    setIntensity(THREE.MathUtils.lerp(intensity, isSelected ? 8 : 3, 0.1));
    if (light.current) {
      light.current.intensity = intensity;
    }
  });

  return <SpotLight ref={light} position={position} target={target} angle={0.4} penumbra={0.6} distance={15} castShadow />;
};

interface FloatingTextProps {
  children: React.ReactNode;
  position: [number, number, number];
  isSelected: boolean;
}

const FloatingText: React.FC<FloatingTextProps> = ({ children, position, isSelected }) => {
  const [opacity, setOpacity] = useState(0);

  useFrame(() => {
    // Animate opacity value
    setOpacity(THREE.MathUtils.lerp(opacity, isSelected ? 1 : 0.6, 0.1));
  });

  return (
    <Text position={position} fontSize={0.4} letterSpacing={0.1} color="white" fillOpacity={opacity}>
      {children}
    </Text>
  );
};

// --- Main Scene Component (Refactored) ---
interface SceneProps {
  selectedIndex: number;
  router: ReturnType<typeof useRouter>;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Scene: React.FC<SceneProps> = ({ selectedIndex, router, setSelectedIndex }) => {
  const depthBuffer = useDepthBuffer({ frames: 1 });

  return (
    <>
      <color attach="background" args={['black']} />
      <fog attach="fog" args={['black', 10, 25]} />
      <ambientLight intensity={0.2} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.4} />
      </mesh>

      <Suspense fallback={null}>
        {choices.map((choice, index) => (
          <group key={choice.path} onPointerDown={() => router.push(choice.path)} onPointerOver={() => setSelectedIndex(index)}>
            <MovingSpotLight
              position={[index === 0 ? -5 : 5, 8, 2]}
              targetPosition={[index === 0 ? -3 : 3, -2, 0]}
              isSelected={selectedIndex === index}
            />
            <FloatingText position={[index === 0 ? -4 : 4, 0, 0]} isSelected={selectedIndex === index}>
              {choice.label}
            </FloatingText>
          </group>
        ))}
      </Suspense>
    </>
  );
};

// --- Top-Level Component (Refactored) ---
const TwoLightsChoice: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      setSelectedIndex((prev) => (prev === 0 ? 1 : 0));
    } else if (e.key === 'Enter') {
      router.push(choices[selectedIndex].path);
    }
  }, [router, selectedIndex]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <Scene selectedIndex={selectedIndex} router={router} setSelectedIndex={setSelectedIndex} />
  );
};

export default TwoLightsChoice;
