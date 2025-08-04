"use client";

import React, { useEffect, useState } from 'react';

interface MistyTextProps {
  text: string;
  onComplete?: () => void;
}

const MistyText: React.FC<MistyTextProps> = ({ text, onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start the animation shortly after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Small delay to ensure CSS animation triggers

    // Duration of the misty-fade-in animation
    const animationDuration = 4000; // 4 seconds

    const completeTimer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, animationDuration + 200); // Call onComplete after animation finishes + a small buffer

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`text-white cinematic-title-glow ${isVisible ? 'animate-misty-fade-in' : 'opacity-0'} duration-[4000ms]`}>
      {text}
    </div>
  );
};

export default MistyText;