'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import InteractiveChoiceSection from '@/components/InteractiveChoiceSection';
import TypingText from '@/components/TypingText';
import { client } from '@/sanity/lib/client';
import { homepageQuery } from '@/sanity/lib/queries';

interface HomepageData {
  choiceTitle: string;
  deepThinkButtonText: string;
  justWatchButtonText: string;
  deepThinkContent: any[];
  justWatchContent: any[];
}

export default function HomePage() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showChoice, setShowChoice] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sanityData = await client.fetch<HomepageData>(homepageQuery);
        setData(sanityData);
      } catch (error) {
        console.error('Failed to fetch homepage data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTypingComplete = () => {
    setTimeout(() => {
      setShowChoice(true);
    }, 500); // 0.5秒待ってから選択肢を表示
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  if (isLoading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-mono p-4">
        <TypingText text="Loading..." />
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-900 text-white font-mono p-4 cinematic-bg">
      <div className="scanline-overlay"></div>

      {/* Hero Section */}
      <motion.div
        className="flex flex-col items-center justify-center w-full h-screen text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-green-400 glitch-text" data-text="How are you feeling today?">
          <TypingText text="How are you feeling today?" onComplete={handleTypingComplete} />
        </motion.h1>
      </motion.div>

      {/* Choice Section (conditionally rendered) */}
      {showChoice && data && (
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <InteractiveChoiceSection
            choiceTitle={data.choiceTitle}
            deepThinkButtonText={data.deepThinkButtonText}
            justWatchButtonText={data.justWatchButtonText}
            deepThinkContent={data.deepThinkContent}
            justWatchContent={data.justWatchContent}
          />
        </motion.div>
      )}
    </main>
  );
}