"use client";

import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

const IntroSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [fadeOutSpinner, setFadeOutSpinner] = useState(false);

  useEffect(() => {
    const loadingDuration = 2000; // 2 seconds for initial loading
    const spinnerFadeOutDuration = 1000; // 1 second for spinner fade out

    // Start spinner fade out after loadingDuration
    const spinnerFadeOutTimer = setTimeout(() => {
      setFadeOutSpinner(true);
    }, loadingDuration);

    // Call onComplete after fade out completes
    const completeTimer = setTimeout(() => {
      onComplete();
    }, loadingDuration + spinnerFadeOutDuration);

    return () => {
      clearTimeout(spinnerFadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <LoadingSpinner className={fadeOutSpinner ? 'fade-out' : ''} />
    </div>
  );
};

export default IntroSequence;