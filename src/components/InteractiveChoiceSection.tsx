
import React, { useState, useEffect } from 'react';
import TypingText from './TypingText';
import ChoiceCard from './ChoiceCard';

// Define the type for a choice
interface Choice {
  text: string;
  glowColor: string;
}

const choiceOptions: Choice[] = [
  { text: 'ただ観たい', glowColor: '#93c5fd' }, // soft blue
  { text: '意味を考える', glowColor: '#fef08a' }, // soft yellow
  { text: '音に沈む', glowColor: '#a78bfa' }, // dreamy purple
  { text: '誰かになりたい', glowColor: '#fca5a5' }, // soft red
  { text: 'ご褒美に', glowColor: '#fdba74' }, // warm orange
  { text: '世界の終わり', glowColor: '#6ee7b7' }, // mint green
  { text: 'もう戻れない', glowColor: '#fef08a' }, // soft yellow
  { text: '遠くへ行きたい', glowColor: '#93c5fd' }, // soft blue
  { text: '物語に酔う', glowColor: '#d8b4fe' }, // light purple
  { text: 'すべてを忘れる', glowColor: '#fca5a5' }, // soft red
  { text: '眠れない夜', glowColor: '#a78bfa' }, // dreamy purple
];

const getRandomChoices = (): Choice[] => {
  const shuffled = [...choiceOptions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
};

const InteractiveChoiceSection: React.FC = () => {
  const [stage, setStage] = useState('choose');
  const [choices, setChoices] = useState<Choice[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);

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
    setStage('selected');

    setTimeout(() => {
        setStage('outro');
    }, 2000); // Animation duration
  };

  return (
    <div className="interactive-choice-section text-center flex flex-col items-center justify-center h-screen bg-black">
      {stage === 'choose' && <TypingText text="Choose." />}
      
      {stage === 'cards' && (
        <div className="flex w-full max-w-screen-md flex-row justify-center gap-8 px-4">
          {choices.map((choice) => (
            <ChoiceCard 
              key={choice.text} 
              text={choice.text} 
              glowColor={choice.glowColor}
              onClick={() => handleChoice(choice)} 
              isSelected={false}
              isOtherSelected={false}
            />
          ))}
        </div>
      )}

      {stage === 'selected' && (
        <div className="flex w-full max-w-screen-md flex-row justify-center gap-8 px-4">
          {choices.map((choice) => (
            <ChoiceCard 
              key={choice.text} 
              text={choice.text} 
              glowColor={choice.glowColor}
              onClick={() => {}} 
              isSelected={selectedChoice?.text === choice.text}
              isOtherSelected={selectedChoice !== null && selectedChoice.text !== choice.text}
            />
          ))}
        </div>
      )}

      {stage === 'outro' && (
          <div className="text-white animate-fadeIn">
              <p className="text-2xl mb-4">{selectedChoice?.text}を選んだあなたへ</p>
              <a href="#" className="text-lg underline hover:text-gray-400">メインコンテンツへ</a>
          </div>
      )}
    </div>
  );
};

export default InteractiveChoiceSection;
