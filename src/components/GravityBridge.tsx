'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const GravityBridge = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8 text-center transition-colors duration-600 ease-in-out">
      <p className={`text-gray-700 text-xl md:text-2xl mb-4 transition-opacity duration-600 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        [選択されませんでした]
      </p>
      <p className={`text-gray-600 text-lg md:text-xl mb-8 transition-opacity duration-600 ease-in-out delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        静かに、別の時間軸が起動します。
      </p>
      <Link href="/content" passHref>
        <span className={`text-blue-600 hover:underline cursor-pointer text-base md:text-lg transition-opacity duration-600 ease-in-out delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          ...新しい物語へ
        </span>
      </Link>
    </div>
  );
};

export default GravityBridge;
