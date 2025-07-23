'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const ChoiceCards = () => {
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
    // ページが読み込まれた時にランダムなフレーズを1つ選択
    const randomIndex = Math.floor(Math.random() * phrases.length);
    setRandomPhrase(phrases[randomIndex]);
  }, []);

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {/* カードA */}
          <Link href="/bohemian-rhapsody" className="block md:w-1/3">
            <div className="bg-gray-100 p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
              <h3 className="text-xl font-semibold text-gray-800">ただ、観たいだけの夜</h3>
            </div>
          </Link>

          {/* カードB */}
          <Link href="/bandersnatch" className="block md:w-1/3">
            <div className="bg-gray-700 text-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
              <h3 className="text-xl font-semibold">意味を、考えてしまう夜</h3>
            </div>
          </Link>
        </div>

        {/* カードC */}
        <div className="mt-10">
          <Link href="/recent" className="text-gray-600 hover:text-black transition-colors duration-300">
            {randomPhrase}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ChoiceCards;