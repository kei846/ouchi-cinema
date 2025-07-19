'use client';

import { useState, useEffect } from 'react';
import TypingIntro from '@/components/TypingIntro';
import ChoiceCards from '@/components/ChoiceCards';
import GravityBridge from '@/components/GravityBridge';
import Section1_Intro from '@/components/Section1_Intro';
import Section2_ABC from '@/components/Section2_ABC';
import Section3_EmotionCards from '@/components/Section3_EmotionCards';
import Section4_AboutOuchi from '@/components/Section4_AboutOuchi';
import Section5_Recent from '@/components/Section5_Recent';
import Section6_Outro from '@/components/Section6_Outro';

export default function HomePage() {
  const [step, setStep] = useState('typing'); // typing, choice, bridge, content
  const [choice, setChoice] = useState<string | null>(null);

  const handleTypingComplete = () => {
    setTimeout(() => setStep('choice'), 600); // Delay before showing choices
  };

  useEffect(() => {
    let choiceTimeout: NodeJS.Timeout;
    if (step === 'choice' && !choice) {
      choiceTimeout = setTimeout(() => {
        setStep('bridge');
      }, 10000); // 10 seconds to make a choice
    }
    return () => clearTimeout(choiceTimeout);
  }, [step, choice]);

  const handleChoiceMade = (userChoice: string) => {
    setChoice(userChoice);
    setTimeout(() => setStep('content'), 600); // Duration for fade out animation in ChoiceCards
  };

  const renderStep = () => {
    switch (step) {
      case 'typing':
        return <TypingIntro onTypingComplete={handleTypingComplete} />;
      case 'choice':
        return <ChoiceCards onChoiceMade={handleChoiceMade} />;
      case 'bridge':
        return <GravityBridge />;
      case 'content':
        return (
          <main className="bg-white transition-colors duration-600 ease-in-out">
            <Section1_Intro />
            <Section2_ABC />
            <Section3_EmotionCards />
            <Section4_AboutOuchi />
            <Section5_Recent />
            <Section6_Outro />
          </main>
        );
      default:
        return <TypingIntro onTypingComplete={handleTypingComplete} />;
    }
  };

  return <div className="bg-white transition-colors duration-600 ease-in-out">{renderStep()}</div>;
}