'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { PortableText } from '@portabletext/react';

interface InteractiveChoiceSectionProps {
  choiceTitle: string;
  deepThinkButtonText: string;
  justWatchButtonText: string;
  deepThinkContent: any[];
  justWatchContent: any[];
}

export default function InteractiveChoiceSection({
  choiceTitle,
  deepThinkButtonText,
  justWatchButtonText,
  deepThinkContent,
  justWatchContent,
}: InteractiveChoiceSectionProps) {
  const [choice, setChoice] = useState<string | null>(null);
  const glitchControls = useAnimation();

  useEffect(() => {
    const interval = setInterval(async () => {
      await glitchControls.start({
        animation: 'thriller-glitch 0.5s ease-in-out',
      });
      await glitchControls.start({
        animation: 'none',
      });
    }, 5000); // 5秒ごとにノイズ効果をトリガー

    return () => clearInterval(interval);
  }, [glitchControls]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  const buttonHover = { scale: 1.05, y: -5 };
  const buttonTap = { scale: 0.95 };

  return (
    <section className="p-4">
      <AnimatePresence mode="wait">
        {!choice ? (
          <motion.div
            key="choice-selection"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-black bg-opacity-20 backdrop-blur-lg p-12 rounded-2xl shadow-2xl border border-gray-700/50"
          >
            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-8 text-green-400 glitch-text text-center"
              data-text={choiceTitle} // グリッチ効果のためにdata-textを設定
              animate={glitchControls} // useAnimationで制御
            >
              {/* テキストはdata-text属性でレンダリングされるため、ここでは空にする */}
            </motion.h1>
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-6">
              <motion.button
                onClick={() => setChoice('deep-think')}
                className="px-8 py-4 text-lg rounded-lg shadow-lg bg-gray-800 text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                {deepThinkButtonText}
              </motion.button>
              <motion.button
                onClick={() => setChoice('just-watch')}
                className="px-8 py-4 text-lg rounded-lg shadow-lg bg-gray-800 text-white border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                {justWatchButtonText}
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="choice-result"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-4xl bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700"
          >
            {choice === 'deep-think' && (
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold mb-4 text-green-400">
                  <TypingText text="> MODE: DEEP_THINK" speed={80} />
                </h2>
                <div className="prose prose-invert text-left text-green-300/90">
                  <PortableText value={deepThinkContent} />
                </div>
              </motion.div>
            )}
            {choice === 'just-watch' && (
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold mb-4 text-blue-400">
                  <TypingText text="> MODE: JUST_WATCH" speed={80} />
                </h2>
                <div className="prose prose-invert text-left text-blue-300/90">
                  <PortableText value={justWatchContent} />
                </div>
              </motion.div>
            )}
            <motion.button
              onClick={() => setChoice(null)}
              className="mt-8 px-6 py-3 rounded-lg bg-gray-700 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              &lt; Back
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}