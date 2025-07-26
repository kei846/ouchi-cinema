import React from 'react';

interface ChoiceCardProps {
  text: string;
  onClick: () => void;
  isSelected: boolean;
  isOtherSelected: boolean;
  glowColor: string;
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({ text, onClick, isSelected, isOtherSelected, glowColor }) => {
  const baseClasses = `
    btn-memory
    ${isSelected ? 'animate-floatUp' : ''}
    ${isOtherSelected ? 'animate-sinkDown' : ''}
  `;

  return (
    <div className={baseClasses} onClick={onClick} style={{ '--glow-color': glowColor } as React.CSSProperties}>
      {text}
    </div>
  );
};

export default ChoiceCard;
