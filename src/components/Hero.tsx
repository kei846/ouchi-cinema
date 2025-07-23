"use client";
import { useState, useEffect } from 'react';

const Hero = () => {
  const lines = [
    '観たい映画、溜まってく一方で',
    '今日もまた、サブスクを開いては閉じる',
    '「映画　おすすめ」で検索して',
    '出てくるのは、また “5選”',
    '気づいたら、寝てる。',
    'そんな日はもう嫌だ。',
  ];

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (currentLineIndex < lines.length) {
      const timer = setTimeout(() => {
        setDisplayText(lines[currentLineIndex]);
        setCurrentLineIndex(currentLineIndex + 1);
      }, 2000); // 2秒ごとに次の行を表示

      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, lines]);

  return (
    <section className="bg-[#f6f5f2] py-20">
      <div className="container mx-auto text-center">
        <div className="font-georgia text-2xl text-gray-800">
          {lines.map((line, index) => (
            <p key={index} className={`transition-opacity duration-1000 ${index <= currentLineIndex -1 ? 'opacity-100' : 'opacity-0'}`}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;