"use client";
import * as THREE from 'three';
import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

const GeometricAnimation = ({ active }: { active: boolean }) => {
  const lines = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 200; i++) {
      const x1 = (Math.random() - 0.5) * 20;
      const y1 = (Math.random() - 0.5) * 20;
      const z1 = (Math.random() - 0.5) * 20;
      const x2 = x1 + (Math.random() - 0.5) * 2;
      const y2 = y1 + (Math.random() - 0.5) * 2;
      const z2 = z1 + (Math.random() - 0.5) * 2;
      vertices.push(x1, y1, z1, x2, y2, z2);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    
    const lineSegments = new THREE.LineSegments(
        geometry,
        new THREE.LineBasicMaterial({ color: 'white', transparent: true, opacity: 0.05 })
    );
    lineSegments.rotation.x = Math.random() * Math.PI;
    lineSegments.rotation.y = Math.random() * Math.PI;
    return lineSegments;
  }, []);

  useFrame((state, delta) => {
    if (lines) {
      lines.rotation.y += delta * 0.1;
      if (!active && lines.material.opacity > 0) {
        lines.material.opacity -= delta * 0.5;
      }
    }
  });

  return <primitive object={lines} />;
};

export default GeometricAnimation;