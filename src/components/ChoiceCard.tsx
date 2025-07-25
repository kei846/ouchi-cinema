import React from 'react';

interface ChoiceCardProps {
  text: string;
  onClick: () => void;
  isSelected: boolean;
  isOtherSelected: boolean;
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({ text, onClick, isSelected, isOtherSelected }) => {
  const baseClasses = `
    choice-card
    flex-1
    min-width[240px]
    p-8
    border-2
    border-white
    rounded-lg
    cursor-pointer
    transition-all
    duration-300
    text-center
    text-gray-300
    bg-black
    font-mono
    choice-card-idle
    choice-card-hover
  `;

  const stateClasses = `
    ${isSelected ? 'animate-floatUp' : ''}
    ${isOtherSelected ? 'animate-sinkDown' : ''}
  `;

  return (
    <div className={`${baseClasses} ${stateClasses}`} onClick={onClick}>
      <p className="text-lg md:text-xl">{text}</p>
    </div>
  );
};

export default ChoiceCard;
