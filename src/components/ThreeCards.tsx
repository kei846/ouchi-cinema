"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

const ThreeCards = () => {
  const [randomPhrase, setRandomPhrase] = useState('');

  const phrases = [
    "あ、もう選ばされたくない人はこちら →",
    "ただいま。続きはこちら →",
    "観たい映画、決まってる人はこちら",
    "毎回これ選ぶの、そろそろ面倒でしょ？ →",
    "あなた、こっち派ですよね？",
    "今日も来たね。入場どうぞ →",
    "“選択”はもう終わってるのかもしれない →",
    "選ぶことすら、選ばされたくない夜に →",
    "この下に“答え”があります →",
    "うしろの扉、そっと開けときました →"
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    setRandomPhrase(phrases[randomIndex]);
  }, []);

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-center md:space-x-8 space-y-8 md:space-y-0">
          {/* Card A */}
          <Link href="/bohemian-rhapsody" className="group block md:w-1/3">
            <div className="bg-[#f6f5f2] p-8 rounded-lg shadow-md h-full flex flex-col justify-between transform transition-transform duration-300 ease-in-out group-hover:-translate-y-2">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">ただ、観たいだけの夜</h3>
                <p className="text-gray-600">『ボヘミアン・ラプソディ』へ</p>
              </div>
            </div>
          </Link>

          {/* Card B */}
          <Link href="/bandersnatch" className="group block md:w-1/3">
            <div className="bg-[#3e7cab] text-white p-8 rounded-lg shadow-md h-full flex flex-col justify-between transform transition-transform duration-300 ease-in-out group-hover:translate-y-1">
              <div>
                <h3 className="text-2xl font-semibold mb-2">意味を、考えてしまう夜</h3>
                <p className="opacity-90">『バンダースナッチ』へ</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Card C */}
        <div className="text-center mt-12">
          <Link href="/recent" className="text-gray-500 hover:text-blue-600 transition-colors duration-300 text-sm sm:text-base">
            {randomPhrase}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThreeCards;
