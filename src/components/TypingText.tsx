'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number; // Base speed per character
  glitchChance?: number; // 0-1, chance of a glitch character appearing before conversion
  typoChance?: number; // 0-1, chance of a temporary typo before conversion
  conversionSteps?: number; // How many random characters to show during conversion
  conversionSpeed?: number; // Speed of each step in conversion
  onComplete?: () => void; // Callback function when typing is complete
}

const TypingText: React.FC<TypingTextProps> = ({
  text,
  speed = 100,
  glitchChance = 0.1,
  typoChance = 0.05,
  conversionSteps = 3,
  conversionSpeed = 40,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentTypingChar, setCurrentTypingChar] = useState(''); // The temporary char (glitch/typo/conversion)
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const charIndexRef = useRef(0); // Use a ref to persist charIndex across renders

  const getRandomNonJapaneseChar = useCallback(() => {
    const charCode = Math.floor(Math.random() * (126 - 33 + 1)) + 33;
    return String.fromCharCode(charCode);
  }, []);

  const typeNextChar = useCallback(() => {
    if (charIndexRef.current < text.length) {
      const originalChar = text.charAt(charIndexRef.current);
      let delayBeforeNextStep = speed; // Default delay for the next step

      // Glitch/Typo logic
      const willGlitch = Math.random() < glitchChance;
      const willTypo = !willGlitch && Math.random() < typoChance;

      if (willGlitch) {
        setCurrentTypingChar(getRandomNonJapaneseChar());
        delayBeforeNextStep = speed / 2; // Short display for glitch
      } else if (willTypo) {
        setCurrentTypingChar(getRandomNonJapaneseChar());
        delayBeforeNextStep = speed * 1.5; // Longer display for typo
      }

      // Schedule the display of the temporary char (if any) and then the conversion/final char
      timeoutRef.current = setTimeout(() => {
        setCurrentTypingChar(''); // Clear temporary char after its display duration

        // Conversion animation
        let currentConversionStep = 0;
        const runConversionStep = () => {
          if (currentConversionStep < conversionSteps) {
            setCurrentTypingChar(getRandomNonJapaneseChar());
            currentConversionStep++;
            timeoutRef.current = setTimeout(runConversionStep, conversionSpeed);
          } else {
            // Conversion complete, display original char and move to next index
            setDisplayedText((prev) => prev + originalChar);
            setCurrentTypingChar(''); // Clear conversion char
            charIndexRef.current++; // Increment ref directly
            // Schedule the next character typing
            timeoutRef.current = setTimeout(typeNextChar, speed); // Continue typing after base speed
          }
        };

        // Start conversion if needed, otherwise directly display original char
        if (willGlitch || willTypo || conversionSteps > 0) {
          runConversionStep();
        } else {
          setDisplayedText((prev) => prev + originalChar);
          charIndexRef.current++; // Increment ref directly
          // Schedule the next character typing
          timeoutRef.current = setTimeout(typeNextChar, speed); // Continue typing after base speed
        }
      }, delayBeforeNextStep); // This delay accounts for glitch/typo display time
    } else {
      // All characters typed
      setIsTypingComplete(true);
      setCurrentTypingChar(''); // Ensure no temporary char remains
      if (onComplete) {
        onComplete();
      }
    }
  }, [text, speed, glitchChance, typoChance, conversionSteps, conversionSpeed, getRandomNonJapaneseChar, onComplete]);

  useEffect(() => {
    // Reset state when text prop changes
    setDisplayedText('');
    setCurrentTypingChar('');
    setIsTypingComplete(false);
    charIndexRef.current = 0;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Start typing only if not already complete and we are at the beginning of the text
    // This ensures the typing process starts only once per `text` prop change.
    if (charIndexRef.current === 0 && !isTypingComplete) {
      typeNextChar();
    }

    // Cleanup function to clear timeout if component unmounts or dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, isTypingComplete, typeNextChar]); // Dependencies

  return (
    <>
      {displayedText}
      {currentTypingChar} {/* Display the temporary glitch/typo/conversion character */}
      {!isTypingComplete && <span className="animate-blink">|</span>}
    </>
  );
};

export default TypingText;
