
"use client";

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const LightRain = () => {
  const points = useRef<THREE.Points>(null!);

  const particles = useMemo(() => {
    const count = 700;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 30; // x
      positions[i3 + 1] = Math.random() * 50; // y
      positions[i3 + 2] = (Math.random() - 0.5) * 20; // z

      velocities[i3] = 0;
      velocities[i3 + 1] = -0.1 - Math.random() * 0.1; // y-velocity
      velocities[i3 + 2] = 0;
    }

    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (points.current) {
      const positions = points.current.geometry.attributes.position.array;

      for (let i = 0; i < positions.length / 3; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += particles.velocities[i3 + 1];

        // Reset particle to the top when it goes off-screen
        if (positions[i3 + 1] < -20) {
          positions[i3 + 1] = 20;
        }
      }
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03} // Make particles smaller
        color={new THREE.Color(0xaaaaaa)} // Muted white color
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

export default LightRain;
