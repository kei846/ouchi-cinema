import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  duration?: number;
  onComplete?: () => void;
}

const TypingText: React.FC<TypingTextProps> = ({ text, duration = 200, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, duration);
      return () => clearTimeout(timeoutId);
    } else if (onComplete) {
      onComplete();
    }
  }, [displayedText, text, duration, onComplete]);

  return (
    <div className="typing-text-container">
      <p className="text-4xl font-bold text-white">{displayedText}</p>
    </div>
  );
};

export default TypingText;