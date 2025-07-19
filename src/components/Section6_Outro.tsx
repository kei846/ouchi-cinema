import Link from 'next/link';

const Section6_Outro = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8 text-center">
    <p className="font-georgia text-4xl mb-12">
      観ることは、<br />
      思い出すこと。
    </p>
    <Link href="/theseus" passHref>
      <span className="text-sub hover:underline cursor-pointer font-helvetica">...あなたは、誰の記憶を観測する？</span>
    </Link>
  </div>
);
export default Section6_Outro;
