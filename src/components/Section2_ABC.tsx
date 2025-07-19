const Section2_ABC = () => (
  <div className="py-20 bg-white px-4">
    <h2 className="text-3xl font-helvetica font-bold text-center mb-12">あなたはどのタイプ？</h2>
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Card A */}
      <div className="border p-6 rounded-lg shadow-lg bg-background">
        <h3 className="font-bold text-xl mb-2 font-helvetica">A: Just Watch</h3>
        <p className="font-noto">難しいことは考えず、ただ楽しみたい。</p>
      </div>
      {/* Card B */}
      <div className="border p-6 rounded-lg shadow-lg bg-background">
        <h3 className="font-bold text-xl mb-2 font-helvetica">B: Feel & Think</h3>
        <p className="font-noto">感動し、少しだけ考えたい。</p>
      </div>
      {/* Card C */}
      <div className="border p-6 rounded-lg shadow-lg bg-background">
        <h3 className="font-bold text-xl mb-2 font-helvetica">C: Deep Dive</h3>
        <p className="font-noto">物語の核心に触れ、深く思考したい。</p>
      </div>
    </div>
  </div>
);
export default Section2_ABC;
