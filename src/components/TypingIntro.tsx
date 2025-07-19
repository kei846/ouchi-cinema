'use client';

import { useState, useEffect } from 'react';

const sentences = [
  'なぜ、あなたはここに来たのですか？',
  'あなたの探しているものは何ですか？',
  'この場所で、それを見つけられるでしょうか？',
];

const TypingIntro = ({ onTypingComplete }: { onTypingComplete: () => void }) => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentSentenceIndex < sentences.length) {
      const currentSentence = sentences[currentSentenceIndex];
      let charIndex = 0;
      setDisplayedText(''); // Clear text for new sentence

      const typingInterval = setInterval(() => {
        if (charIndex < currentSentence.length) {
          setDisplayedText((prev) => prev + currentSentence[charIndex]);
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          // Wait for 0.8s before moving to the next sentence or completing
          setTimeout(() => {
            if (currentSentenceIndex < sentences.length - 1) {
              setCurrentSentenceIndex((prev) => prev + 1);
              setIsTyping(true);
            } else {
              // All sentences typed, hide cursor and notify parent
              setShowCursor(false);
              setTimeout(onTypingComplete, 600); // Duration for fade out
            }
          }, 800); // 0.8 seconds delay between sentences
        }
      }, 70); // Typing speed per character

      return () => clearInterval(typingInterval);
    }
  }, [currentSentenceIndex, onTypingComplete]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-white transition-colors duration-600 ease-in-out">
      <p className="font-serif text-gray-800 text-xl md:text-2xl lg:text-3xl h-[1.5em] opacity-0 animate-fadeInUp">
        {displayedText}
        {showCursor && isTyping && <span className="animate-pulse">|</span>}
      </p>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TypingIntro;
