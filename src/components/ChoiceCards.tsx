'use client';

import { useState } from 'react';

const ChoiceCards = ({ onChoiceMade }: { onChoiceMade: (choice: string) => void }) => {
  const [animateOut, setAnimateOut] = useState(false);

  const handleChoice = (choice: string) => {
    setAnimateOut(true);
    setTimeout(() => onChoiceMade(choice), 600); // Duration of fade out animation
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 transition-colors duration-600 ease-in-out">
      <div className={`w-full max-w-md transition-all duration-600 ease-in-out ${animateOut ? 'opacity-0 -translate-y-10' : 'opacity-100'}`}>
        <button
          onClick={() => handleChoice('A')}
          className="w-full text-base py-3 px-4 border-2 border-gray-300 text-gray-800 hover:border-gray-500 hover:bg-gray-100 transition-all duration-600 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
        >
          ただ、観たいだけの夜
        </button>

        <div className="flex items-center justify-center my-6">
          <div className="w-1/3 h-px bg-gray-300"></div>
          <div className="mx-4 text-gray-500 text-sm">OR</div>
          <div className="w-1/3 h-px bg-gray-300"></div>
        </div>

        <button
          onClick={() => handleChoice('C')}
          className="w-full text-base py-3 px-4 border-2 border-gray-300 text-gray-800 hover:border-gray-500 hover:bg-gray-100 transition-all duration-600 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
        >
          意味を、考えてしまう夜
        </button>
      </div>
    </div>
  );
};

export default ChoiceCards;
