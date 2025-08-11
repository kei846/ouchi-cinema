
import React from 'react';

export default function HomePage() {
  return (
    <>
      <style>
        {`
        /* --- Global Styles & Variables --- */
        :root {
            --color-base: #0A0F2D;
            --color-main: #F2C94C;
            --color-accent-pink: #FF4081;
            --color-accent-cyan: #00E5FF;
            --color-text: #F5F5F5;
            --font-heading: 'Cinzel', serif;
            --font-body: 'Noto Sans JP', sans-serif;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            background-color: var(--color-base);
            color: var(--color-text);
            font-family: var(--font-body);
            line-height: 1.6;
        }

        h1, h2, h3 {
            font-family: var(--font-heading);
            color: var(--color-main);
            font-weight: 700;
            text-align: center;
            margin-bottom: 1rem;
        }

        section {
            padding: 6rem 2rem;
            overflow: hidden;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        /* --- 1. Intro Section (Curtain Animation) --- */
        .curtain {
            position: fixed;
            top: 0;
            width: 50vw;
            height: 100vh;
            background-color: #8B0000; /* Dark Red */
            z-index: 1000;
            transition: transform 1.5s cubic-bezier(0.77, 0, 0.175, 1);
        }
        .curtain-left {
            left: 0;
            transform-origin: left;
        }
        .curtain-right {
            right: 0;
            transform-origin: right;
        }
        .curtain.open {
            transform: scaleX(0);
        }

        .intro-section {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            text-align: center;
        }

        .intro-section .logo {
            font-family: var(--font-heading);
            font-size: 4rem;
            color: var(--color-accent-pink);
            text-shadow:
                0 0 5px var(--color-accent-pink),
                0 0 10px var(--color-accent-pink),
                0 0 20px var(--color-accent-pink),
                0 0 40px var(--color-accent-cyan),
                0 0 80px var(--color-accent-cyan);
            animation: flicker 3s infinite alternate;
        }

        @keyframes flicker {
            0%, 18%, 22%, 25%, 53%, 57%, 100% {
                text-shadow:
                    0 0 4px var(--color-accent-pink),
                    0 0 11px var(--color-accent-pink),
                    0 0 19px var(--color-accent-pink),
                    0 0 40px var(--color-accent-cyan),
                    0 0 80px var(--color-accent-cyan);
            }
            20%, 24%, 55% {
                text-shadow: none;
            }
        }

        .intro-section .tagline {
            font-size: 1.5rem;
            margin-top: 1rem;
            color: var(--color-main);
            letter-spacing: 2px;
        }

        .scroll-down {
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            color: var(--color-main);
            font-size: 2rem;
            animation: bounce 2s infinite;
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateX(-50%) translateY(0);
            }
            40% {
                transform: translateX(-50%) translateY(-20px);
            }
            60% {
                transform: translateX(-50%) translateY(-10px);
            }
        }

        /* --- 2. Now Showing Section --- */
        .now-showing-section {
            background: linear-gradient(rgba(10, 15, 45, 0.9), rgba(10, 15, 45, 0.9)), url('https://www.transparenttextures.com/patterns/dark-denim-3.png');
        }
        .now-showing-section h2 {
            font-size: 3rem;
            color: var(--color-main);
            border: 4px solid var(--color-main);
            padding: 1rem 2rem;
            display: inline-block;
            box-shadow: 0 0 15px var(--color-main), inset 0 0 15px var(--color-main);
            background-color: #1a1a1a;
            text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px var(--color-main);
        }

        .tabs {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin: 2rem 0;
        }

        .tab {
            background-color: var(--color-text);
            color: var(--color-base);
            padding: 0.75rem 1.5rem;
            border: 2px solid var(--color-main);
            border-radius: 8px;
            cursor: pointer;
            font-family: var(--font-heading);
            font-weight: bold;
            transition: all 0.3s ease;
            box-shadow: 5px 5px 0px var(--color-main);
        }

        .tab:hover, .tab.active {
            background-color: var(--color-main);
            color: var(--color-base);
            transform: translate(5px, 5px);
            box-shadow: none;
        }

        .movie-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
        }

        .movie-card {
            background-color: #1a203c;
            border: 8px solid #4a3a2a; /* Wood-like frame */
            border-radius: 4px;
            padding: 1rem;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 10px 20px rgba(0,0,0,0.4),
                        inset 0 0 15px rgba(0,0,0,0.5);
        }

        .movie-card:hover {
            transform: translateY(-10px);
            border-color: var(--color-main);
            box-shadow: 0 15px 30px rgba(0,0,0,0.6),
                        0 0 20px var(--color-main),
                        inset 0 0 15px rgba(0,0,0,0.5);
        }

        .movie-card img {
            width: 100%;
            height: 350px;
            object-fit: cover;
            border: 2px solid var(--color-main);
        }

        .movie-card h3 {
            margin-top: 1rem;
            font-size: 1.5rem;
        }

        .movie-card .hashtags {
            margin-top: 0.5rem;
            color: var(--color-accent-cyan);
            font-size: 0.9rem;
        }

        /* --- 3. Ticket Counter Section --- */
        .ticket-counter-section {
            text-align: center;
        }
        .ticket-counter-section h2 {
            font-size: 3rem;
        }
        .step {
            margin: 3rem 0;
        }
        .step h3 {
            font-size: 1.8rem;
            color: var(--color-text);
        }
        .options {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 1rem;
            margin-top: 1.5rem;
        }
        .option-btn {
            background-color: transparent;
            border: 2px solid var(--color-accent-pink);
            color: var(--color-accent-pink);
            padding: 1rem 2rem;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: 50px;
        }
        .option-btn:hover {
            background-color: var(--color-accent-pink);
            color: var(--color-text);
            box-shadow: 0 0 15px var(--color-accent-pink);
        }
        .vod-logo {
            width: 100px;
            height: 50px;
            background-color: #555;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            border-radius: 8px;
            border: 2px solid transparent;
            transition: border-color 0.3s;
        }
        .vod-logo:hover {
            border-color: var(--color-accent-cyan);
        }

        .ticket-lever {
            display: inline-block;
            margin-top: 2rem;
            padding: 1rem 3rem;
            font-family: var(--font-heading);
            font-size: 1.5rem;
            color: var(--color-base);
            background-color: var(--color-main);
            border: none;
            border-radius: 5px;
            cursor: pointer;
            position: relative;
            transition: all 0.2s ease;
            box-shadow: 0 6px #a88634;
        }
        .ticket-lever:hover {
            box-shadow: 0 4px #a88634;
            top: 2px;
        }
        .ticket-lever:active {
            box-shadow: 0 0 #a88634;
            top: 6px;
        }

        /* --- 4. Director's Voice Section --- */
        .directors-voice-section {
             background: linear-gradient(rgba(10, 15, 45, 0.95), rgba(10, 15, 45, 0.95)), url('https://www.transparenttextures.com/patterns/notebook-dark.png');
        }
        .directors-voice-section h2 {
            font-size: 3rem;
        }
        .articles-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2.5rem;
            margin-top: 3rem;
        }
        .article-quote {
            background-color: #f5f5dc; /* Beige */
            color: #333;
            padding: 2rem;
            border-radius: 4px;
            position: relative;
            box-shadow: 5px 5px 15px rgba(0,0,0,0.3);
            border-left: 5px solid var(--color-main);
        }
        .article-quote::before {
            content: '“';
            font-family: serif;
            font-size: 5rem;
            color: var(--color-main);
            opacity: 0.3;
            position: absolute;
            top: -1rem;
            left: 1rem;
        }
        .article-quote p {
            font-size: 1.1rem;
            margin-bottom: 1rem;
            position: relative;
            z-index: 1;
        }
        .article-quote .author {
            text-align: right;
            font-weight: bold;
            color: #555;
            margin-bottom: 1.5rem;
        }
        .article-quote .read-more {
            display: inline-block;
            color: var(--color-base);
            font-weight: bold;
            text-decoration: none;
            border-bottom: 2px solid var(--color-accent-pink);
            transition: color 0.3s;
        }
        .article-quote .read-more:hover {
            color: var(--color-accent-pink);
        }

        /* --- 5. Footer Section --- */
        .footer-section {
            background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://www.transparenttextures.com/patterns/brick-wall.png');
            text-align: center;
            padding: 4rem 2rem;
        }
        .footer-section h2 {
            font-size: 2.5rem;
        }
        .coming-soon-list {
            list-style: none;
            margin: 2rem 0;
            display: inline-block;
            text-align: left;
        }
        .coming-soon-list li {
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
        }
        .coming-soon-list li::before {
            content: '▶';
            color: var(--color-main);
            margin-right: 10px;
        }
        .social-links {
            margin: 2rem 0;
        }
        .social-icon {
            display: inline-block;
            margin: 0 1rem;
            width: 50px;
            height: 50px;
            line-height: 50px;
            border-radius: 50%;
            background-color: var(--color-main);
            color: var(--color-base);
            font-weight: bold;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        .social-icon:hover {
            transform: scale(1.1) rotate(10deg);
            box-shadow: 0 0 15px var(--color-main);
        }
        .copyright {
            font-size: 0.9rem;
            color: #aaa;
        }

        /* --- Responsive Design --- */
        @media (max-width: 768px) {
            h1, h2, h3 {
                font-size: 8vw;
            }
            .intro-section .logo {
                font-size: 10vw;
            }
            .intro-section .tagline {
                font-size: 1rem;
            }
            section {
                padding: 4rem 1rem;
            }
            .tabs {
                flex-direction: column;
            }
        }
        `}
      </style>
      
      {/* Curtain Effect */}
      <div className="curtain curtain-left"></div>
      <div className="curtain curtain-right"></div>

      {/* 1. Intro Section */}
      <section id="intro" className="intro-section">
          <h1 className="logo">OUCHI-CINEMA</h1>
          <p className="tagline">今日の一本、探しにきませんか？</p>
          <a href="#now-showing" className="scroll-down" aria-label="Scroll down">
              <span>&#8595;</span>
          </a>
      </section>

      {/* 2. Now Showing Section */}
      <section id="now-showing" className="now-showing-section">
          <div className="container">
              <h2>NOW SHOWING</h2>
              <div className="tabs">
                  <button className="tab active" data-genre="all">All</button>
                  <button className="tab" data-genre="drama">ヒューマンドラマ</button>
                  <button className="tab" data-genre="comedy">コメディ</button>
                  <button className="tab" data-genre="mystery">ミステリー</button>
              </div>
              <div className="movie-cards">
                  <a href="#" className="movie-card" data-genre="drama">
                      <img src="https://via.placeholder.com/300x450/0A0F2D/F2C94C?text=The+Great+Story" alt="映画ポスター1" />
                      <h3>偉大なる物語</h3>
                      <p className="hashtags">#感動 #人生の岐路</p>
                  </a>
                  <a href="#" className="movie-card" data-genre="comedy">
                      <img src="https://via.placeholder.com/300x450/0A0F2D/F2C94C?text=Laugh+Factory" alt="映画ポスター2" />
                      <h3>笑いの工場</h3>
                      <p className="hashtags">#爆笑 #ストレス発散</p>
                  </a>
                  <a href="#" className="movie-card" data-genre="mystery">
                      <img src="https://via.placeholder.com/300x450/0A0F2D/F2C94C?text=Shadow+Detective" alt="映画ポスター3" />
                      <h3>影の探偵</h3>
                      <p className="hashtags">#謎解き #驚きの結末</p>
                  </a>
                   <a href="#" className="movie-card" data-genre="drama">
                      <img src="https://via.placeholder.com/300x450/0A0F2D/F2C94C?text=Tears+of+Sun" alt="映画ポスター4" />
                      <h3>太陽の涙</h3>
                      <p className="hashtags">#家族愛 #泣ける</p>
                  </a>
              </div>
          </div>
      </section>

      {/* 3. Ticket Counter Section */}
      <section id="ticket-counter" className="ticket-counter-section">
          <div className="container">
              <h2>TICKET COUNTER</h2>
              <div className="step">
                  <h3>STEP 1: 今日の気分は？</h3>
                  <div className="options">
                      <button className="option-btn">号泣したい</button>
                      <button className="option-btn">スカッとしたい</button>
                      <button className="option-btn">恋したい</button>
                      <button className="option-btn">考えさせられたい</button>
                  </div>
              </div>
              <div className="step">
                  <h3>STEP 2: どの扉を開ける？</h3>
                  <div className="options">
                      <a href="#" className="vod-logo">VOD 1</a>
                      <a href="#" className="vod-logo">VOD 2</a>
                      <a href="#" className="vod-logo">VOD 3</a>
                      <a href="#" className="vod-logo">VOD 4</a>
                  </div>
              </div>
              <a href="#" className="ticket-lever">チケットを発券する</a>
          </div>
      </section>

      {/* 4. Director's Voice Section */}
      <section id="directors-voice" className="directors-voice-section">
          <div className="container">
              <h2>DIRECTOR'S VOICE</h2>
              <div className="articles-grid">
                  <div className="article-quote">
                      <p>「映画とは、他人の人生を2時間だけ生きることだ。そこに魔法が生まれる瞬間がある。」</p>
                      <div className="author">- A・ヒッチコック監督 -</div>
                      <a href="#" className="read-more">続きを読む</a>
                  </div>
                  <div className="article-quote">
                      <p>「観客が忘れていた感情を、暗闇の中で思い出させる。それが私の仕事さ。」</p>
                      <div className="author">- S・スピルバーグ監督 -</div>
                      <a href="#" className="read-more">続きを読む</a>
                  </div>
                  <div className="article-quote">
                      <p>「完璧な脚本などない。だが、完璧な”瞬間”はフィルムに焼き付けられる。」</p>
                      <div className="author">- 黒澤明監督 -</div>
                      <a href="#" className="read-more">続きを読む</a>
                  </div>
              </div>
          </div>
      </section>

      {/* 5. Footer Section */}
      <footer id="coming-soon" className="footer-section">
          <div className="container">
              <h2>COMING SOON</h2>
              <ul className="coming-soon-list">
                  <li>特集：90年代SF映画の輝き</li>
                  <li>インタビュー：若手俳優が語る転機の一本</li>
                  <li>考察：あの映画のラストシーンは本当に”夢”だったのか？</li>
              </ul>
              <div className="social-links">
                  <a href="#" className="social-icon" aria-label="X">X</a>
                  <a href="#" className="social-icon" aria-label="Instagram">IG</a>
              </div>
              <p className="copyright">&copy; 2025 OUCHI-CINEMA. All Rights Reserved.</p>
          </div>
      </footer>

      <script dangerouslySetInnerHTML={{ __html: `
        // --- Curtain Animation ---
        window.addEventListener('load', () => {
            const curtains = document.querySelectorAll('.curtain');
            setTimeout(() => {
                curtains.forEach(curtain => {
                    curtain.classList.add('open');
                });
            }, 500); // 0.5秒待ってから開く
        });

        // --- Now Showing Tab Functionality ---
        const tabs = document.querySelectorAll('.tab');
        const movieCards = document.querySelectorAll('.movie-card');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                // Add active class to the clicked tab
                tab.classList.add('active');

                const selectedGenre = tab.getAttribute('data-genre');

                movieCards.forEach(card => {
                    const cardGenre = card.getAttribute('data-genre');
                    if (selectedGenre === 'all' || selectedGenre === cardGenre) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
      `}} />
    </>
  );
}
