'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface ChoicePair {
  left: string;
  right: string;
}

const choicePairs: ChoicePair[] = [
  { left: 'ただ観たいだけの夜', right: '意味を、考えてしまう夜' },
  { left: '音に沈みたい夜', right: '自分じゃない誰かになりたい夜' },
  { left: '頑張った日のご褒美に', right: '世界の終わりを見届けたい夜' },
  { left: 'もう戻れない夜', right: 'どこか遠くへ行きたい夜' },
  { left: '物語に酔いたい夜', right: 'すべてを忘れたい夜' },
  { left: '眠れない夜に', right: 'ひらめきを探してる夜' },
  { left: 'パズルを解きたい夜', right: '何かに賭けたい夜' },
];

export default function ChoiceSection() {
  const [currentChoice, setCurrentChoice] = useState<ChoicePair | null>(null);
  const buttonControls = useAnimation();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * choicePairs.length);
    setCurrentChoice(choicePairs[randomIndex]);
  }, []);

  const handleButtonClick = (choice: string) => {
    console.log(`Selected: ${choice}`);
    // 今後のクリック分岐処理をここに記述
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    hover: { scale: 1.05, boxShadow: '0 0 15px rgba(255,255,255,0.5)', transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  if (!currentChoice) {
    return null; // データがロードされるまで何も表示しない
  }

  return (
    <motion.div
      className="flex flex-col md:flex-row gap-6 mt-8"
      initial="hidden"
      animate="visible"
      variants={buttonVariants}
    >
      <motion.button
        onClick={() => handleButtonClick(currentChoice.left)}
        className="px-8 py-4 text-lg rounded-lg bg-transparent text-white border border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        whileHover="hover"
        whileTap="tap"
      >
        {currentChoice.left}
      </motion.button>
      <motion.button
        onClick={() => handleButtonClick(currentChoice.right)}
        className="px-8 py-4 text-lg rounded-lg bg-transparent text-white border border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        whileHover="hover"
        whileTap="tap"
      >
        {currentChoice.right}
      </motion.button>
    </motion.div>
  );
}