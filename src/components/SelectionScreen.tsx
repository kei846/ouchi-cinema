import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Choice {
  text: string;
  link: string;
}

interface SelectionScreenProps {
  choices: Choice[];
  onComplete: () => void;
}

const SelectionScreen: React.FC<SelectionScreenProps> = ({ choices, onComplete }) => {
  const router = useRouter();
  const [randomChoices, setRandomChoices] = useState<Choice[]>([]);

  useEffect(() => {
    if (choices && choices.length > 1) {
      const shuffled = [...choices].sort(() => 0.5 - Math.random());
      setRandomChoices(shuffled.slice(0, 2));
    }
  }, [choices]);

  const handleChoiceClick = (link: string) => {
    onComplete();
    router.push(link);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.8, delayChildren: 0.5 },
    },
  };

  const choiceVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: 'easeInOut' },
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <motion.div
        className="flex flex-col items-center space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {randomChoices.map((choice, index) => (
          <motion.div
            key={index}
            variants={choiceVariants}
            className="cursor-pointer text-2xl text-white transition-transform duration-300 hover:scale-105"
            style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.7)' }}
            onClick={() => handleChoiceClick(choice.link)}
          >
            {choice.text}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SelectionScreen;