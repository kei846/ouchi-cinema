'use client';

import { useState } from 'react';
import TypingText from './TypingText';
import { PortableText } from '@portabletext/react';

interface InteractiveChoiceSectionProps {
  choiceTitle: string;
  deepThinkButtonText: string;
  justWatchButtonText: string;
  deepThinkContent: any[];
  justWatchContent: any[];
}

export default function InteractiveChoiceSection({
  choiceTitle,
  deepThinkButtonText,
  justWatchButtonText,
  deepThinkContent,
  justWatchContent,
}: InteractiveChoiceSectionProps) {
  const [choice, setChoice] = useState<string | null>(null);

  const buttonClass = "px-8 py-4 text-xl rounded-md shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-75 active:scale-95";
  const deepThinkButtonColors = "bg-gray-800 text-white border border-neon-green hover:shadow-neon-green focus:ring-neon-green";
  const justWatchButtonColors = "bg-gray-800 text-white border border-neon-blue hover:shadow-neon-blue focus:ring-neon-blue";
  const backButtonColors = "bg-gray-700 text-white border border-gray-500 hover:shadow-gray-500 focus:ring-gray-400";

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-white font-mono p-4">
      {!choice ? (
        <div className="text-center bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-700 animate-fade-in">
          <h1 className="text-4xl font-bold mb-8 neon-text-green animate-pulse-slow">
            <TypingText text={choiceTitle} speed={150} />
          </h1>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6">
            <button
              onClick={() => setChoice('deep-think')}
              className={`${buttonClass} ${deepThinkButtonColors}`}
            >
              {deepThinkButtonText}
            </button>
            <button
              onClick={() => setChoice('just-watch')}
              className={`${buttonClass} ${justWatchButtonColors}`}
            >
              {justWatchButtonText}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-700 animate-fade-in">
          {choice === 'deep-think' && (
            <div className="text-center p-4">
              <h2 className="text-3xl font-bold mb-4 neon-text-green">
                <TypingText text="> MODE: DEEP_THINK" speed={100} />
              </h2>
              <div className="text-lg text-green-300 mt-2">
                <PortableText value={deepThinkContent} />
              </div>
            </div>
          )}
          {choice === 'just-watch' && (
            <div className="text-center p-4">
              <h2 className="text-3xl font-bold mb-4 neon-text-blue">
                <TypingText text="> MODE: JUST_WATCH" speed={100} />
              </h2>
              <div className="text-lg text-blue-300 mt-2">
                <PortableText value={justWatchContent} />
              </div>
            </div>
          )}
          <button
            onClick={() => setChoice(null)}
            className={`mt-8 px-6 py-3 rounded-md transition duration-200 ${backButtonColors}`}
          >
            &lt; BACK
          </button>
        </div>
      )}
    </section>
  );
}
