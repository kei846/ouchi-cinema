import React from 'react';

interface ChoiceCardProps {
  text: string;
  onClick: () => void;
  isSelected: boolean;
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({ text, onClick, isSelected }) => {
  const baseClasses = `
    jrpg-choice-button
    ${isSelected ? 'selected' : ''}
  `;

  return (
    <button className={baseClasses} onClick={onClick}>
      {text}
    </button>
  );
};

export default ChoiceCard;
