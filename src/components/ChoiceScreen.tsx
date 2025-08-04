
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const choices = [
  { label: "今夜、最高の映画を。", path: "/category/just-watch" },
  { label: "ある映画について、もっと深く。", path: "/category/deep-think" },
];

const ChoiceScreen: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : choices.length - 1));
    } else if (e.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) => (prevIndex < choices.length - 1 ? prevIndex + 1 : 0));
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

  const handleChoiceClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className={`w-full h-screen flex items-center justify-center bg-black transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="jrpg-choice-container w-full max-w-2xl">
        {choices.map((choice, index) => (
          <button
            key={choice.label}
            className={`jrpg-choice-button ${selectedIndex === index ? 'selected' : ''}`}
            onClick={() => handleChoiceClick(choice.path)}
            onMouseEnter={() => setSelectedIndex(index)}
          >
            {choice.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChoiceScreen;
