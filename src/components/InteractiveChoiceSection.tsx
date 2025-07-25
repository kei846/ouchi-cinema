
import React, { useState, useEffect } from 'react';
import TypingText from './TypingText';
import ChoiceCard from './ChoiceCard';

const choiceOptions = [
  'ただ、観たいだけの夜',
  '意味を、考えてしまう夜',
  '音に沈みたい夜',
  '自分じゃない誰かになりたい夜',
  '頑張った日のご褒美に',
  '世界の終わりを見届けたい夜',
  'もう戻れない夜',
  'どこか遠くへ行きたい夜',
  '物語に酔いたい夜',
  'すべてを忘れたい夜',
  '眠れない夜に',
];

const getRandomChoices = () => {
  const shuffled = [...choiceOptions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
};

const InteractiveChoiceSection: React.FC = () => {
  const [stage, setStage] = useState('choose');
  const [choices, setChoices] = useState<string[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  useEffect(() => {
    if (stage === 'choose') {
      const timer = setTimeout(() => {
        setStage('cards');
        setChoices(getRandomChoices());
      }, 3000); // Duration for "Choose." text
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleChoice = (choice: string) => {
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
        <div className="flex flex-col md:flex-row gap-8">
          {choices.map((choice) => (
            <ChoiceCard 
              key={choice} 
              text={choice} 
              onClick={() => handleChoice(choice)} 
              isSelected={false}
              isOtherSelected={false}
            />
          ))}
        </div>
      )}

      {stage === 'selected' && (
        <div className="flex flex-col md:flex-row gap-8">
          {choices.map((choice) => (
            <ChoiceCard 
              key={choice} 
              text={choice} 
              onClick={() => {}} 
              isSelected={selectedChoice === choice}
              isOtherSelected={selectedChoice !== null && selectedChoice !== choice}
            />
          ))}
        </div>
      )}

      {stage === 'outro' && (
          <div className="text-white animate-fadeIn">
              <p className="text-2xl mb-4">{selectedChoice}を選んだあなたへ</p>
              <a href="#" className="text-lg underline hover:text-gray-400">メインコンテンツへ</a>
          </div>
      )}
    </div>
  );
};

export default InteractiveChoiceSection;
