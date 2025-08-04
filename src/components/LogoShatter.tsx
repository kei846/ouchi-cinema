"use client";
import * as THREE from 'three';
import { useMemo } from 'react';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import orbitronFont from 'three/examples/fonts/helvetiker_bold.typeface.json';

// This component is now a utility to get text points, not a visual component.
// It will not render anything.
const LogoShatter = () => {
  return null;
};

export const getTextPoints = (text: string): Float32Array => {
  const font = new FontLoader().parse(orbitronFont);
  const geometry = new THREE.ShapeGeometry(
    font.generateShapes(text, 0.8)
  );
  geometry.center();
  return geometry.attributes.position.array as Float32Array;
};

export default LogoShatter;