
"use client";

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MagicalParticles = () => {
  const mesh = useRef<THREE.Points>(null!);

  const particles = useMemo(() => {
    const count = 330;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
      colors[i] = Math.random() * 0.5 + 0.5;
    }

    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.05;
      const time = state.clock.getElapsedTime();
      
      // Animate particles up and down
      for (let i = 0; i < particles.positions.length / 3; i++) {
        const i3 = i * 3;
        const x = particles.positions[i3];
        mesh.current.geometry.attributes.position.array[i3 + 1] = Math.sin(time + x) * 2;
      }
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

export default MagicalParticles;
