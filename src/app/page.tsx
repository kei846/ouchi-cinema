'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import InteractiveChoiceSection from '@/components/InteractiveChoiceSection';

export default function HomePage() {
  const [isCracked, setIsCracked] = useState(false);
  const [showChoiceSection, setShowChoiceSection] = useState(false);

  useEffect(() => {
    const crackTimer = setTimeout(() => {
      setIsCracked(true);
    }, 4000); // 4秒後にクラック

    const choiceTimer = setTimeout(() => {
      setShowChoiceSection(true);
    }, 5000); // 5秒後に選択セクション表示

    return () => {
      clearTimeout(crackTimer);
      clearTimeout(choiceTimer);
    };
  }, []);

  const text = "OUCHI-CINEMA";
  const letters = Array.from(text);

  // ブラックミラー風の光るテキストシャドウ
  const glowingShadow = [
    '0 0 8px rgba(255, 255, 255, 0.7)',
    '0 0 12px rgba(255, 255, 255, 0.7)',
    '0 0 20px rgba(255, 255, 255, 0.7)',
    '0 0 30px rgba(72, 207, 173, 0.8)', // ターコイズっぽい光
    '0 0 45px rgba(72, 207, 173, 0.6)',
    '0 0 60px rgba(72, 207, 173, 0.4)',
  ].join(', ');

  if (showChoiceSection) {
    return <InteractiveChoiceSection />;
  }

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white font-mono p-4 overflow-hidden">
      <div className="scanline-overlay"></div>

      <motion.div
        className="flex flex-col items-center justify-center w-full h-screen text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-5xl md:text-8xl font-bold tracking-widest flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, textShadow: glowingShadow }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 1 }}
              animate={isCracked ? {
                opacity: 0,
                y: (Math.random() - 0.5) * 200,
                x: (Math.random() - 0.5) * 600,
                rotate: (Math.random() - 0.5) * 270,
                scale: Math.random() * 1.2,
              } : {}}
              transition={{ duration: 0.8 + Math.random() * 0.4, ease: 'easeOut' }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
      </motion.div>
    </main>
  );
}