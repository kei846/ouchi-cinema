
import React, { useEffect, useState } from 'react';
import MistyText from './MistyText';
import { Canvas } from '@react-three/fiber';
import LightRain from './LightRain';

interface HeroSectionProps {
  onComplete: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onComplete }) => {
  const [showTagline, setShowTagline] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [explode, setExplode] = useState(false);

  useEffect(() => {
    const taglineTimer = setTimeout(() => {
      setShowTagline(true);
    }, 2500);

    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 3500);

    // Trigger the explosion animation after everything has appeared
    const explodeTimer = setTimeout(() => {
      setExplode(true);
      // Call the onComplete callback after the explosion animation duration
      setTimeout(onComplete, 1200); // Matches the duration of explode-and-fade
    }, 6000); // Adjust timing as needed

    return () => {
      clearTimeout(taglineTimer);
      clearTimeout(buttonTimer);
      clearTimeout(explodeTimer);
    };
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.5} />
          <LightRain />
        </Canvas>
      </div>

      {/* Film Grain Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-50 animate-[film-grain_8s_steps(10)_infinite]"></div>

      {/* Light Leak Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-10 animate-[light-leak_10s_ease-in-out_infinite_alternate]"></div>

      {/* Content Overlay */}
      <div className={`relative z-20 flex flex-col items-center justify-center text-center p-4 ${explode ? 'animate-explode-and-fade' : ''}`}>
        <MistyText text="OUCHI-CINEMA" />
        <p className={`mt-4 text-xl md:text-2xl font-light tracking-wide 
                      transition-all duration-1000 ease-out 
                      ${showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Your Gateway to Cinematic Experiences.
        </p>
        <button 
          className={`mt-8 px-10 py-4 border-2 border-white text-white text-lg uppercase tracking-widest 
                      bg-transparent backdrop-blur-sm 
                      hover:bg-white hover:text-black transition-all duration-300 
                      ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          onClick={() => console.log('Explore clicked')}
        >
          Explore
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
