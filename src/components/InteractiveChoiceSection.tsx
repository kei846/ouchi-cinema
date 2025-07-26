
import React, { useState, useEffect } from 'react';
import TypingText from './TypingText';
import ChoiceCard from './ChoiceCard';

// Define the type for a choice
interface Choice {
  text: string;
  glowColor: string;
}

const choiceOptions: Choice[] = [
  { text: 'ただ、観たいだけの夜', glowColor: '#93c5fd' }, // soft blue
  { text: '意味を、考えてしまう夜', glowColor: '#fef08a' }, // soft yellow
  { text: '音に沈みたい夜', glowColor: '#a78bfa' }, // dreamy purple
  { text: '自分じゃない誰かになりたい夜', glowColor: '#fca5a5' }, // soft red
  { text: '頑張った日のご褒美に', glowColor: '#fdba74' }, // warm orange
  { text: '世界の終わりを見届けたい夜', glowColor: '#6ee7b7' }, // mint green
  { text: 'もう戻れない夜', glowColor: '#fef08a' }, // soft yellow
  { text: 'どこか遠くへ行きたい夜', glowColor: '#93c5fd' }, // soft blue
  { text: '物語に酔いたい夜', glowColor: '#d8b4fe' }, // light purple
  { text: 'すべてを忘れたい夜', glowColor: '#fca5a5' }, // soft red
  { text: '眠れない夜に', glowColor: '#a78bfa' }, // dreamy purple
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
