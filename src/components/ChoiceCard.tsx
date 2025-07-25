import React from 'react';

interface ChoiceCardProps {
  text: string;
  onClick: () => void;
  isSelected: boolean;
  isOtherSelected: boolean;
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({ text, onClick, isSelected, isOtherSelected }) => {
  const cardClasses = `
    choice-card 
    px-10 py-5
    border-2
    rounded-md
    cursor-pointer 
    transition-all 
    duration-300 
    text-center 
    text-white 
    bg-black 
    font-mono
    animate-pulse-glow
    hover:animate-shake
    hover:shadow-[0_0_25px_rgba(255,255,255,0.8)]
    hover:-translate-y-1
    hover:rotate-[-1deg]
    ${isSelected ? 'animate-floatUp border-white' : 'border-white'}
    ${isOtherSelected ? 'animate-sinkDown' : ''}
  `;

  return (
    <div className={cardClasses} onClick={onClick}>
      <p className="text-xl">{text}</p>
    </div>
  );
};

export default ChoiceCard;
