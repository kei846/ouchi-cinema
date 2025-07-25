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
    border 
    border-white 
    rounded-md
    cursor-pointer 
    transition-all 
    duration-300 
    text-center 
    text-white 
    bg-black 
    font-mono
    hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]
    hover:-translate-y-1
    ${isSelected ? 'animate-floatUp' : ''}
    ${isOtherSelected ? 'animate-sinkDown' : ''}
  `;

  return (
    <div className={cardClasses} onClick={onClick}>
      <p className="text-xl">{text}</p>
    </div>
  );
};

export default ChoiceCard;
