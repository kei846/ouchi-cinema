
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TypingText from './TypingText';
import ChoiceCard from './ChoiceCard';

// Define the type for a choice
interface Choice {
  text: string;
  glowColor: string;
  slug: string;
}

const choiceOptions: Choice[] = [
  { text: 'ただ観たい', glowColor: '#93c5fd', slug: '/casual' },       // soft blue
  { text: '意味を考える', glowColor: '#fef08a', slug: '/meaning' },     // soft yellow
  { text: '音に沈む', glowColor: '#a78bfa', slug: '/sound' },          // dreamy purple
  { text: '誰かになりたい', glowColor: '#fca5a5', slug: '/not-me' },   // soft red
  { text: 'ご褒美に', glowColor: '#fdba74', slug: '/reward' },          // warm orange
  { text: '世界の終わり', glowColor: '#6ee7b7', slug: '/end' },      // mint green
  { text: 'もう戻れない', glowColor: '#fef08a', slug: '/nostalgia' },     // soft yellow
  { text: '遠くへ行きたい', glowColor: '#93c5fd', slug: '/escape' },    // soft blue
  { text: '物語に酔う', glowColor: '#d8b4fe', slug: '/story' },        // light purple
  { text: 'すべて忘れる', glowColor: '#fca5a5', slug: '/reset' },      // soft red
  { text: '眠れない夜', glowColor: '#a78bfa', slug: '/sleepless' },        // dreamy purple
];

const getRandomChoices = (): Choice[] => {
  const shuffled = [...choiceOptions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
};

const InteractiveChoiceSection: React.FC = () => {
  const [stage, setStage] = useState('choose');
  const [choices, setChoices] = useState<Choice[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (stage === 'choose') {
      const timer = setTimeout(() => {
        setStage('cards');
        setChoices(getRandomChoices());
      }, 3000); // Duration for "Choose." text
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleChoice = (choice: Choice) => {
    setSelectedChoice(choice);
    // Immediately redirect to the article page
    router.push(choice.slug);
  };

  return (
    <div className="interactive-choice-section text-center flex flex-col items-center justify-center h-screen bg-black">
      {stage === 'choose' && <TypingText text="Choose." />}
      
      {stage === 'cards' && (
        <div className="jrpg-choice-container">
          {choices.map((choice) => (
            <ChoiceCard 
              key={choice.slug} 
              text={choice.text} 
              onClick={() => handleChoice(choice)} 
              isSelected={selectedChoice?.slug === choice.slug}
            />
          ))}
        </div>
      )}

      {/* Selected stage is now handled by immediate redirect, so no separate rendering needed */}
      {/* Outro stage is also handled by immediate redirect */}
    </div>
  );
};

export default InteractiveChoiceSection;
