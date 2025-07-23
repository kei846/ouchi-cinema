'use client';

import { useState, useEffect } from 'react';
import InteractiveChoiceSection from '@/components/InteractiveChoiceSection';
import TypingText from '@/components/TypingText';
import { client } from '@/sanity/lib/client';
import { homepageQuery } from '@/sanity/lib/queries';

interface HomepageData {
  systemMessage: string;
  transitionMessage: string;
  choiceTitle: string;
  deepThinkButtonText: string;
  justWatchButtonText: string;
  deepThinkContent: any[]; // Sanity Portable Text
  justWatchContent: any[]; // Sanity Portable Text
}

export default function HomePage() {
  const [currentPhase, setCurrentPhase] = useState('loading'); // 'loading', 'systemMessage', 'transition', 'choiceUI'
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        console.log('Fetching homepage data from Sanity...');
        const data = await client.fetch<HomepageData>(homepageQuery);
        console.log('Data received from Sanity:', data);

        if (data) {
          setHomepageData(data);
          setCurrentPhase('systemMessage');
        } else {
          console.error('Homepage data is null or undefined. Check if a \'homepage\' document exists in Sanity Studio.');
          setCurrentPhase('error');
        }
      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
        // Fallback or error display
        setCurrentPhase('error');
      }
    };
    fetchHomepageData();
  }, []);

  const handleSystemMessageComplete = () => {
    console.log('[HomePage] System message typing complete. Transitioning to transition phase.');
    setCurrentPhase('transition');
  };

  const handleTransitionComplete = () => {
    console.log('[HomePage] Transition animation complete. Transitioning to choice UI phase.');
    setCurrentPhase('choiceUI');
  };

  if (currentPhase === 'loading') {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-mono p-4">
        <h1 className="text-4xl font-bold mb-8 text-green-500 animate-pulse-slow">
          <TypingText text="[ LOADING_HOMEPAGE_DATA... ]" speed={70} />
        </h1>
      </main>
    );
  }

  if (currentPhase === 'error') {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-mono p-4">
        <h1 className="text-4xl font-bold mb-8 text-red-500">
          Error loading homepage data.
        </h1>
      </main>
    );
  }

  if (!homepageData) {
    return null; // Should not happen if currentPhase is not 'loading' or 'error'
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-mono p-4 cinematic-bg">
      <div className="scanline-overlay"></div> {/* Scanline overlay */}

      {currentPhase === 'systemMessage' && (
        <div className="text-center bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 animate-fade-in">
          <h1 className="text-4xl font-bold mb-8 neon-text-green">
            <TypingText
              text={homepageData.systemMessage}
              speed={70}
              glitchChance={0.05}
              typoChance={0.02}
              conversionSteps={2}
              conversionSpeed={50}
              onComplete={handleSystemMessageComplete}
            />
          </h1>
        </div>
      )}

      {currentPhase === 'transition' && (
        <div className="text-center bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 animate-fade-in">
          <h1 className="text-4xl font-bold mb-8 neon-text-red">
            <TypingText
              text={homepageData.transitionMessage}
              speed={50}
              glitchChance={0.5}
              typoChance={0.3}
              conversionSteps={10}
              conversionSpeed={20}
              onComplete={handleTransitionComplete}
            />
          </h1>
        </div>
      )}

      {currentPhase === 'choiceUI' && (
        <InteractiveChoiceSection
          choiceTitle={homepageData.choiceTitle}
          deepThinkButtonText={homepageData.deepThinkButtonText}
          justWatchButtonText={homepageData.justWatchButtonText}
          deepThinkContent={homepageData.deepThinkContent}
          justWatchContent={homepageData.justWatchContent}
        />
      )}
    </main>
  );
}